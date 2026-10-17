import { describe, expect, it } from 'vitest';
import { TOURS } from './tours';

describe('current package catalogue', () => {
  it('contains only the nine requested packages', () => {
    expect(TOURS.map(t => t.title).sort()).toEqual([
      'Shrikhand Mahadev Trek', 'Kinnar Kailash Trek', 'Himachal Tour',
      'Yulla Kanda Trek', 'Shimla Tour', 'Kullu Manali Tour',
      'Shimla Manali Tour', 'Spiti Tour', 'Kinnaur Spiti Tour',
    ].sort());
  });
  it('marks every newly drafted itinerary as suggested', () => {
    expect(TOURS.filter(t => !['shrikhand-mahadev', 'kinner-kailash'].includes(t.id)).every(t => t.suggested === true)).toBe(true);
  });
  it('retains the original seven-day Shrikhand route', () => {
    expect(TOURS.find(t => t.id === 'shrikhand-mahadev')?.stops.map(s => s.day)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});