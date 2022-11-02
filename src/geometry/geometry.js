export function createGeometry(channels, render) {
  const geometry = (renderer, I, scales, values, styles, coordinate) => {
    for (const [key, { optional, scale }] of Object.entries(channels)) {
      // 只有必选的通道才会被检查
      if (!optional) {
        // 如果没有提供对应的值就抛出异常
        if (!values[key]) throw new Error(`Missing Channel: ${key}`);
        // 目前只用判断一下 band 比例尺
        if (scale === 'band' && (!scales[key] || !scales[key].bandWidth)) {
          throw new Error(`${key} channel needs band scale.`);
        }
      }
    }
    return render(renderer, I, scales, values, styles, coordinate);
  };

  // 将需要的通道返回
  geometry.channels = () => channels;

  return geometry;
}
