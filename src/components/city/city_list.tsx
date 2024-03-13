import { FC } from 'react';

export type TCityProps = {
  name: string;
}

export const CityList: FC<TCityProps> = ({name}) => (
  <li className="locations__item">
    <a className="locations__item-link tabs__item" href="#">
      <span>{name}</span>
    </a>
  </li>
);
