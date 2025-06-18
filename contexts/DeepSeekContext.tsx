// src/contexts/DeepSeekContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
// import * as SecureStore from 'expo-secure-store';
import * as ExpoStorage from 'expo-storage';
import { createChatCompletion } from '../api/deepseek';
import { useMood } from './MoodContext';



export interface ChatMessage {
  id: number;
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekContextType {
  messages: ChatMessage[];
  initializing: boolean;
  loadingReply: boolean;
  sendMessage(content: string): Promise<void>;
}

const STORAGE_KEY = 'deepseek_chat_messages';
export async function saveChat(messages: any[]) {
  await ExpoStorage.Storage.setItem({key: STORAGE_KEY, value: JSON.stringify(messages)});
}
export async function loadChat(): Promise<string | null> {
  return await ExpoStorage.Storage.getItem({key: STORAGE_KEY});
}

const DeepSeekContext = createContext<DeepSeekContextType | undefined>(
  undefined
);

export const useDeepSeek = (): DeepSeekContextType => {
  const ctx = useContext(DeepSeekContext);
  if (!ctx) {
    throw new Error('useDeepSeek must be used inside DeepSeekProvider');
  }
  return ctx;
};

export const DeepSeekProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [initializing, setInitializing] = useState(true);
  const [loadingReply, setLoadingReply] = useState(false);
  const { mood } = useMood();

  // 1️⃣ Load or seed the chat history
  useEffect(() => {
    (async () => {
      try {
        const raw = await loadChat();
        if (raw) {
          setMessages(JSON.parse(raw));
        } else {
          setMessages([
            {id: Date.now(), role: 'system', content: 'You are a helpful assistant.'}
          ]);
        }
      } catch {
        setMessages([
          { id: Date.now(), role: 'system', content: 'You are a helpful assistant.' },
        ]);
      } finally {
        setInitializing(false);
      }
    })();
  }, []);

  // 2️⃣ Persist every change to SecureStore
  useEffect(() => {
    if (!initializing) {
      saveChat(messages).catch(() =>
        console.warn('Failed to save chat history')
      );
    }
  }, [messages, initializing]);

  // 3️⃣ Freeform chat
  const sendMessage = async (content: string) => {
    setLoadingReply(true);
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', content };
    
    const moodMsg: ChatMessage = {
      id: Date.now(),
      role: 'system',
      content: `Current Mood: ${mood}`,
    };
    setMessages((prev) => [...prev, userMsg]);

    const sanitized = [...messages, moodMsg, userMsg].map(({ id, ...rest }) => rest);

    const resp = await createChatCompletion(sanitized);
    setLoadingReply(false);
    console.log(resp.choices[0].message);
    const reply: ChatMessage = { id: Date.now(), role: 'assistant', content: resp.choices[0].message.content };
    setMessages((prev) => [...prev, reply]);

    // Extract everything inside [TASK]…[/TASK]
    // const regex = /\[TASK\]([\s\S]*?)\[\/TASK\]/g;
    // const taskDescriptions = Array.from(reply.content.matchAll(regex), (m) =>
    //   m[1].trim()
    // );
  };

  return (
    <DeepSeekContext.Provider
      value={{ messages, initializing, loadingReply, sendMessage }}
    >
      {children}
    </DeepSeekContext.Provider>
  );
};
