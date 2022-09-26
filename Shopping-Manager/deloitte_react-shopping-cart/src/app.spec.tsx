const divide = (a, b) => {
  return a / b;
};

test('should divide two numbers', () => {
  expect(divide(6, 2)).toBe(3);
});

test('should divide two numbers', () => {
  expect(divide(6, 0)).toBe(Infinity);
});
