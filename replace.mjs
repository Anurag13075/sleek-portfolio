import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src/data');
let updatedCount = 0;

for (const file of files) {
    if (file.endsWith('.mdx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;
        
        // Replacements
        content = content.replace(/ramxcodes/gi, 'Anurag13075');
        content = content.replace(/ramx/gi, 'Anurag');
        content = content.replace(/Ram's/gi, "Anurag's");
        
        if (content !== originalContent) {
            fs.writeFileSync(file, content);
            updatedCount++;
            console.log(`Updated ${file}`);
        }
    }
}
console.log(`Finished updating ${updatedCount} files.`);
