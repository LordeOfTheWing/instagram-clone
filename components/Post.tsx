import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

interface Post {
  id: string;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

const Post = ({ id, caption, userImg, username, img }: Post) => {
  const { data: session } = useSession();
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
            <HeartIcon className='btnPost' />
            <ChatIcon className='btnPost' />
            <PaperAirplaneIcon className='btnPost' />
          </div>

          <BookmarkIcon className='btnPost' />
        </div>
      )}
      {/* caption */}
      <p className='p-5 truncate'>
        <span className='font-bold mr-1'>{username} </span>
        {caption}
      </p>

      {/* comments  */}

      {/* input box */}
      {session && (
        <form className='flex items-center p-4'>
          <EmojiHappyIcon className='h-7' />
          <input
            placeholder='Add a comment...'
            type='text'
            className='border-none flex-1 focus:ring-0 outline-none'
          />
          <button
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
