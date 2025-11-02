import dateFormatter from './dateFormatter';

describe('dateFormatter', () => {
  it('should return formatted date (day month year) ', async () => {
    const date = dateFormatter('2025-01-01T00:00:00Z');

    expect(date).toMatch('1 Jan 2025');
  });
});
