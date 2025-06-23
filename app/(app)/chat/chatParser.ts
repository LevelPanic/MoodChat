import { ParsedTask } from "@/types";

export function parseChat(
  content: string
): { tasks: ParsedTask[]; content: string } {
  const tasks: ParsedTask[] = [];
  let updated = content;

  // Grab one <task> … </task> block (non-greedy)
  const blockRegex = /<task>([\s\S]*?)<\/task>/;
  // Capture the inner text of each tag
  const tag = (name: string, body: string) => {
    const m = body.match(new RegExp(`<${name}>([\\s\\S]*?)<\\/${name}>`, 'i'));
    return m ? m[1].trim() : '';
  };

  let match: RegExpMatchArray | null;
  while ((match = updated.match(blockRegex))) {
    const [wholeBlock, body] = match;

    const due = tag('due', body)

    const task: ParsedTask = {
      id:          Date.now().toString(),
      title:       tag('title', body),
      description: tag('desc', body),
      due:         due.slice(0, due.lastIndexOf('-')),
      reminder:    tag('reminder', body).toLowerCase() === 'true',
    };
    tasks.push(task);

    // Replace the entire block with the task title
    updated = updated.replace(wholeBlock, task.title);
  }

  return { tasks, content: updated };
}

export default {
  parseChat
};
