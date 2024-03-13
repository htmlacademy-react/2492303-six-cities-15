import { TOffersData } from '../const';
import { City } from './city';

const OffersData: TOffersData[] = [
  {
    id: 1,
    name: 'Best room',
    type: 'Room',
    price: 20,
    period: 'day',
    rating: '100%',
    location: {
      title: 'Best room',
      lat: 52.3909553943508,
      lng: 4.85309666406198,
    },
    city: City[1]
  },
  {
    id: 2,
    name: 'U Vartana',
    type: 'Bed',
    price: 10,
    period: 'hour',
    rating: '80%',
    location : {
      title: 'U Vartana',
      lat: 52.3609553943508,
      lng: 4.85309666406198,
    },
    city: City[3]
  },
  {
    id: 3,
    name: 'Hostel',
    type: 'Room',
    price: 3,
    period: 'day',
    rating: '10%',
    location: {
      title: 'Hostel',
      lat: 52.3909553943508,
      lng: 4.929309666406198,
    },
    city: City[3]
  },
  {
    id: 4,
    name: 'Sky',
    type: 'Room',
    price: 100,
    period: 'day',
    rating: '50%',
    location: {
      title: 'Sky',
      lat: 52.3809553943508,
      lng: 4.939309666406198,
    },
    city: City[3]
  }
];

export default OffersData;
