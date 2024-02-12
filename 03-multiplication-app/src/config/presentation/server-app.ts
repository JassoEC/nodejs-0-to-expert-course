import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file-use-case";

interface RunOptions {
  base: number;
  limit: number;
  displayTable: boolean;
  fileName: string;
  fileDestination: string;
}

export class ServerApp {

  static run(options: RunOptions) {
    console.log('ServerApp run');
    const { base, limit, displayTable, fileDestination, fileName } = options;
    const createTable = new CreateTable().execute({ base, limit });
    const savedFile = new SaveFile().execute({
      fileContent: createTable,
      fileName,
      fileDestination
    });

    if (displayTable) {
      console.log(createTable);
    }

    savedFile ? console.log(`${fileName}.txt created in ${fileDestination}`) : console.log('Error creating file');
  }

}