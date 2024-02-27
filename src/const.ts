export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export type TOffersData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
}

export type TFavoriteData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
}
