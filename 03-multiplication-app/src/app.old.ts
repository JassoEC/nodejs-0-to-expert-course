import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';


const { b: base, l: limit, s: displayTable } = yarg;

const headerMessage = `
*****************************************
       Multiplication table of ${base} 
*****************************************
\n`
let outputMessage = '';


for (let i = 1; i <= limit; i++) {
  outputMessage += `${base} x ${i} = ${base * i}\n`;
}
outputMessage = headerMessage + outputMessage;
const output = 'outputs/multiplication-tables';

if (!fs.existsSync(output)) {
  fs.mkdirSync(output, { recursive: true });
}

fs.writeFileSync(`${output}/table-${base}.txt`, outputMessage);

console.log(`table-${base}.txt created in ${output}`);

if (displayTable) {
  console.log(outputMessage);
}

