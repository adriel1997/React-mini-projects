const sum = (a, b) => {
  return a + b;
};

test('should sum two numbers', () => {
  expect(sum(1, 2)).toBe(3);
});
