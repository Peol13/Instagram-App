import React from 'react';

import Main from 'components/layouts/main/Main';
import { PublicRoute } from 'utils/AutorizarionRoutes';

function NotFound() {
  return ( <PublicRoute>
    <Main>
      <p>Not Found</p>
    </Main>
    </PublicRoute>
  );
}

export default NotFound;
