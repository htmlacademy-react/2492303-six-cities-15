import { NameSpace } from '../../const';
import { City } from '../../mocks/city';
import OffersData from '../../mocks/offers';
import { getDataLoadingStatus, getErrorStatus, getOffers } from './selectors';

describe('Offers selectors', () => {
  const state = {
    [NameSpace.Data]: {
      offers: OffersData,
      offersNear: [],
      city: City[0],
      isOfferLoading: false,
      hasError: false,
      favorite: []
    }
  };

  it('should return offers data loading status', () => {
    const { isOfferLoading } = state[NameSpace.Data];
    const result = getDataLoadingStatus(state);
    expect(result).toBe(isOfferLoading);
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
