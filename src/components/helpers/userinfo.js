import React from "react";
import { useState } from "react";

export const Context = React.createContext();

const UserInfo = ({ children }) => {
  let userinfo = "don't create account";

  const [state, setState] = useState(userinfo);

  return <Context.Provider value={[state, setState]}>{children}</Context.Provider>;
};

export default UserInfo;
