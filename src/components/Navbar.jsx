import { assets } from '../assets/assets.js';
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo} alt="" className="w-[50%] max-w-[150px] " />
      <button
        onClick={() => setToken('')}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
