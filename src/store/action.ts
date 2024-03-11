import { TCity, TOffer } from './../const';
import {createAction} from '@reduxjs/toolkit';

export const updateCity = createAction<{city:TCity}>('city/updateCity');

export const insertOffer = createAction<{offer:TOffer}>('offer/insertOffer');
