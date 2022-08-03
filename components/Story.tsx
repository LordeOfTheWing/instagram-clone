import { User } from "../types";

interface Props {
  profile: User;
}

const Story = ({ profile }: Props) => {
  //Story component
  //
  return (
    <div>
      <img
        className='h-14 w-14 rounded-full p-[1.5px] 
        border-red-500 border-2 object-contain 
        cursor-pointer hover:scale-110 transition
        transform duration-200 ease-out
        '
        src={profile.avatar}
        alt='Profile pic'
      />
      <p
        className='text-xs w-14 truncate 
      text-center'>
        {profile.userName}
      </p>
    </div>
  );
};
export default Story;
