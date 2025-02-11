import fs from 'fs';
import path from 'path';

const tokensFilePath = './logs/tokens.csv';
const totalFilePath = './logs/total.csv';

export function appendToTotal() {
    try {
      const tokensData = fs.readFileSync(tokensFilePath, 'utf-8').split('\n');
      
      // Check if the first line contains numbers; if not, skip it
      const header = tokensData[0].split(',');
      const hasHeader = header.some(item => isNaN(Number(item)));
  
      const dataToAppend = hasHeader ? tokensData.slice(1) : tokensData;
  
      // Filter out any empty lines that might exist
      const cleanData = dataToAppend.filter(line => line.trim() !== '');
  
      if (cleanData.length > 0) {
        fs.appendFileSync(totalFilePath, cleanData.join('\n') + '\n', 'utf-8');
        console.log('Data appended successfully to total.csv.');
      } else {
        console.log('No valid data to append.');
      }
    } catch (error) {
      console.error('Error while processing files:', error);
    }
  }