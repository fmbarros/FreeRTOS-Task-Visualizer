const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const htmlPath = path.join(__dirname, '..', 'freertos-task-visualizer.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Extract style
const styleMatch = rawHtml.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) {
  console.error("Style tag not found");
  process.exit(1);
}
let css = styleMatch[1];
// Simple fast CSS minifier
css = css
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>+~])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

// Extract script
const scriptMatch = rawHtml.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error("Script tag not found");
  process.exit(1);
}
const js = scriptMatch[1];

console.log('Obfuscating JavaScript...');
const obfuscationResult = JavaScriptObfuscator.obfuscate(js, {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  numbersToExpressions: true,
  simplify: true,
  stringArray: true,
  stringArrayEncoding: ['base64'],
  stringArrayThreshold: 0.8,
  splitStrings: true,
  splitStringsChunkLength: 10,
  identifierNamesGenerator: 'hexadecimal',
  renameGlobals: false,
  selfDefending: false // selfDefending can break in some browser environments if modified, keep false for stability
});

const obfuscatedJs = obfuscationResult.getObfuscatedCode();

let minHtml = rawHtml
  .replace(/<style>[\s\S]*?<\/style>/, `<style>${css}</style>`)
  .replace(/<script>[\s\S]*?<\/script>/, `<script>${obfuscatedJs}</script>`);

// Write to dist and index.html
fs.mkdirSync(path.join(__dirname, '..', 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '..', 'dist', 'freertos-task-visualizer.min.html'), minHtml, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'index.html'), minHtml, 'utf8');

console.log('Build complete!');
console.log('Original size:', Buffer.byteLength(rawHtml, 'utf8'), 'bytes');
console.log('Dist min/obfuscated size:', Buffer.byteLength(minHtml, 'utf8'), 'bytes');
