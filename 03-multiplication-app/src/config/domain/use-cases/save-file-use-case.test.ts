import { SaveFile } from './save-file-use-case';
import fs from 'fs';


describe('Save file use case', () => {

  afterEach(() => {

    if (fs.existsSync('outputs')) {
      fs.rmSync('outputs', { recursive: true });
    }

    if (fs.existsSync('custom-outputs'))
      fs.rmSync('custom-outputs', { recursive: true });
  });

  test('should save file with default values', async () => {

    const saveFile = new SaveFile();

    const options = {
      fileContent: 'test content'
    }

    const filePath = 'outputs/table.txt';

    const result = saveFile.execute(options);

    const checkFile = fs.existsSync(filePath);

    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(saveFile).toBeInstanceOf(SaveFile);
    expect(result).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });


  test('should save file with custom options', async () => {

    const options = {
      fileContent: 'test content',
      fileName: 'custom-file-name',
      fileDestination: 'custom-outputs'
    }

    const filePath = `${options.fileDestination}/${options.fileName}.txt`;

    const saveFile = new SaveFile();

    const result = saveFile.execute(options);

    const checkFile = fs.existsSync(filePath);

    const fileContent = fs.readFileSync(filePath, 'utf8');

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });


  test('should return false if  directory could not be created', async () => {
    const saveFile = new SaveFile();

    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => { throw new Error('Custom message when directory could no be created') });

    const result = saveFile.execute({ fileContent: 'test content' });

    expect(result).toBe(false);

    mkdirSpy.mockRestore(); // los mocks persisten entre tests, por lo que es necesario restaurarlos
  })


  test('should return false if file could not be saved', async () => {

    const saveFile = new SaveFile();

    const writeFileSyncSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => { throw new Error('Custom error when file could no be written') });

    const result = saveFile.execute({ fileContent: 'test content' });

    expect(result).toBe(false);

    writeFileSyncSpy.mockRestore();

  })

})