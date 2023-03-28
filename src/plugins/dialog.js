import { dialog } from 'electron';

export function showDialog(options) {
  return dialog.showOpenDialogSync(options);
}