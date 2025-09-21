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

export function getColorWithOpacity(color: string, opacity = 1): string {
  if (opacity === 1) return color;
  opacity = Math.max(0, Math.min(opacity, 1)); // 限制在 0~1

  let r: number, g: number, b: number;

  if (color.startsWith('#')) {
    if (color.length === 7) { // #RRGGBB
      r = parseInt(color.slice(1, 3), 16);
      g = parseInt(color.slice(3, 5), 16);
      b = parseInt(color.slice(5, 7), 16);
    } else if (color.length === 4) { // #RGB
      r = parseInt(color[1] + color[1], 16);
      g = parseInt(color[2] + color[2], 16);
      b = parseInt(color[3] + color[3], 16);
    } else {
      throw new Error('Invalid hex color format');
    }
  } else {
    throw new Error('Only hex colors are supported');
  }

  return `rgba(${r},${g},${b},${opacity})`;
}