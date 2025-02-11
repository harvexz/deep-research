// tokenTracker.ts
import fs from 'fs';
import { encoding_for_model } from '@dqbd/tiktoken';
import { generateObject as originalGenerateObject } from 'ai';

let encoder;

try {
  encoder = encoding_for_model('o3-mini');
} catch (error) {
  console.warn('Tokenizer for o3-mini not found, using default encoder.');
  encoder = encoding_for_model('gpt-4'); // Fallback to gpt-4 tokenizer if needed
}

function countTokens(text: string): number {
  return encoder.encode(text).length;
}

function logTokens(inputTokens: number, outputTokens: number) {
  const filePath = './logs/tokens.csv';
  const header = 'input tokens,output tokens\n';
  const data = `${Math.round(inputTokens*1.1)},${Math.round(outputTokens*1.1)}\n`;
  console.log(data)

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, header);
  }
  fs.appendFileSync(filePath, data);
}

export async function generateObjectWithTokenTracking(options: any) {
  const prompt = options.prompt || '';
  const inputTokens = countTokens(prompt);

  const response = await originalGenerateObject(options);

  const responseText = JSON.stringify(response.object);
  const outputTokens = countTokens(responseText);

  logTokens(inputTokens, outputTokens);

  return response;
}

process.on('exit', () => {
  encoder.free();
});
