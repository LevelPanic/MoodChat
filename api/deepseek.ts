// src/api/deepseek.ts
import { ChatMessage } from '../contexts/DeepSeekContext';

export interface ChatCompletionResponse {
  id: string;
  choices: Array<{ message: ChatMessage }>;
}

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;
const ENDPOINT = 'https://api.deepseek.com/chat/completions';

/**
 * Sends a chat-completion request to DeepSeek.
 */
export async function createChatCompletion(
  messages: ChatMessage[]
): Promise<ChatCompletionResponse> {
  const resp = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages
    }),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    throw new Error(`DeepSeek error: ${errorText}`);
  }

  return resp.json();
}
