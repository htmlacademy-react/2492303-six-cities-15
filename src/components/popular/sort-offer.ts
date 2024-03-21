import { TOffer } from '../../const';

function SortOffer(offersData: TOffer[], typeS: string): TOffer[] {
  if (typeS === 'low'){
    return offersData.slice().sort((a, b) => a.price - b.price);
  }
  if (typeS === 'height'){
    return offersData.slice().sort((a, b) => b.price - a.price);
  }
  if (typeS === 'rated'){
    return offersData.slice().sort((a, b) => b.rating - a.rating);
  } else {
    return offersData;
  }
  /* if (typeS === 'popular'){
    return offersData.slice().sort((a, b) => a. - b.isFavorite);
  }*/
}

export default SortOffer;
