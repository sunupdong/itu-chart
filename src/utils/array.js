/**
 * 数据根据 key 分组
 * @param {T[]} array 需要分组的数据
 * @param {T => string} key 获得数据 key 的函数
 * @returns {Map<string, T>}
 * @example
 * const array = [
 *   {name:'a', value: 1},
 *   {name:'a', value: 2},
 *   {name:'b', value: 3}
 * ]
 * const groups = group(array, d => d.name);
 * groups // Map(2) {'a' => [{name: 'a', value:1}, {name: 'a', value: 2}], 'b' => [{name: 'b', value: 3}]}
 */
export function group(array, key = (d) => d) {
  const keyGroups = new Map();
  for (const item of array) {
    const k = key(item);
    const g = keyGroups.get(k);
    if (g) {
      g.push(item);
    } else {
      keyGroups.set(k, [item]);
    }
  }
  return keyGroups;
}
