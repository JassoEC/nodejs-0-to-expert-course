
import fs from 'fs';

export interface SaveFileUseCase {
  execute: (options: SaveFileOptions) => boolean
}

export interface SaveFileOptions {
  fileContent: string;
  fileName?: string;
  fileDestination?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor() { }

  execute({ fileContent, fileName = 'table', fileDestination = 'outputs' }: SaveFileOptions): boolean {
    try {

      if (!fs.existsSync(fileDestination)) {
        fs.mkdirSync(fileDestination, { recursive: true });
      }

      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
      return true;

    } catch (error) {
      console.log('error', error);
      return false;
    }
  }
}