// @ts-nocheck
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";
interface Post {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

const Post = ({ id, caption, userImg, username, img }: Post) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session?.user.username,
      });
    }
  };

  const sendComment = async (e: any) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment(" ");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.name,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className='bg-white my-7 rounded-sm border'>
      {/* header */}

      <div className='flex items-center p-5'>
        <img
          className='rounded-full h-12 w-12
          object-contain p-1 mr-3 
          '
          src={userImg}
          alt='Post Profile'
        />
        <p className='flex-1 font-bold'>{username}</p>
        <DotsHorizontalIcon className='h-5 cursor-pointer' />
      </div>

      {/* img */}
      <img className='oject-cover w-full' src={img} alt='Post image' />

      {/* Buttons */}
      {session && (
        <div className='flex justify-between px-4 pt-4'>
          <div className='flex items-center space-x-4'>
            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className='btnPost text-red-500'
              />
            ) : (
              <HeartIcon onClick={likePost} className='btnPost' />
            )}
            <ChatIcon className='btnPost' />
            <PaperAirplaneIcon className='btnPost' />
          </div>

          <BookmarkIcon className='btnPost' />
        </div>
      )}
      {/* caption */}
      <p className='p-5 truncate'>
        {likes.length > 0 && (
          <p className='font-bold mb-1'>{likes.length} likes</p>
        )}

        <span className='font-bold mr-1'>{username} </span>
        {caption}
      </p>

      {/* comments  */}
      {comments.length > 0 && (
        <div
          className='ml-10 h-20 overflow-y-scroll
        scrollbar-thumb-black scrollbar-thin
        '>
          {comments.map((commen: any) => {
            const date = commen.data().timestamp.toDate();

            return (
              <div key={commen.id} className='flex items-center space-x-2 mb-3'>
                <img
                  className='rounded-full h-7'
                  src={commen.data().userImage}
                  alt='comment'
                />
                <p className='text-sm flex-1'>
                  <span className='font-bold'>{commen.data().username} </span>
                  {commen.data().comment}
                </p>
                <Moment fromNow className='pr-5 text-xs'>
                  {commen.data().timestamp?.toDate()}
                </Moment>
              </div>
            );
          })}
        </div>
      )}

      {/* input box */}
      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            onChange={(e: any) => setComment(e.target.value)}
            value={comment}
            placeholder='Add a comment...'
            type='text'
            className='border-none flex-1 focus:ring-0 outline-none'
          />
          <button
            type='submit'
            disabled={!comment.trim()}
            onClick={sendComment}
            className='font-semibold text-blue-400
          '>
            Post
          </button>
        </form>
      )}
    </div>
  );
};
export default Post;
