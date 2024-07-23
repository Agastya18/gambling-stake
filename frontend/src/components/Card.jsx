import mine from "../assets/a2.jpeg"
import dice from "../assets/a3.jpeg"
import cric from "../assets/a4.png"
import plinko from "../assets/a5.jpeg"
import bj from "../assets/a6.jpeg"
import { Link } from "react-router-dom"

const Card = () => {
  return (
    <div className="container mx-auto px-4 py-12   ">
        <h1 className="text-3xl font-bold mb-4">Continue playing</h1>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
         
          <Link to={'/game/dice'} className=" hover: transition duration-100   hover:scale-95">
          <img
                src={dice}
                alt="Hilo"
                className=" h-[320px] w-[240px] flex justify-center items-center  rounded-lg "
              />
          </Link>
    
          <div className="card bg-base-100  image-full  w-60 shadow-xl">
  <figure>
    <img
      src={mine}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title ">Comming Soon!!</h2>
    
  </div>
</div>


<div className="card bg-base-100  image-full  w-60 shadow-xl">
  <figure>
    <img
      src={cric}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title ">Comming Soon!!</h2>
    
  </div>
</div>

<div className="card bg-base-100  image-full  w-60 shadow-xl">
  <figure>
    <img
      src={plinko}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title ">Comming Soon!!</h2>
    
  </div>
</div>




    

 
              


<div className="card bg-base-100  image-full  w-60 shadow-xl">
  <figure>
    <img
      src={bj}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title ">Comming Soon!!</h2>
    {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
    {/* <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div> */}
  </div>
</div>
            

          
        </div>
      </div>
  )
}

export default Card