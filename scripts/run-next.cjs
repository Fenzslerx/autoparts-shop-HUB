const { spawn } = require('node:child_process')
const { rmSync, existsSync } = require('node:fs')
const path = require('node:path')

const args = process.argv.slice(2)
const command = args[0] || 'dev'
const clean = args.includes('--clean')
const cwd = process.cwd()
const nextBin = path.join(cwd, 'node_modules', 'next', 'dist', 'bin', 'next')
const major = Number(process.versions.node.split('.')[0])

if (clean) {
  const nextDir = path.join(cwd, '.next')
  if (existsSync(nextDir)) {
    rmSync(nextDir, { recursive: true, force: true })
    console.log('Cleared .next cache')
  }
}

if (major >= 24) {
  console.warn(
    `[runtime] Detected Node ${process.versions.node}. Next 14 dev mode may be unstable on Node 24+ in this project. Recommended: Node 22 LTS for daily development.`
  )
}

const nextArgs = [nextBin, command]

if (command === 'dev') {
  nextArgs.push('--turbo')
}

const child = spawn(process.execPath, nextArgs, {
  cwd,
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_DISABLE_COMPILE_CACHE: '1',
  },
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
