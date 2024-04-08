import { FC } from 'react';
import { useAppSelector } from '../hooks';
import { Link } from 'react-router-dom';

export type TCityProps = {
  title: string;
}

export const CityList: FC<TCityProps> = ({title}) =>{
  const activeCity = useAppSelector((state) => state.DATA.city);
  return (
    <Link to={'#'} className={`locations__item-link ${activeCity.name === title ? 'tabs__item--active' : 'tabs__item'}`}>
      <span>{title}</span>
    </Link>
  );
};
