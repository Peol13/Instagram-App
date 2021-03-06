import React, { useState, useEffect, useContext } from "react";
import "./Main.css";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import { Context } from "../../helpers/userinfo";
import { Link } from "react-router-dom";

const userData = localStorage.getItem("User");
const LSUser = JSON.parse(userData);

const postsData = localStorage.getItem("post");
const posts = JSON.parse(postsData);

function Main() {
  const [user, setUser] = useState([{ login: false }]);
  let [userInfo] = useContext(Context);

  useEffect(() => {
    if (userData) {
      setUser(LSUser);
    }
  }, [user]);

  if (user[0].login === true) {
    userInfo = "login success";
  }

  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          {userInfo !== "login success" ? (
            <p>
              <Link to="/ca">Stwórz konto</Link> lub <Link to="/me">zaloguj się</Link> aby móc
              dodawać posty
            </p>
          ) : (
            <>
              {posts?.map((post) => {
                return (
                  <div key={post.id} className="post">
                    {LSUser?.map((user) => {
                      return (
                        <>
                          <div key={user.nick} className="header-post">
                            <div className="avatar-wrapper">
                              <img
                                className="avatar"
                                src={user.avatar}
                                alt="Tu powinien wyświetlić się Twój awatar"
                              ></img>
                              <p className="nick">{user.nick}</p>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                            </svg>
                          </div>
                          <img
                            className="post-img"
                            src={post.img}
                            alt="Tu powonno wyświetlić się twoje zdjęcie"
                          ></img>

                          <div className="icon-wrapper">
                            <div className="left-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                              </svg>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                              </svg>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                              />
                            </svg>
                          </div>

                          <p>
                            <b className="post-nick">{user.nick}</b> {post.title}
                          </p>
                          <p className="description"> Opis: {post.description}</p>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </>
          )}
        </header>
      </div>
      <Footer />
    </>
  );
}

export default Main;
