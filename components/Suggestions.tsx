import { useEffect, useState } from "react";
import { User } from "../types";
import { createRandomUser } from "../utils/fakeUsers";

const Suggestions = () => {
  const [suggestions, setSuggestions] = useState<User[]>([]);

  const suggestionsFake: User[] = [];

  useEffect(() => {
    Array.from({ length: 5 }).forEach(() => {
      suggestionsFake.push(createRandomUser());
    });
    setSuggestions(suggestionsFake);
  }, []);

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <h3
          className='text-sm font-bold
        text-gray-400
        
        '>
          Suggestions For You
        </h3>
        <button
          className='text-gray-600 
        font-semibold'>
          See All
        </button>
      </div>

      {suggestions.map((suggestion) => {
        return (
          <div
            className='flex items-center justify-between mt-3'
            key={suggestion.userId}>
            <img
              className='w-10 h-10 rounded-full border p-[2px]'
              src={suggestion.avatar}
              alt='suggestion'
            />

            <div className='flex-1 ml-4'>
              <h2
                className='font-semibold text-sm
              '>
                {suggestion.userName}
              </h2>
            </div>
            <button
              className='text-blue-400
            text-sm font-bold
            '>
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Suggestions;
