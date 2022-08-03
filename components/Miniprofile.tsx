const Miniprofile = () => {
  return (
    <div className='flex items-center justify-between mt-14 ml-10'>
      <img
        className='border p-[2px] rounded-full
        w-16 h-16'
        src='https://links.papareact.com/3ke'
        alt='miniprofile'
      />

      <div className='flex-1 mx-4'>
        <h2 className='font-bold'>Username</h2>
        <h3
          className='text-sm text-gray-400
        '>
          Welcome to Instagram Clone
        </h3>
      </div>

      <button
        className='text-blue-400 text-sm 
      font-semibold'>
        Sign out
      </button>
    </div>
  );
};
export default Miniprofile;
