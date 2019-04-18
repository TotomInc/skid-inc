import { Command } from '@/models/command.model';

/**
 * Find the highest name length of a command in an array of `Command`. Used to
 * determinate the amount of spaces to add after the command name.
 *
 * @param commands array of commands
 */
const maxNameLength = (commands: Command[]): number => {
  let maxLength = 0;

  commands.forEach((command) => {
    if (command.name.length > maxLength) {
      maxLength = command.name.length;
    }
  });

  return maxLength;
};

/**
 * Generate the proper amount of spaces by calculating spaces between the
 * maximum command name length and the command description.
 *
 * @param name name of the command
 * @param maxNameLength highest length of a command name from `maxNameLength`
 */
const generateSpaces = (name: string, maxNameLength: number): string => {
  const spaces = maxNameLength - name.length;
  let str = '';

  for (let i = 0; i <= spaces; i++) {
    str += '&nbsp;';
  }

  return str;
};

/**
 * Generate an help string properly formatted, ready to be outputted in the
 * terminal.
 *
 * @param commands an array of `Command` from the command store module.
 */
const generateHelp = (commands: Command[]): string => {
  const maxCommandNameLength = maxNameLength(commands);
  let help = `For more information about a specific command, type <span class="font-bold">command-name --help</span>:<br><br>`;

  commands.forEach((command) => {
    const spaces = generateSpaces(command.name, maxCommandNameLength);

    help += `<span class="font-bold">${command.name}</span>${spaces}${command.description}<br>`;
  });

  return help;
};

export default generateHelp;
