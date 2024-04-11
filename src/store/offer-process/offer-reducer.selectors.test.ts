import { NameSpace } from '../../const';
import { cities } from '../../mocks/city';
import OffersData from '../../mocks/offers';
import { getDataLoadingStatus, getErrorStatus, getOffers } from './selectors';

describe('Offers selectors', () => {
  const state = {
    [NameSpace.Data]: {
      offers: OffersData,
      offersNear: [],
      city: cities[0],
      isOffersLoading: false,
      isOfferLoading: false,
      hasError: false,
      favorites: [],
      isFavoritesLoading: false
    }
  };

  it('should return offers data loading status', () => {
    const { isOffersLoading } = state[NameSpace.Data];
    const result = getDataLoadingStatus(state);
    expect(result).toBe(isOffersLoading);
  });

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });


  it('should return error status from state', () => {
    const { hasError } = state[NameSpace.Data];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });
});
