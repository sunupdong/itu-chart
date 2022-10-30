function transform(type, transformer) {
  transformer.type = () => type;
  return transformer;
}

export function translate(tx = 0, ty = 0) {
  return transform('translate', ([px, py]) => [px + tx, py + ty]);
}

export function scale(sx = 1, sy = 1) {
  return transform('scale', ([px, py]) => [px * sx, py * sy]);
}

// 反射变换是一种特殊的缩放变换，它在两个维度的放缩比例都是 -1
export function reflect() {
  return transform('reflect', scale(-1, -1));
}
export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}
export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

// 转置变换: 交换一个点的两个维度，可以理解为按照 y = x 这条直线对称。
export function transpose() {
  return transform('transpose', ([px, py]) => [py, px]);
}

// 极坐标变换把条形图转换成玫瑰图。
export function polar() {
  // 这里我们把点的第一个维度作为 theta
  // 第二个维度作为 radius
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
}
