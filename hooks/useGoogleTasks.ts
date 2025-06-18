// src/hooks/useGoogleTasks.ts
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '@/api/googletasks';
import { LocalTasksContextType, Task } from '@/types';
import { classifyPriority } from '@/utils/helpers';

export function useGoogleTasks(authToken: string, localTasksMeta: LocalTasksContextType, logout: () => Promise<void>) {
  return useQuery<Task[], Error>({
    queryKey: ['googleTasks'],
    queryFn: async () => {
      const parsed = await fetchTasks(authToken, logout);
      // return parsed.map((t) => ({
      //   ...t,
      //   priority: classifyPriority(t),
      // }));

      return parsed.map(g => {
        const meta = localTasksMeta.tasks[g.id] || {};
        return {
          ...g,
          priority: meta.priority ?? classifyPriority(g),
          status: meta.status ?? 'needsAction',
          comments: meta.comments ?? [],
        };
      });
    },
    staleTime: 1000 * 60 * 5,   // 5 minutes
  });
}
