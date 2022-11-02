// 获得由通道指定的样式
export function channelStyles(index, channels) {
  const { stroke: S, fill: F } = channels;
  // 只有当 stroke 和 fill 这两个通道被指定的时候才会有用
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] }),
  };
}

// 获取这个组的第一个点的样式作为该条线的样式
export function groupChannelStyles([index], channels) {
  return channelStyles(index, channels);
}
