import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import { FC } from 'react';
import { AppRoute } from '../../const';

export const NotFoundScreen: FC = ()=> (
  <section>
    <Helmet>
      <title>Страница не найдена</title>
    </Helmet>

    <section>
      <h1>404. Page not found</h1>
      <Link to={AppRoute.Main}>Вернуться на главную</Link>
    </section>
  </section>
);
