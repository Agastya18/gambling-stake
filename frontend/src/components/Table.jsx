import React from 'react'

const Table = ({games}) => {

  return (
    <div className="overflow-x-auto ">
  <table className="table table-xs md:table-md table-pin-rows ">
    {/* head */}
    <thead className=' text-slate-800 '>
      <tr>
        <th></th>
        <th>isWin</th>
        <th>Bet Amount</th>
        <th>Multiplier</th>
        <th>Payout</th>
      </tr>
    </thead>
    <tbody className=' text-slate-300'>
      {/* row 1 */}
      {
        games.map((game, index) => (
          <tr key={index}
          className={`${game.status ? 'text-green-500' : 'text-red-500'} ${
                game.payout <= 0 ? 'bg-gray-700' : ''
              }`}
          >
            <td>{index + 1}</td>
            <td>{game.status ? 'Win' : 'Lose'}</td>
            <td>{game.betAmount}</td>
            <td>{game.multiplier}</td>
            <td  className={game.payout < 0 ? 'text-red-500' : ''}>{game.payout}</td>
          </tr>
        ))
      }
     
     
    
      
     
    </tbody>
  </table>
</div>
  )
}

export default Table