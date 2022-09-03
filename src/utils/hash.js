export function add0x(hash) {
  if (!hash.startsWith("0x")) {
    return "0x" + hash;
  } else {
    return hash;
  }
}
