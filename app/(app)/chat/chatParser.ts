import { ParsedTask } from "@/types";

export function parseChat(
  content: string
): { tasks: ParsedTask[]; content: string } {
  const tasks: ParsedTask[] = [];
  let updated = content;

  // Matches one [TASK]...[/TASK] block
  const blockRegex = /\[TASK\]([\s\S]*?)\[\/TASK\]/;
  // Matches LABEL:(value);
  const pairRegex  = /(\w+):\(([^)]*)\);/g;

  let match: RegExpMatchArray | null;
  while ((match = updated.match(blockRegex))) {
    const [wholeBlock, body] = match;

    // 1️⃣ Extract fields
    const fields: Record<string, string> = {};
    for (const [, key, val] of body.matchAll(pairRegex)) {
      fields[key.toUpperCase()] = val.trim();
    }

    // 2️⃣ Build task object
    const task: ParsedTask = {
      id:          `${new Date()}`,
      title:       fields.TITLE       || '',
      description: fields.DESCRIPTION || '',
      due:         fields.DUE         || '',
      reminder:    fields.REMINDER === 'true',
    };
    tasks.push(task);

    // 3️⃣ Remove that block, replacing it with the title
    updated = updated.replace(wholeBlock, task.title);
  }

  return { tasks, content: updated };
}

export default {
  parseChat
};
