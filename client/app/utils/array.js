export function range(begin = 0, end) {
  if(begin > end)
    return range(end, begin).reverse();
  return new Array(end - begin).fill(0).map((_, index) => index + begin);
}
