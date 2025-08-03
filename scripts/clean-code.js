const fs = require('fs');
const path = require('path');
const glob = require('glob');

const FILES = glob.sync('src/**/*.{js,jsx,ts,tsx}', { absolute: true });

FILES.forEach((filePath) => {
  let code = fs.readFileSync(filePath, 'utf8');

  const originalCode = code;

  try {
    // 🧼 Xoá dòng console
    code = code.replace(/^\s*console\.[a-z]+\([^;]*\);?\s*$/gm, '');

    // 🧼 Xoá dòng debugger
    code = code.replace(/^\s*debugger;?\s*$/gm, '');

    // 🧼 Xoá comment (trừ comment chứa https://)
    code = code.replace(/^\s*\/\/(?!\s*https?:\/\/).*$/gm, ''); // dòng comment //
    code = code.replace(/\/\*[^]*?\*\//gm, ''); // comment /* */

    code = code.replace(/\n{3,}/g, '\n\n');

    if (code !== originalCode) {
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`🧼 Cleaned: ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (err) {
    console.error(`❌ Failed to clean ${filePath}:\n${err.message}`);
  }
});
