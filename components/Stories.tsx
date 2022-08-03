import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { User } from "../types";
import { createRandomUser, Users } from "../utils/fakeUsers";
import Story from "./Story";

const Stories = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    Array.from({ length: 10 }).forEach(() => {
      Users.push(createRandomUser());
    });
    setUsers(Users);
  }, [Users]);

  return (
    <div
      className='flex space-x-2 p-6 bg-[white] mt-8
     border-gray-200 border rounded-sm 
     overflow-x-scroll scrollbar-thin
      scrollbar-thumb-black'>
      {users.map((profile) => {
        return <Story key={profile.userId} profile={profile} />;
      })}
    </div>
  );
};
export default Stories;
