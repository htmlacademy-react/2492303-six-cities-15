import { TOffer, TOfferId, TCity, TComments, NameSpace } from '../../const';
import { City } from '../../mocks/city';
import { insertOffer, updateCity } from '../action';
import { createSlice} from '@reduxjs/toolkit';
import { fetchOffersAction, fetchOfferAction, fetchOfferNearAction, fetchOfferCommentsAction, AddCommentAction, fetchFavoriteAction, AddFavoriteAction } from '../api-actions';

export type InitialState = {
  offers: TOffer[];
  offersNear: TOffer[];
  offer?: TOfferId;
  city: TCity;
  isOfferLoading: boolean;
  hasError: boolean;
  comments?: TComments[];
  favorite: TOffer[];
  loadingStatus?: 'rejected'|'fulfilled'|'pending';
}

const initialState: InitialState = {
  offers: [],
  offersNear: [],
  city: City[0],
  isOfferLoading: false,
  hasError: false,
  loadingStatus:'fulfilled',
  favorite:[]
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
        state.isOfferLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.hasError = true;
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
        state.favorite = action.payload;
      })
      .addCase(AddFavoriteAction.fulfilled, (state, action) => {
        state.hasError = false;
        const index = state.offersNear?.findIndex((item) => item.id === action.payload.id);
        if (index > -1) {
          state.offersNear[index].isFavorite = action.payload.isFavorite;
        }

      });
  }
});
