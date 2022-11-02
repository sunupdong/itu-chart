import { createChannel, createChannels } from './channel';
import { groupChannelStyles } from './style';
import { line as shapeLine } from './shape';
import { group } from '../utils';
import { createGeometry } from './geometry';

const channels = createChannels({
  z: createChannel({ name: 'z' }),
});

function render(renderer, I, scales, values, directStyles, coordinate) {
  const defaults = {};
  const { x: X, y: Y, z: Z } = values;
  // 将索引 index 按照 z 通道的值分组
  // 每一个组对应一条直线
  // 如果 z 通道没有被指定，就默认一个分组，只绘制一条直线
  const series = Z ? group(I, (i) => Z[i]).values() : [I];
  return Array.from(series, (I) => shapeLine(renderer, coordinate, {
    ...defaults,
    ...directStyles,
    // 获该组的样式
    ...groupChannelStyles(I, values),
    X,
    Y,
    I,
    fill: 'none', // 直线是没有填充颜色的
  }));
}

export const line = createGeometry(channels, render);
