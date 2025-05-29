// src/contexts/DeepSeekContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import * as SecureStore from 'expo-secure-store';
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
  sendMessage(content: string): Promise<void>;
}

const STORAGE_KEY = 'deepseek_chat_messages';
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
  const { mood } = useMood();

  // 1️⃣ Load or seed the chat history
  useEffect(() => {
    (async () => {
      try {
        const raw = await SecureStore.getItemAsync(STORAGE_KEY);
        if (raw) {
          setMessages(JSON.parse(raw));
        } else {
          setMessages([
            {
              id: Date.now(),
              role: 'system',
              content: `
You are Moody, a helpful assistant for users dealing with ADHD, specialized in breaking user requests into scheduled tasks but only when needed.
• Always wrap each task you identify in tags: [TASK]…[/TASK], and group all tasks inside [TASKS]…[/TASKS].
• Recognize the supplied mood (happy, neutral or sad) and adjust your tone accordingly (goal is to keep user's mood away from sad/depressed/anxious).
• You will only be supplied the chat history or context of the last 7 days if it exists.
• If chat history older than 7 days exists and the user's request implies a chat older than 7 days; then you will respond with the date the user is referring to wrapped inside [DATE]…[/DATE] after which you will be supplied the chat history and context of that date which you can then use to respond to the user's original request.
              `.trim(),
            },
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
      SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(messages)).catch(() =>
        console.warn('Failed to save chat history')
      );
    }
  }, [messages, initializing]);

  // 3️⃣ Freeform chat
  const sendMessage = async (content: string) => {
    const userMsg: ChatMessage = { id: Date.now(), role: 'user', content };
    
    const moodMsg: ChatMessage = {
      id: Date.now(),
      role: 'system',
      content: `Current Mood: ${mood}`,
    };
    setMessages((prev) => [...prev, userMsg]);

    const resp = await createChatCompletion([...messages, moodMsg, userMsg]);
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
      value={{ messages, initializing, sendMessage }}
    >
      {children}
    </DeepSeekContext.Provider>
  );
};
