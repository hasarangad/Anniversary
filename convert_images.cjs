const fs = require('fs');
const heicConvert = require('heic-convert');
const path = require('path');

const dir = 'c:/Users/hasar/OneDrive/Desktop/Anniversary/src/assets/images';

async function convert() {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.toLowerCase().endsWith('.heic')) {
            console.log(`Converting ${file}...`);
            try {
                const inputBuffer = fs.readFileSync(path.join(dir, file));
                const outputBuffer = await heicConvert({
                    buffer: inputBuffer,
                    format: 'JPEG',
                    quality: 0.8
                });
                const outPath = path.join(dir, file.replace(/\.HEIC$/i, '.jpg'));
                fs.writeFileSync(outPath, outputBuffer);
                console.log(`Saved ${outPath}`);
                // Delete the original HEIC to save space and avoid confusion
                fs.unlinkSync(path.join(dir, file));
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
    console.log("Conversion complete.");
}
convert().catch(console.error);
