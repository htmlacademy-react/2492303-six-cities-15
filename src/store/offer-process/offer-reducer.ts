import { TOffer, TOfferFull, TCity, TComments, NameSpace } from '../../const';
import { cities } from '../../mocks/city';
import { insertOffer, updateCity } from '../action';
import { createSlice} from '@reduxjs/toolkit';
import { fetchOffersAction, fetchOfferAction, fetchOfferNearAction, fetchOfferCommentsAction, AddCommentAction, fetchFavoriteAction, AddFavoriteAction } from '../api-actions';

export type InitialState = {
  offers: TOffer[];
  offersNear: TOffer[];
  offer?: TOfferFull;
  city: TCity;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  hasError: boolean;
  comments?: TComments[];
  favorites: TOffer[];
  loadingStatus?: 'rejected'|'fulfilled'|'pending';
}

const initialState: InitialState = {
  offers: [],
  offersNear: [],
  city: cities[0],
  isOffersLoading: false,
  isOfferLoading: false,
  hasError: false,
  loadingStatus:'fulfilled',
  favorites:[]
};

export const OfferData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(insertOffer, (state, action) => {
        state.offers.push(action.payload);
      })
      .addCase(updateCity, (state, action) => {
        state.city = action.payload;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.hasError = false;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.hasError = false;
        state.isOfferLoading = true;
      })
      .addCase(fetchOfferNearAction.fulfilled, (state, action) => {
        state.offersNear = action.payload;
      })
      .addCase(fetchOfferCommentsAction.rejected, (state) => {
        state.loadingStatus = 'rejected';
      })
      .addCase(fetchOfferCommentsAction.pending, (state, action) => {
        state.loadingStatus = 'pending';
        state.comments = action.payload;
      })
      .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
        state.loadingStatus = 'fulfilled';
        state.comments = action.payload;
      })
      .addCase(AddCommentAction.fulfilled, (state) => {
        state.hasError = false;
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(AddFavoriteAction.fulfilled, (state, action) => {
        state.hasError = false;
        const index = state.offersNear?.findIndex((item) => item.id === action.payload.id);
        if (index > -1) {
          state.offersNear[index].isFavorite = action.payload.isFavorite;
        }

        if (state.offer && state.offer.id === action.payload.id){
          state.offer.isFavorite = action.payload.isFavorite;
        }

      });
  }
});
