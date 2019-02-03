import { Clock } from './clock'

test('it should format to readable time', () => {
  expect(Clock.formatTotalSeconds(70)).toBe("00:01:10");
});