export function createOrdinal({ domain, range }) {
  return (x) => {
    const index = domain.findIndex((d) => equal(d, x));
    // 取模的目的是为了应对 domain.length > range.length 的情况
    return range[index % range.length];
  };
}

// 通过对象序列化结果简单判断两个对象是否相等
export function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
