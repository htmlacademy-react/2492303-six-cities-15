import { TileLayer } from 'leaflet';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/'
}

export type TOffersData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
  location: Point;
  city: TCity;
}

export type TFavoriteData = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
}

export type TCity = {
  id: number;
  title: string;
  lat: number;
  lng: number;
  zoom: number;
};

export type Point = {
  title: string;
  lat: number;
  lng: number;
};

export type TReviewData = {
  id: number;
  name: string;
  note: string;
  rating: number;
  time: string;
  month: string;
  userName: string;
  img: string;
};

export type Points = Point[];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const layer = new TileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
);

export type TOffer = {
  id: number;
  name: string;
  type: string;
  price: number;
  period: string;
  rating: string;
  location: Point;
  city: TCity;
}

export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;
