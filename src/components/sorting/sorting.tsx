import { FC, useState } from 'react';

export type TSortingProps = {
  setTypeSort: (e: string) => void;
};

export const Sorting: FC<TSortingProps> = ({setTypeSort: setTypeSort}) => {
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
      <ul style ={{display: hover ? 'block' : 'none'}} className="places__options places__options--custom places__options--opened">
        <li
          className={`places__option${filter === 'Popular' ? ' places__option--active' : ''}`}
          tabIndex={0}
          onClick={() => {
            setTypeSort('popular');setHover(false);{setFilter('Popular');}
          }}
        >
        Popular
        </li>
        <li className={`places__option${filter === 'Price: low to high' ? ' places__option--active' : ''}`}
          tabIndex={0} onClick={() => {
            setTypeSort('low');setHover(false);setFilter('Price: low to high');
          }}
        >
        Price: low to high
        </li>
        <li className={`places__option${filter === 'Price: high to low' ? ' places__option--active' : ''}`}
          tabIndex={0} onClick={() => {
            setTypeSort('height');setHover(false);setFilter('Price: high to low');
          }}
        >
        Price: high to low
        </li>
        <li className={`places__option${filter === 'Top rated first' ? ' places__option--active' : ''}`}
          tabIndex={0} onClick={() => {
            setTypeSort('rated');setHover(false);setFilter('Top rated first');
          }}
        >
        Top rated first
        </li>
      </ul>
    </form>
  );
};
