import storage from "./storage";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), ms));
}

export async function mockLogin(): Promise<{ token: string; data: UserInfo }> {
  await sleep(1500);
  return {
    token: 'JWT_TOKEN',
    data: {
      id: 1,
      nickname: '张三',
      avatar: 'https://avatars.githubusercontent.com/u/1234567890?v=4',
      email: 'zhangsan@example.com',
      phone: '1234567890',
      address: '北京市海淀区',
    },
  };
}

export async function isLogin() {
  const token = await storage.getItem('token');
  return !!token;
} 