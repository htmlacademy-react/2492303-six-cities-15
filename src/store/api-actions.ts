import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {APIRoute, AppRoute, TAddComment, TAddFavorite, TComments, TOffer, TOfferFull} from '../const';
import { AuthData } from '../types/auth-data.js';
import { UserData } from '../types/user-data.js';
import { dropToken, saveToken } from '../services/token.js';
import { redirectToRoute } from './action.js';

export const fetchOffersAction = createAsyncThunk<TOffer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TOffer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<TOfferFull, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offerId',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<TOfferFull>(APIRoute.Offer + String(offerId));
    return data;
  },
);

export const fetchFavoriteAction = createAsyncThunk<TOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<TOffer[]>(APIRoute.Favorites);
    return data;
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<TComments[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<TComments[]>(APIRoute.Comments + offerId);
    return data;
  },
);

export const fetchOfferNearAction = createAsyncThunk<TOffer[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'nearby',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<TOffer[]>(`${APIRoute.Offer + String(offerId)}/nearby`);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(fetchFavoriteAction(''));
    dispatch(fetchOffersAction());
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchFavoriteAction(''));
    dispatch(fetchOffersAction());
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'check',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteAction(''));
    return data;
  },
);

export const AddCommentAction = createAsyncThunk<void, TAddComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addComment',
  async ({rating, comment, offerId}, {dispatch, extra: api}) => {
    await api.post<TAddComment>(APIRoute.Comments + offerId, {rating, comment});
    if (offerId){
      dispatch(fetchOfferCommentsAction(offerId));
    }
  },
);

export const AddFavoriteAction = createAsyncThunk<TOfferFull, TAddFavorite, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addFavorite',
  async ({status, offerId}, {dispatch, extra: api}) => {
    const {data} = await api.post<TOfferFull>(`${APIRoute.Favorites + offerId }/${status}`);
    if (offerId){
      dispatch(fetchFavoriteAction(offerId));
      dispatch(fetchOffersAction());
    }

    return data;
  },
);
