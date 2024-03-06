import { option } from "yargs";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { ServerApp } from "./server-app";
import { SaveFile } from "../domain/use-cases/save-file-use-case";


const options = {
  base: 2,
  limit: 10,
  displayTable: false,
  fileName: "table-2",
  fileDestination: "output"
}

describe("Test on server-app.ts", () => {
  test("Should create ServerApp instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);

    expect(typeof ServerApp.run).toBe("function");
  });


  test("Should call ServerApp.run with options", () => {

    // const logSpy = jest.spyOn(console, "log");

    // const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

  

    // ServerApp.run(options);

    // expect(logSpy).toHaveBeenCalledTimes(2);
    // expect(logSpy).toHaveBeenCalledWith("ServerApp run");
    // expect(logSpy).toHaveBeenLastCalledWith("table-2.txt created in output");


    // expect(createTableSpy).toHaveBeenCalledTimes(1);
    // expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit });

    // expect(saveFileSpy).toHaveBeenCalledTimes(1);
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileContent: expect.any(String),
    //   fileName: options.fileName,
    //   fileDestination: options.fileDestination
    // });
  });


  test("should run with custom mockeable options", () => {

    ServerApp.run(options);


  
  })
});
