import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-proccess/user-process';
import { OfferData } from './offer-process/offer-reducer';

export const rootReducer = combineReducers({
  [NameSpace.Data]: OfferData.reducer,
  [NameSpace.User]: userProcess.reducer
});
