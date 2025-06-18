// src/context/LocalTasksContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import * as ExpoStorage from 'expo-storage';
import { LocalTasksContextType } from '@/types';

const STORAGE_KEY = 'LOCAL_TASKS_META';

const LocalTasksContext = createContext<LocalTasksContextType | null>(null);

export const LocalTasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<LocalTasksContextType['tasks']>({});

  // Load on startup
  useEffect(() => {
    ExpoStorage.Storage.getItem({key: STORAGE_KEY})
      .then(raw => raw && setTasks(JSON.parse(raw)))
      .catch(console.warn);
  }, []);

  // Persist on change
  useEffect(() => {
    ExpoStorage.Storage.setItem({key: STORAGE_KEY, value: JSON.stringify(tasks)}).catch(console.warn);
  }, [tasks]);

  const updateMeta = (id: string, patch: Partial<LocalTasksContextType['tasks'][string]>) => {
    setTasks(prev => ({
      ...prev,
      [id]: { ...(prev[id] || { status: 'needsAction', priority: 'backlog', comments: [] }), ...patch },
    }));
  };

  return (
    <LocalTasksContext.Provider value={{ tasks, updateMeta }}>
      {children}
    </LocalTasksContext.Provider>
  );
};

export const useLocalTaskMeta = () => {
  const ctx = useContext(LocalTasksContext);
  if (!ctx) throw new Error('useLocalTaskMeta must be inside LocalTasksProvider');
  return ctx;
};
