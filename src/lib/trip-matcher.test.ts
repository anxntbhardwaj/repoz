import { describe, expect, it } from 'vitest';
import { matchTrip } from './trip-matcher';
import { TOURS } from './tours';
import type { PlanInput } from './planner';
const input: PlanInput = { dates: '10–17 July 2026', fitness: 'Beginner', budget: 20000, group: 2, interests: ['Culture & villages'], notes: 'Shimla' };
describe('catalogue trip matching', () => {
  it('recommends one of the current nine packages', () => {
    expect(TOURS.map(t => t.id)).toContain(matchTrip(input, TOURS)?.tourId);
  });
  it('never sends beginners on summit expeditions', () => {
    const result = matchTrip({ ...input, interests: ['Pilgrimage', 'High summits'] }, TOURS);
    expect(result).not.toBeNull();
    expect(TOURS.find(t => t.id === result?.tourId)?.region).not.toBe('Expeditions');
  });
  it('preserves the catalogue itinerary without inventing days', () => {
    const result = matchTrip(input, TOURS);
    expect(result?.itinerary).toEqual(TOURS.find(t => t.id === result?.tourId)?.stops.map(s => ({ day: s.day, title: s.title, detail: s.detail })));
  });
  it('handles an empty catalogue without a fabricated recommendation', () => {
    expect(matchTrip(input, [])).toBeNull();
  });
});
