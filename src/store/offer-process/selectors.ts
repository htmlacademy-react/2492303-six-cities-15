import { TComments } from './../../const';
import {NameSpace, TCity, TOffer} from '../../const';
import {State} from '../../types/state';
import { createSelector } from 'reselect';

export const getOffers = (state: Pick<State, NameSpace.Data>): TOffer[] => state[NameSpace.Data].offers;
export const getCurrentCity = (state: Pick<State, NameSpace.Data>): TCity => state[NameSpace.Data].city;
export const getDataLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].isOffersLoading;
export const getErrorStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].hasError;
export const getReviews = (state: Pick<State, NameSpace.Data>): TComments[] => state[NameSpace.Data].comments || [];

export const makeOffersFilter = createSelector(
  [ getOffers, getCurrentCity ],(offers, city) => offers.filter((offer: TOffer) => offer.city.name === city.name)
);

export const makeSortedReviews = createSelector(
  [ getReviews ],(reviews) => [...reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || []
);
