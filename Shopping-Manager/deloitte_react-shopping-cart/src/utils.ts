export function areEqualShallow(a: any, b: any) {
  for (var key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }
  for (var key in b) {
    if (!(key in a) || a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
