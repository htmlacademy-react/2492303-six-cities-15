import { renderHook } from '@testing-library/react';
import useMap from './useMap';
import { City } from '../../mocks/city';

describe('Hook: useMap', () => {
  it('should return array with 2 elements', () => {

    const cur = {current:null};
    const { result } = renderHook(() => useMap(cur, City[1]));

    expect(result.current).toBe(null);
  });
});
