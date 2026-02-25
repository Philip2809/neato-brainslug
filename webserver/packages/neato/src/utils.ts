

export function getBasePath() {
  let str = window.location.pathname;
  return str.endsWith("/") ? str.slice(0, -1) : str;
}

