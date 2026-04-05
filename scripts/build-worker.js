const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('⚡️ Starting custom build script...');

const isWindows = process.platform === 'win32';
const npx = isWindows ? 'npx.cmd' : 'npx';

try {
    // 1. Run Next.js Build directly
    console.log('⚡️ Running Next.js build...');
    execSync('npm run build', { stdio: 'inherit' });

    console.log('✅ Next.js build completed.');

    // 2. Run OpenNext for Cloudflare
    console.log(`⚡️ Running OpenNext for Cloudflare using ${npx}...`);
    execSync(`${npx} @opennextjs/cloudflare build --dangerouslyUseUnsupportedNextVersion`, { stdio: 'inherit' });

    console.log('✅ Build completed successfully!');

} catch (error) {
    console.error('❌ Build failed.');
    if (error.stdout) console.log('Stdout:', error.stdout.toString());
    if (error.stderr) console.error('Stderr:', error.stderr.toString());
    process.exit(1);
}
