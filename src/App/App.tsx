import { FC, PropsWithChildren } from 'react';
import { MainPage } from '../pages/main';

export type TAppProps = {
  cardAmount: number;
}

export const App: FC<PropsWithChildren<TAppProps>> = ({cardAmount}) => (
  <MainPage cardAmount={cardAmount} />
);

export default App;
