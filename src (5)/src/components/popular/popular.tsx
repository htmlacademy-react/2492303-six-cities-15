import { FC, useState } from 'react';

export type TPopularPageProps = {
  setTypeS: (e: string) => void;
};

export const Popular: FC<TPopularPageProps> = ({setTypeS}) => {
  const [hover, setHover] = useState(false);
  const [filter, setFilter] = useState('Popular');
  const handleMouseOver = () => {
    setHover(true);
  };
  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleMouseOver}>
        {filter}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      {(hover) &&
        <ul className="places__options places__options--custom places__options--opened">
          <li
            className="places__option places__option--active"
            tabIndex={0}
            onClick={() => {
              setTypeS('popular');setHover(false);{setFilter('Popular');}
            }}
          >
          Popular
          </li>
          <li className="places__option" tabIndex={0} onClick={() => {
            setTypeS('low');setHover(false);setFilter('Price: low to high');
          }}
          >
          Price: low to high
          </li>
          <li className="places__option" tabIndex={0} onClick={() => {
            setTypeS('height');setHover(false);setFilter('Price: high to low');
          }}
          >
          Price: high to low
          </li>
          <li className="places__option" tabIndex={0} onClick={() => {
            setTypeS('rated');setHover(false);setFilter('Top rated first');
          }}
          >
          Top rated first
          </li>
        </ul>}
    </form>
  );
};
