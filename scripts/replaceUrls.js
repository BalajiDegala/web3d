const fs = require('fs');
const path = require('path');
require('dotenv').config();

const mappings = [
  {
    env: 'AYON_URL',
    file: path.join(__dirname, '..', 'src', 'main.js'),
    search: /window\.location\.href\s*=\s*"https:\/\/ayon\.d2-india\.com\/";/
  },
  {
    env: 'ZULIP_URL',
    file: path.join(__dirname, '..', 'src', 'main.js'),
    search: /window\.location\.href\s*=\s*"http:\/\/zulip\.d2-india\.com\/";/
  },
  {
    env: 'SPACE_URL',
    file: path.join(__dirname, '..', 'src', 'main.js'),
    search: /window\.location\.href\s*=\s*"http:\/\/grid\.d2-india\.com";/
  },
  {
    env: 'TASKS_URL',
    file: path.join(__dirname, '..', 'src', 'main2.js'),
    search: /window\.location\.href\s*=\s*"http:\/\/localhost:5173\/";/
  },
];

for (const { env, file, search } of mappings) {
  const value = process.env[env];
  if (!value) continue;
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  if (search.test(content)) {
    const replaced = content.replace(search, 'window.location.href = "' + value + '";');
    fs.writeFileSync(file, replaced, 'utf8');
    console.log(`Updated ${file} using ${env}`);
  } else {
    console.warn(`Pattern for ${env} not found in ${file}`);
  }
}
