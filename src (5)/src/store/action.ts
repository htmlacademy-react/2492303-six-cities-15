import { AppRoute, TCity, TOffer } from './../const';
import {createAction} from '@reduxjs/toolkit';

export const updateCity = createAction<TCity>('city/updateCity');

export const insertOffer = createAction<TOffer>('offer/insertOffer');

export const redirectToRoute = createAction<AppRoute>('/six-cities/offers');
