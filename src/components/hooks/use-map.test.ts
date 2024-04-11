import { renderHook } from '@testing-library/react';
import useMap from './use-map';
import { cities } from '../../mocks/city';

describe('Hook: useMap', () => {
  it('should return null', () => {

    const cur = {current:null};
    const { result } = renderHook(() => useMap(cur, cities[1]));

    expect(result.current).toBe(null);
  });
});
