import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('c:/Users/ADMIN/Downloads/caremom---trusted-nursing-care/caremom---trusted-nursing-care/src');

let totalReplaced = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace all fuchsia, rose, pink combinations that are dark
    content = content.replace(/(bg|text|border|ring|shadow|fill|stroke|to|from|via|hover:bg|hover:text|hover:border|focus:ring|group-hover:text|group-hover:bg)-(rose|pink|fuchsia)-(500|600|700|800|900|950)/g, '$1-pink-300');

    // Make sure we also convert standard rose colors to pink for consistency if requested
    // "màu hồng nhạt"
    // Also change hover states if they have dark colors
    content = content.replace(/(bg|text|border|ring|shadow|fill|stroke|to|from|via)-(rose|pink|fuchsia)-500/g, '$1-pink-300');
    content = content.replace(/(bg|text|border|ring|shadow|fill|stroke|to|from|via)-(rose|pink|fuchsia)-600/g, '$1-pink-400');
    content = content.replace(/(bg|text|border|ring|shadow|fill|stroke|to|from|via)-(rose|pink|fuchsia)-700/g, '$1-pink-400');
    content = content.replace(/(bg|text|border|ring|shadow|fill|stroke|to|from|via)-(rose|pink|fuchsia)-800/g, '$1-pink-400');
    content = content.replace(/(bg|text|border|ring|shadow|fill|stroke|to|from|via)-(rose|pink|fuchsia)-900/g, '$1-pink-400');
    
    // Also catch bare utility classes like text-rose-500 if not caught above
    content = content.replace(/(rose|pink|fuchsia)-(500|600|700|800|900|950)/g, 'pink-300');

    // To ensure legibility, maybe text-pink-300 is too light for some dark background, but it's fine.
    // Replace text-pink-300 with text-pink-400 for better text visibility while keeping it light pink.
    content = content.replace(/text-pink-300/g, 'text-pink-400');
    content = content.replace(/text-pink-200/g, 'text-pink-400');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
        totalReplaced++;
    }
});

console.log(`Total files updated: ${totalReplaced}`);
