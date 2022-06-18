/**
 * @param {number} number
 * @param {Object} opts
 */
export function scale(num, opts = {}) {
  const { o, t } = opts;
  return ((num - o[0]) * (t[1] - t[0])) / (o[1] - o[0]) + t[0];
}

console.log(scale(5, { o: [0, 10], t: [0, 100] }));
