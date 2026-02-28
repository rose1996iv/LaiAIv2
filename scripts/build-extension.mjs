import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const outDir = path.join(process.cwd(), 'out');

function processHtmlFile(filePath) {
    let html = fs.readFileSync(filePath, 'utf-8');

    // Regex to find all inline scripts that do not have a src attribute
    const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let modified = false;

    while ((match = scriptRegex.exec(html)) !== null) {
        const fullTag = match[0];
        const scriptContent = match[1];

        if (!fullTag.includes('src=') && scriptContent.trim().length > 0) {
            modified = true;
            const hash = crypto.createHash('sha256').update(scriptContent).digest('hex').substring(0, 8);
            const scriptFilename = `inline-${hash}.js`;

            // We will place the extracted scripts in out/_next/static/ext-scripts/
            const scriptPath = path.join(outDir, '_next', 'static', 'ext-scripts');

            if (!fs.existsSync(scriptPath)) {
                fs.mkdirSync(scriptPath, { recursive: true });
            }

            fs.writeFileSync(path.join(scriptPath, scriptFilename), scriptContent);

            // Important to use a pure relative path for extensions (no leading slash) or just relative to out
            // Since these are injected in the HTML root usually, we can use a relative root path but chrome extension prefers relative to the HTML location
            // If next.js outputs a flat structure for HTML, "./_next/static/..." works
            let relativePath = path.relative(path.dirname(filePath), path.join(scriptPath, scriptFilename));
            relativePath = relativePath.split(path.sep).join('/'); // normalize to forward slashes

            const replacementTag = `<script src="${relativePath}"></script>`;
            html = html.replace(fullTag, replacementTag);
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, html);
        console.log(`Processed inline scripts in: ${filePath}`);
    }
}

function traverseDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.error(`Error: Directory ${dir} does not exist. Did the Next.js build succeed?`);
        process.exit(1);
    }

    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDirectory(fullPath);
        } else if (fullPath.endsWith('.html')) {
            processHtmlFile(fullPath);
        }
    }
}

console.log('Starting extension build post-processing...');
traverseDirectory(outDir);
console.log('Finished processing inline scripts.');
