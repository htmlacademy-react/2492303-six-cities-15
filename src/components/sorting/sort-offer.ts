import { TOffer } from '../../const';

function sortOffer(offersData: TOffer[], typeSort: string): TOffer[] {
  if (typeSort === 'low'){
    return offersData.slice().sort((a, b) => a.price - b.price);
  }
  if (typeSort === 'height'){
    return offersData.slice().sort((a, b) => b.price - a.price);
  }
  if (typeSort === 'rated'){
    return offersData.slice().sort((a, b) => b.rating - a.rating);
  } else {
    return offersData;
  }
}

export default sortOffer;
