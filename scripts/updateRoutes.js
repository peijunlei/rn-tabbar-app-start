import fs from 'fs';
import path from 'path';

export function updateRoutes(pageName) {
  const routesPath = path.resolve('src/navigation/routes.tsx');
  let content = fs.readFileSync(routesPath, 'utf-8');
  // xxx-screen ->  xxxScreen

  // 1️⃣ 添加 import，如果不存在
  const importStatement = `import ${pageName}Screen from '../screens/${pageName}';\n`;
  if (!content.includes(importStatement)) {
    // 找到最后一个 import 后插入
    const lastImportIndex = content.lastIndexOf('import');
    const nextLineIndex = content.indexOf('\n', lastImportIndex) + 1;
    content = content.slice(0, nextLineIndex) + importStatement + content.slice(nextLineIndex);
  }

  // 2️⃣ 在 routes 数组尾部插入
  const routeItem = `  {\n    name: '${pageName}',\n    title: '${pageName}',\n    component: ${pageName}Screen,\n  },\n`;

  // 找到 routes 数组结束括号前插入
  content = content.replace(/(\]\s*;)/, routeItem + '$1');

  fs.writeFileSync(routesPath, content, 'utf-8');
  console.log(`✅ routes.tsx 已更新，新路由添加到末尾: ${pageName}`);
}
