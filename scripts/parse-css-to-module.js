import * as fs from 'node:fs';
import path from 'node:path';

const rootPath = path.resolve();
const outputPath = path.join(rootPath, '/src/shared/styles/output.css');
const globalsPath = path.join(rootPath, '/src/shared/styles/globals.ts');

let css = fs.readFileSync(outputPath, 'utf8');

// Remove CSS comments
css = css.replace(/\/\*[\s\S]*?\*\//g, '');

// Remove empty lines and extra whitespace (optional)
css = css.replace(/\n\s*\n/g, '\n').trim();

if (fs.existsSync(globalsPath)) {
	console.log('Removing CSS globals.ts');
	fs.unlinkSync(globalsPath);
}

fs.writeFileSync(
	globalsPath,
	`export const globalCSS = ${JSON.stringify(css)}`,
);

console.log('CSS globals.ts created');
