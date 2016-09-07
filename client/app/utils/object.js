export function filter() {
  const filtered = {};
  for(let key in this) if(this[key]) filtered[key] = this[key];
  return filtered;
}
