import React from 'react';

import Main from 'components/layouts/main/Main';
import { PublicRoute } from 'utils/AutorizarionRoutes';

function Home() {
  return (
    <PublicRoute>
    <Main>
      <h1>Hello Home</h1>
    </Main>
    </PublicRoute>
  );
}

export default Home;
