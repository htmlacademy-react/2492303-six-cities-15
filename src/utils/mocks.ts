import {AuthorizationStatus} from '../const';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { cities } from '../mocks/city';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  DATA: { isOffersLoading: false, isOfferLoading: false, offers: [], hasError: false, offersNear:[], city:cities[0], favorites:[], isFavoritesLoading: false },
  ...initialState ?? {},
});

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
