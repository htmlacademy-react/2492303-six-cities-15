import {NameSpace, TCity, TOffer} from '../../const';
import {State} from '../../types/state';
import { createSelector } from 'reselect';

export const getOffers = (state: Pick<State, NameSpace.Data>): TOffer[] => state[NameSpace.Data].offers;
export const getCurrentCity = (state: Pick<State, NameSpace.Data>): TCity => state[NameSpace.Data].city;

export const makeOffersFilter = createSelector(
  [ getOffers, getCurrentCity ],(offers, city) => offers.filter((offer: TOffer) => offer.city.name === city.name)
);
