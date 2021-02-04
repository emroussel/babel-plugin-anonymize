function firstScope(a) {
  const b = 2;
  return a + b;
}

function secondScope(b) {
  const a = 2;
  return a + b;
}
