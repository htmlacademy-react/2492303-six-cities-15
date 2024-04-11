import { TOffer, TOfferFull, TCity, TComments, NameSpace } from '../../const';
import { cities } from '../../mocks/city';
import { clearFavorites, insertOffer, updateCity } from '../action';
import { createSlice} from '@reduxjs/toolkit';
import { fetchOffersAction, fetchOfferAction, fetchOfferNearAction, fetchOfferCommentsAction, addCommentAction, fetchFavoriteAction, addFavoriteAction } from '../api-actions';

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
  isFavoritesLoading: boolean;
  addCommentStatus?: 'rejected'|'fulfilled'|'pending';
}

const initialState: InitialState = {
  offers: [],
  offersNear: [],
  city: cities[0],
  isOffersLoading: false,
  isOfferLoading: false,
  hasError: false,
  favorites:[],
  isFavoritesLoading:false,
  addCommentStatus:'fulfilled'
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
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
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
      .addCase(fetchOfferCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addCommentAction.fulfilled, (state) => {
        state.addCommentStatus = 'fulfilled';
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.addCommentStatus = 'rejected';
      })
      .addCase(addCommentAction.pending, (state) => {
        state.addCommentStatus = 'pending';
      })
      .addCase(fetchFavoriteAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isFavoritesLoading = false;
      })
      .addCase(fetchFavoriteAction.pending, (state) => {
        state.isFavoritesLoading = true;
      })
      .addCase(fetchFavoriteAction.rejected, (state) => {
        state.isFavoritesLoading = false;
      })
      .addCase(addFavoriteAction.fulfilled, (state, action) => {
        state.hasError = false;
        const index = state.offersNear?.findIndex((item) => item.id === action.payload.id);
        if (index > -1) {
          state.offersNear[index].isFavorite = action.payload.isFavorite;
        }

        const indexOffer = state.offers.findIndex((item) => item.id === action.payload.id);
        if (indexOffer > -1) {
          state.offers[indexOffer].isFavorite = action.payload.isFavorite;
        }

        if (state.offer && state.offer.id === action.payload.id){
          state.offer.isFavorite = action.payload.isFavorite;
        }

      })
      .addCase(clearFavorites, (state) => {
        state.offers.map((item) => {
          item.isFavorite = false;
        });
        state.offersNear.map((item) => {
          item.isFavorite = false;
        });

        state.favorites = [];
      });
  }
});
