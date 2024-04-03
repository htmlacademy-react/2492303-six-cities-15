import { NameSpace } from '../../const';
import { City } from '../../mocks/city';
import OffersData from '../../mocks/offers';
import { getOffers } from './selectors';

describe('Offers selectors', () => {
//  const mockOffers = makeFakeOffers();
  const state = {
    [NameSpace.Data]: {
      offers: [OffersData],
      offersNear: [],
      city: City[0],
      isOfferLoading: false,
      hasError: false
    }
  };

  it('should return offers from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });
/*
  it('should return questions data loading status', () => {
    const { isQuestionsDataLoading } = state[NameSpace.Data];
    const result = getQuestionsDataLoadingStatus(state);
    expect(result).toBe(isQuestionsDataLoading);
  });

  it('should return error status from state', () => {
    const { hasError } = state[NameSpace.Data];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });*/
});
