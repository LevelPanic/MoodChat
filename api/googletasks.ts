import { ParsedTask, Task } from "@/types";
import { isGoogleTokenValid } from "./checktoken";
import { classifyPriority } from "@/utils/helpers";

const TASKS_API_URL =
  'https://tasks.googleapis.com/tasks/v1/lists/@default/tasks';

/**
 * Submit an array of ParsedTask to Google Tasks.
 * @param tasks    Array of tasks from your parser
 * @param authToken  OAuth2 Bearer token with `tasks` scope
 */
export async function submitTasks(
  tasks: ParsedTask[],
  authToken: string
): Promise<Task | undefined> {
  // Helper to turn "DD-MM-YYYY" into an RFC3339 midnight UTC string
  const formatDue = (date: string) => {
    const [dd, mm, yyyy] = date.split('-').map(Number);
    // create UTC date at midnight
    return new Date(Date.UTC(yyyy, mm - 1, dd, 0, 0, 0)).toISOString();
  };

  // Fire off each insertion in series (you can use Promise.all for parallel)
  for (const task of tasks) {
    const body: Record<string, any> = {
      title: task.title,
      notes: task.description,    // time/reminder flags can go in notes if you need them
      due: formatDue(task.due)
    };

    console.log('--------SUBMITTING TASKS--------');

    const res = await fetch(TASKS_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('--------SUBMITTED TASKS--------', JSON.stringify(body));

    if (!res.ok) {
      const errText = await res.text();
      console.log(errText);
      throw new Error(`Google Tasks insert failed for "${task.title}": ${errText}`);
    }

    const data = await res.json();
    console.log(data);
    // data.status will be "needsAction"
    return {
      id:          data.id,
      title:       data.title,
      description: data.notes || '',
      due:         data.due ? data.due.split('T')[0].split('-').reverse().join('-') : '',
      reminder:    false, // no built-in reminders
      priority:    classifyPriority({
        id:          data.id,
        title:       data.title,
        description: data.notes || '',
        due:         data.due ? data.due.split('T')[0].split('-').reverse().join('-') : '',
        reminder:    false
      })!,
      status: 'needsAction',
      comments: []
    };
  }
}

interface GoogleTaskItem {
  id: string;
  title: string;
  notes?: string;
  due?: string;      // RFC3339 string, e.g. "2025-06-07T00:00:00.000Z"
  status?: string;
}

interface GoogleTasksResponse {
  items?: GoogleTaskItem[];
}

/**
 * Fetches all tasks from the user's default Google Tasks list.
 * @param authToken OAuth2 bearer token with `https://www.googleapis.com/auth/tasks` scope
 */
export async function fetchTasks(
  authToken: string,
  logout: () => Promise<void>
): Promise<ParsedTask[]> {
  const url =
    `${TASKS_API_URL}?showCompleted=true`;

  console.log("--------FETCHING--------");

  const stillValid = await isGoogleTokenValid(authToken);
  
  if (!stillValid) {
    // Unauthorized — kick the user out
    console.warn('Received 401 — logging out');
    await logout();
    // Optionally throw so callers know request failed
    throw new Error('Unauthorized');
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log("--------ERROR!!!--------", errText);
    throw new Error(`Failed to fetch tasks: ${errText}`);
  }

  console.log("--------FETCHED!--------");

  const data: GoogleTasksResponse = await res.json();

  console.log('--------<<DATA>>--------', JSON.stringify(data));

  const items = data.items ?? [];
  return items.map((item) => {
    let formattedDate = '';
    if (item.due) {
      const d = new Date(item.due);
      const dd = String(d.getUTCDate()).padStart(2, '0');
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
      const yyyy = d.getUTCFullYear();
      formattedDate = `${dd}-${mm}-${yyyy}`;
    }
    return {
      id:          item.id,
      title:       item.title,
      description: item.notes ?? '',
      due:         formattedDate,
      reminder:    false,    // no native reminder support
    };
  });
}

/**
 * Fields you can update on a Google Task
 */
export interface TaskUpdate {
  title?: string;
  description?: string;          // maps to `notes`
  due?: string;                  // "DD-MM-YYYY", maps to `due`
  status?: 'needsAction' | 'completed';
}

/**
 * Updates a Google Task with any subset of updatable fields.
 * @param authToken  OAuth2 Bearer token
 * @param taskId     Google Task ID
 * @param updates    Partial fields to update
 */
export async function updateGoogleTask(
  authToken: string,
  taskId: string,
  updates: TaskUpdate
): Promise<Task | undefined> {
  const url = `${TASKS_API_URL}/${taskId}`;
  const body: Record<string, any> = {};

  if (updates.title !== undefined) {
    body.title = updates.title;
  }
  if (updates.description !== undefined) {
    body.notes = updates.description;
  }
  if (updates.due !== undefined) {
    // convert "DD-MM-YYYY" → "YYYY-MM-DDT00:00:00.000Z"
    const [dd, mm, yyyy] = updates.due.split('-').map(Number);
    const iso = new Date(Date.UTC(yyyy, mm - 1, dd, 0, 0, 0)).toISOString();
    body.due = iso;
  }
  if (updates.status !== undefined) {
    body.status = updates.status;
    // when marking completed, include a timestamp
    if (updates.status === 'completed') {
      body.completed = new Date().toISOString();
    } else {
      // clearing completed if reopening
      body.completed = null;
    }
  }

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`updateGoogleTask failed (${res.status}): ${err}`);
  }

  const data = await res.json();

  return {
    id:          data.id,
    title:       data.title,
    description: data.notes || '',
    due:         data.due ? data.due.split('T')[0].split('-').reverse().join('-') : '',
    reminder:    false, // no built-in reminders
    priority:    classifyPriority({
      id:          data.id,
      title:       data.title,
      description: data.notes || '',
      due:         data.due ? data.due.split('T')[0].split('-').reverse().join('-') : '',
      reminder:    false
    })!,
    status: 'needsAction',
    comments: []
  };
};

export async function deleteGoogleTask(
  authToken: string,
  taskId: string
): Promise<undefined | boolean> {
  const url = `${TASKS_API_URL}/${taskId}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (res.status === 204) {
    // 204 No Content → deleted successfully
    return true;
  }

  const errText = await res.text();
  throw new Error(
    `deleteGoogleTask failed (status ${res.status}): ${errText}`
  );
}
