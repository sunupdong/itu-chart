import { createContext } from './context';
import {
  line, circle, text, rect, path, ring,
} from './shape';
import {
  restore, save, scale, translate, rotate,
} from './transform';

export function createRenderer(width, height) {
  const context = createContext(width, height); // 创建上下文信息
  return {
    line: (options) => line(context, options), // 画线
    circle: (options) => circle(context, options), // 画圆
    text: (options) => text(context, options), // 画文本
    rect: (options) => rect(context, options), // 画矩形
    path: (options) => path(context, options), // 绘制路径
    ring: (options) => ring(context, options), // 绘制圆环
    restore: () => restore(context), // 恢复上下文
    save: () => save(context), // 保存上下文
    scale: (...args) => scale(context, ...args), // 缩放
    rotate: (...args) => rotate(context, ...args), // 旋转
    translate: (...args) => translate(context, ...args), // 平移
    node: () => context.node, // 获取 canvas 节点
    group: () => context.group, // 获取 group 节点
  };
}
