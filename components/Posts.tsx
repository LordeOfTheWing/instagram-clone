import Post from "./Post";

const posts = [
  {
    id: 123,
    username: "test@ig.com",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "YOLO",
  },
  {
    id: 123,
    username: "test@ig.com",
    userImg: "https://links.papareact.com/3ke",
    img: "https://links.papareact.com/3ke",
    caption: "YOLO",
  },
];

const Posts = () => {
  return (
    <div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
};
export default Posts;
