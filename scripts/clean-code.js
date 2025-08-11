const fs = require('fs');
const path = require('path');
const glob = require('glob');

const ignoreList = ['src/firebase.ts', 'src/react-app-env.d.ts'];

const FILES = glob.sync('src/**/*.{js,jsx,ts,tsx}', { absolute: true });

const filesToClean = FILES.filter((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  return !ignoreList.some((ignorePattern) => relativePath.startsWith(ignorePattern));
});

filesToClean.forEach((filePath) => {
  let code = fs.readFileSync(filePath, 'utf8');
  const originalCode = code;

  try {
    code = code.replace(/^\s*console\.[a-z]+\([^;]*\);?\s*$/gm, '');
    code = code.replace(/^\s*debugger;?\s*$/gm, '');
    code = code.replace(/\/\/(?!\s*https?:\/\/).*$/gm, '');
    code = code.replace(/\/\*[^]*?\*\//gm, '');
    code = code.replace(/\n{3,}/g, '\n\n');

    if (code !== originalCode) {
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`🧼 Cleaned: ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (err) {
    console.error(`❌ Failed to clean ${filePath}:\n${err.message}`);
  }
});
