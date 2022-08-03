import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

interface Post {
  id: number;
  username: string;
  userImg: string;
  img: string;
  caption: string;
}

interface Props {
  post: Post;
}

const Post = ({ post }: Props) => {
  return (
    <div className='bg-white my-7 rounded-sm border'>
      {/* header */}

      <div className='flex items-center p-5'>
        <img
          className='rounded-full h-12 w-12
          object-contain p-1 mr-3 
          '
          src={post.userImg}
          alt='Post Profile'
        />
        <p className='flex-1 font-bold'>{post.username}</p>
        <DotsHorizontalIcon className='h-5 cursor-pointer' />
      </div>

      {/* img */}
      <img className='oject-cover w-full' src={post.img} alt='Post image' />

      {/* Buttons */}
      <div className='flex justify-between px-4 pt-4'>
        <div className='flex items-center space-x-4'>
          <HeartIcon className='btnPost' />
          <ChatIcon className='btnPost' />
          <PaperAirplaneIcon className='btnPost' />
        </div>

        <BookmarkIcon className='btnPost' />
      </div>
      {/* caption */}
      <p className='p-5 truncate'>
        <span className='font-bold mr-1'>{post.username} </span>
        {post.caption}
      </p>

      {/* comments  */}

      {/* input box */}
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
    </div>
  );
};
export default Post;
