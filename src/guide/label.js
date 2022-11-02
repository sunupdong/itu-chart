import { dist } from '../utils';

// 当 axis 在左边，且方向向上
export function labelLeftUp(renderer, label, tick, { fontSize }) {
  const { x, y } = tick;
  renderer.text({
    text: `↑ ${label}`, x, y, fontSize, textAnchor: 'end', dy: '-1em', class: 'label',
  });
}

// 当 axis 在左边，且方向向下
export function labelLeftDown(renderer, label, tick, { fontSize }) {
  const { x, y } = tick;
  renderer.text({
    text: `↓ ${label}`, x, y, fontSize, textAnchor: 'end', dy: '2em', class: 'label',
  });
}

// 当 axis 在底部，且方向向右
export function labelBottomRight(renderer, label, tick, { fontSize, tickLength }) {
  const { x, y } = tick;
  const ty = y + tickLength;
  renderer.text({
    text: `${label} →`, x, y: ty, fontSize, textAnchor: 'end', dy: '2em', class: 'label',
  });
}

// 当 axis 在顶部，且方向向右
export function labelTopRight(renderer, label, tick, { fontSize, tickLength }) {
  const { x, y } = tick;
  const ty = y - tickLength;
  renderer.text({
    text: `${label} →`, x, y: ty, fontSize, textAnchor: 'end', dy: '-1.2em', class: 'label',
  });
}

// 垂直方向的线
export function gridVertical(renderer, ticks, end) {
  const [, y2] = end;
  for (const { x, y } of ticks) {
    renderer.line({
      x1: x, y1: y, x2: x, y2, stroke: '#eee', class: 'grid',
    });
  }
}

// 水平方向的线
export function gridHorizontal(renderer, ticks, end) {
  const [x2] = end;
  for (const { x, y } of ticks) {
    renderer.line({
      x1: x, y1: y, x2, y2: y, stroke: '#eee', class: 'grid',
    });
  }
}

// 绘制一系列从圆心发散的直线
export function gridRay(renderer, ticks, end) {
  const [x2, y2] = end;
  for (const { x, y } of ticks) {
    renderer.line({
      x1: x, y1: y, x2, y2, stroke: '#eee', class: 'grid',
    });
  }
}

// 绘制一系列同心圆
export function gridCircular(renderer, ticks, end) {
  const [cx, cy] = end;
  for (const { x, y } of ticks) {
    const r = dist(end, [x, y]);
    renderer.circle({
      fill: 'none', stroke: '#eee', cx, cy, r, class: 'grid',
    });
  }
}
