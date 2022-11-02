import { area as pathArea, line as pathLine, ring as pathRing } from './d';

// 绘制等高线
export function contour(renderer, { points, ...styles }) {
  const end = points.length;
  const mid = end / 2;
  // 用一条 path 绘制等高线本身
  const contour = renderer.path({ d: pathArea(points), ...styles, stroke: 'none' });
  // 用一条 path 绘制外边框
  const outerStroke = renderer.path({ d: pathLine(points.slice(0, mid)), ...styles, fill: 'none' });
  // 用一条 path 绘制内边框
  const innerStroke = renderer.path({ d: pathLine(points.slice(mid, end)), ...styles, fill: 'none' });
  return [innerStroke, contour, outerStroke];
}

// 绘制圆环
// 绘制圆环的能力从渲染引擎里面移出了
// 为了更好的扩展性，直接在这里绘制即可
export function ring(renderer, {
  cx, cy, r1, r2, ...styles
}) {
  // 用一个路径去绘制圆环本身
  const ring = renderer.path({ ...styles, d: pathRing([[cx, cy], [r1, r2]]), stroke: 'none' });
  // 分别用两个圆去绘制圆环的边框
  const innerStroke = renderer.circle({
    ...styles, fill: 'none', r: r1, cx, cy,
  });
  const outerStroke = renderer.circle({
    ...styles, fill: 'none', r: r2, cx, cy,
  });
  return [innerStroke, ring, outerStroke];
}
