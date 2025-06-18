import { Dispatch, SetStateAction } from "react";

export interface ParsedTask {
  id: string;
  priority?: "high" | "low" | "backlog";
  title: string;
  description: string;
  due: string;          // "DD-MM-YYYY"
  reminder: boolean;
}

export type TaskWithPriority = ParsedTask & {
  priority?: 'high' | 'low' | 'backlog' | 'daily';
};

export interface Task {
  id: string;           // Google’s unique ID
  title: string;
  description: string;
  due: string;         // "DD-MM-YYYY"
  reminder: boolean;    // from Google or DeepSeek

  // LOCAL-ONLY FIELDS:
  priority: 'high' | 'low' | 'backlog';
  status: 'needsAction' | 'completed';
  comments: {value: string, createdAt: string}[];   // free‐form notes the user writes
}

export interface LocalTasksContextType {
  tasks: Record<string, Pick<Task, 'status' | 'priority' | 'comments'>>;
  updateMeta: (
    id: string,
    patch: Partial<Pick<Task, 'status' | 'priority' | 'comments'>>
  ) => void;
}

export interface TaskForm {
  title: string;
  description: string;
  due: string;       // e.g. "DD-MM-YYYY"
  reminder: boolean;
}
