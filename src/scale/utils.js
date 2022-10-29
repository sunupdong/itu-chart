export function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}

// step0 是生成指定数量的刻度的间隔
// step1 是最后生成的刻度的间隔
// 我们希望 step1 满足两个条件：
// 1. step1 = 10 ^ n * b (其中 b=1,2,5)
// 2. step0 和 step1 的误差尽量的小
export function tickStep(min, max, count) {
  const e10 = Math.sqrt(50); // 7.07
  const e5 = Math.sqrt(10); // 3.16
  const e2 = Math.sqrt(2); // 1.41

  // 获得目标间隔 step0，设 step0 = 10 ^ m
  const step0 = Math.abs(max - min) / Math.max(0, count);
  // 获得 step1 的初始值 = 10 ^ n < step0，其中 n 为满足条件的最大整数
  let step1 = 10 ** Math.floor(Math.log(step0) / Math.LN10);
  // 计算 step1 和 step0 的误差，error = 10 ^ m / 10 ^ n = 10 ^ (m - n)
  const error = step0 / step1;
  // 根据当前的误差改变 step1 的值，从而减少误差
  // 1. 当 m - n >= 0.85 = log(e10) 的时候，step1 * 10
  // 可以减少log(10) = 1 的误差
  if (error >= e10) step1 *= 10;
  // 2. 当 0.85 > m - n >= 0.5 = log(e5) 的时候，step1 * 5
  // 可以减少 log(5) = 0.7 的误差
  else if (error >= e5) step1 *= 5;
  // 3. 当 0.5 > m - n >= 0.15 = log(e2) 的时候，step1 * 2
  // 那么可以减少 log(2) = 0.3 的误差
  else if (error >= e2) step1 *= 2;
  // 4. 当 0.15 > m - n > 0 的时候，step1 * 1
  return step1;
}

export function ticks(min, max, count) {
  const step = tickStep(min, max, count);
  // 让 start 和 stop 都是 step 的整数倍
  // 这样生成的 ticks 都是 step 的整数倍
  // 可以让可读性更强
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = Math.ceil(stop - start + 1);
  // n 不一定等于 count，所以生成的 ticks 的数量可能和指定的不一样
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}

// 简单解决 js 的精读问题：0.1 + 0.2 !== 0.3
export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

export function floor(n, base) {
  return base * Math.floor(n / base);
}

export function band({ domain, range, padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + padding);
  const bandWidth = step * (1 - padding);
  const interval = step - bandWidth;
  const x = (_, i) => r0 + interval + step * i;
  return {
    step,
    bandWidth,
    bandRange: new Array(n).fill(0).map(x),
  };
}

export function log(n, base) {
  return Math.log(n) / Math.log(base);
}
