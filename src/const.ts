export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id'
}

export type TOffer = {
  id: string;
  title: string;
  type: string;
  price: number;
  previewImage:string;
  city: TCity;
  location: Point;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
}

export type TOfferId = TOffer & {
  description: string;
  images: string[];
  goods: string[];
  host: THost;
  bedrooms: number;
  maxAdults: number;
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
  name: string;
  location: Point;
};

export type Point = {
  latitude: number;
  longitude: number;
  zoom: number;
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
  'img/pin-active.svg';
  //'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;

export enum APIRoute {
  Offers = 'offers',
  Offer = 'offers/',
  Login = 'login',
  Logout = 'logout',
  Comments = 'comments/',
  Favorites = '/favorite/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export type THost = {
  isPro:	boolean;
  name:	string;
  avatarUrl: string;
};

export type TComments = {
  id: string;
  date: Date;
  user: TUser;
  comment: string;
  rating: number;
};


export type TUser = {
  email: string;
  name: string;
  avatarUrl: string;
  isPro: false;
};

export type TAddComment = {
  rating?: number;
  comment?: string;
  offerId?: string;
};

export type TAddFavorite = {
  status?: number;
  offerId?: string;
};

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}
