import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import Header from "components/elements/header/Header";
import Footer from "components/elements/footer/Footer";
import { observeOnlyNew } from "services/firebase";
import "react-toastify/dist/ReactToastify.css";
import { MainContext } from "components/contexts/main";

function Main({ children }) {
  const { currentUser } = useContext(MainContext);
  useEffect(() => {
    observeOnlyNew("notification", (notification) => {
      if (notification.reciepient === currentUser.displayName) {
        toast(notification.value);
      }
    });
  }, []);
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
