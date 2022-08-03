import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Post from "./Post";
interface IPost {
  id: string;
  data: any;
}
const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("createdAt", "desc")),
        (snapshot: any) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  console.log(posts);

  return (
    <div>
      {posts.map((post: IPost) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImage}
            img={post.data().image}
            caption={post.data().caption}
          />
        );
      })}
    </div>
  );
};

export default Posts;
