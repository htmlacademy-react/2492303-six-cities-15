import { TOffersData } from '../../const';

function SortOffer(offersData: TOffersData[], typeS: string): TOffersData[] {
  if (typeS === 'low'){
    return offersData.slice().sort((a, b) => a.price - b.price);
  }
  if (typeS === 'height'){
    return offersData.slice().sort((a, b) => b.price - a.price);
  }
  if (typeS === 'rated'){
    return offersData.slice().sort((a, b) => b.rating - a.rating);
  }
  if (typeS === 'popular'){
    return offersData.slice().sort((a, b) => a.popular - b.popular);
  } else {
    return offersData;
  }
}

export default SortOffer;
