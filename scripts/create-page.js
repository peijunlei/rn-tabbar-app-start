// scripts/create-page.js
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { updateRoutes } from './updateRoutes.js';

// 兼容 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pageTemplate = (name) => `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ${name}Screen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>${name} 页面</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
});
`;

async function createPage() {
  const { pageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'pageName',
      message: '请输入页面名称：',
    },
  ]);

  const pageDir = path.join(__dirname, '..', 'src', 'screens', pageName);
  const indexPath = path.join(pageDir, 'index.tsx');

  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(indexPath, pageTemplate(pageName));

  console.log(`✅ 页面已生成: ${indexPath}`);

  // 更新路由
  await updateRoutes(pageName);
}

createPage();
