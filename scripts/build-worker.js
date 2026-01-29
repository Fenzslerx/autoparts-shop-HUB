const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('⚡️ Starting custom build script...');

const isWindows = process.platform === 'win32';
const npx = isWindows ? 'npx.cmd' : 'npx';

try {
    // 1. Run Vercel Build
    console.log(`⚡️ Running Vercel build using ${npx}...`);
    execSync(`${npx} vercel build`, { stdio: 'inherit' });

    console.log('✅ Vercel build completed.');

    // 2. Fix _global-error mismatch
    const functionsDir = path.join('.vercel', 'output', 'functions');
    const globalErrorRsc = path.join(functionsDir, '_global-error.rsc.func');
    const globalError = path.join(functionsDir, '_global-error.func');

    if (fs.existsSync(globalErrorRsc)) {
        console.log('⚡️ Renaming _global-error.rsc.func to _global-error.func...');
        if (fs.existsSync(globalError)) {
            fs.rmSync(globalError, { recursive: true, force: true });
        }
        // Rename using fs.renameSync
        try {
            fs.renameSync(globalErrorRsc, globalError);
            console.log('✅ Renamed successfully.');
        } catch (renameError) {
            console.error('⚠️ Rename failed, trying copy/delete:', renameError.message);
            fs.cpSync(globalErrorRsc, globalError, { recursive: true });
            fs.rmSync(globalErrorRsc, { recursive: true, force: true });
        }

    } else {
        console.log('⚠️ _global-error.rsc.func not found. Contents of functions dir:');
        try {
            console.log(fs.readdirSync(functionsDir));
        } catch (e) { console.log('Could not list dir'); }
    }

    // 2.1 Fix _not-found mismatch
    const notFoundRsc = path.join(functionsDir, '_not-found.rsc.func');
    const notFound = path.join(functionsDir, '_not-found.func');

    if (fs.existsSync(notFoundRsc)) {
        console.log('⚡️ Renaming _not-found.rsc.func to _not-found.func...');
        if (fs.existsSync(notFound)) {
            fs.rmSync(notFound, { recursive: true, force: true });
        }
        fs.renameSync(notFoundRsc, notFound);
    }

    // 3. Run Next-on-Pages
    console.log(`⚡️ Running next-on-pages using ${npx}...`);
    execSync(`${npx} @cloudflare/next-on-pages --skip-build`, { stdio: 'inherit' });

    console.log('✅ Build completed successfully!');

} catch (error) {
    console.error('❌ Build failed.');
    if (error.stdout) console.log('Stdout:', error.stdout.toString());
    if (error.stderr) console.error('Stderr:', error.stderr.toString());
    process.exit(1);
}
