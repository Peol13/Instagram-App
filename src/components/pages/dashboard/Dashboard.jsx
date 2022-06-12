import React, { useContext, useEffect, useState } from "react";
import Main from "components/layouts/main/Main";
import { toast } from "react-toastify";
import { RestrictedRoute } from "utils/AutorizarionRoutes";
import { update, get, save } from "services/firebase";
import { MainContext } from "components/contexts/main";

import styles from "./style.module.css";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const {currentUser} = useContext(MainContext)
  useEffect(() => {
    get("posts").then((databasePosts) => {
      setPosts(Object.values(databasePosts ?? {}));
    });
  }, []);

  const handleLike = (post) => { 
     
    const wasLiked = post.likes?.find((like) => like.email === currentUser.email)

   toast("Udało się polikować komentarz")

    if(wasLiked){
     return
    } 

    const newLikes = post.likes
      ? post.likes.concat({ email: currentUser.email })
      : [{ email: currentUser.email }];

    update(`posts/${post.id}`, {
      ...post,
      likes: newLikes,
    }).then(() => {
      const copiedPostArray = [...posts];
      const selectedPostIndex = posts.findIndex(
        (frontPost) => frontPost.id === post.id
      );

        save('notifications',{
          value: 'Ktoś polajkował Twój post',
          reciepient: post.author.name,
        })

      copiedPostArray[selectedPostIndex].likes = newLikes;
      setPosts(copiedPostArray);
    });
  };
  return (
    <RestrictedRoute>
     <Main>
        <ul className={styles.list}>
          {posts.map((post) => {
            const wasLiked = post.likes?.find(
              (like) => like.email === currentUser.email
            );

            return (
              <li key={post.id}>
                <div className={styles.avatarContainer}>
                  <img src={post.author?.avatar} alt="avatar" />
                  <p>{post.author?.name}</p>
                </div>
                <img src={post.image} alt="post" />
                <div className={styles.descriptionContainer}>
                  <div className={styles.likesContainer}>
                    <button
                      onClick={() => handleLike(post)}
                      className={`mojaKlasa ${wasLiked ? styles.liked : ''}`}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Ei-like.svg/1200px-Ei-like.svg.png"
                        alt="Like"
                      />
                      Like ({post.likes?.length ?? 0})
                    </button>
                  </div>
                  <p className={styles.title}>{post.title}</p>
                  <p className={styles.description}>{post.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Main>
      ;
    </RestrictedRoute>
  );
}

export default Dashboard;
