

const Dice = () => {
  return (
    <div className="bg-gray-900 min-h-screen ">
      <h1 className="text-3xl text-center text-white ">Dice</h1>
     
  <div className="flex w-full flex-col lg:flex-row ">
  <div className="card bg-gray-800 rounded-box grid h-[600px] flex-grow lg:flex-grow-0 lg:w-1/4 place-items-center">
  

  <div className=" flex flex-col gap-3 mb-8 ">
  <label  className="flex flex-col">
    <span className=" text-white font-bold ">Bet Amount:</span>
    <input type="text" className="bg-gray-200 input input-bordered" placeholder="0"/>
  </label>
 
 

  <label className="flex flex-col">
    <span className=" text-white font-bold ">Profit on Win:</span>
    <input type="text" className="bg-gray-200 input input-bordered" placeholder="0"/>
  </label>

  <button className="btn btn-wide  btn-success">Bet</button>
  
  </div>
  
 
  </div>
  <div className="divider lg:divider-horizontal ">OR</div>
  <div className="card bg-gray-800 rounded-box grid h-[600px]  flex-grow lg:flex-grow-0 lg:w-3/4 place-items-center">
   
  </div>
</div>


    </div>
  )
}

export default Dice