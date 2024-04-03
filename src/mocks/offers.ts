import { TOffer } from "../const";

const OffersData: TOffer[] = [
  {
    id: '1',
    title: 'Best room',
    description: 'desc',
    type: 'Room',
    price: 20,
    previewImage: '1.png',
    city: {
      id: 3,
      name: 'Brussels',
      location:{
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13}
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    },
    isFavorite: false,
    isPremium: true,
    rating: 100
  },
  {
    id: 21,
    title: 'Best 333',
    description: 'desc',
    type: 'Room',
    price: 20,
    previewImage: '1.png',
    city: {
      id: 3,
      name: 'Brussels',
      location:{
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13}
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    },
    isFavorite: false,
    isPremium: true,
    rating: 100
  }
];

export default OffersData;
