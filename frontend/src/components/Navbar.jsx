import React from 'react';
import stake from '../assets/stak.svg'
function Navbar() {
  return (
    
    <div className="navbar bg-gray-800">
  <div className="flex-1">
   
    <img src={stake} alt="img" className='h-14 w-18 bg-white rounded-md' />
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1 ">
      <li>
      <div className=" h-[3rem] bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center">
           <span className="">0.000</span>
           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H9a2 2 0 01-2-2V10.338c0-.75.293-1.464.732-2.06 1.457-.955 3.01-1.484 4.5-1.484h4.502c1.485 0 2.993.529 4.499 1.484.439.596.732 1.31.732 2.06V21a2 2 0 01-2 2z" />
           </svg>
         </div>
      </li>
     
         <li>
         <button className="  btn btn-info text-white font-bold py-2 px-4 rounded md:ml-4">
           Wallet
         </button>
         </li>
    </ul>
  </div>
</div>
  );
}

export default Navbar;