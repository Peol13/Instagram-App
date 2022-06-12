import React from 'react';
import Main from 'components/layouts/main/Main';
import { PublicRoute } from 'utils/AutorizarionRoutes';

function RemindPassword() {
  return <PublicRoute>
    <Main>Hello from RemindPassword</Main>
    </PublicRoute>
}

export default RemindPassword;
