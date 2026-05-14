import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

const LeftNavbar = ({ className }) => {

  const [totalMessages, setTotalMessages] = useState(0)
  const [durations, setDurations] = useState([])

  useEffect(() => {

    socket.on('user_duration', (data) => {
      setDurations((prev) => {
        const filtered = prev.filter(
          (u) => u.pseudo !== data.pseudo
        )
        return [...filtered, data]
      })
    })

    return () => {
      socket.off('user_duration')
    }

  }, [])


  return (

    <div className={`fixed top-0 left-0 bg-gray-50 h-screen  w-[80vw]  shadow-lg border-l transition-transform duration-500  ${className}`}>
      {/* <h3>Total messages : {totalMessages}</h3> */}
      <div>
        <h4 className='text-xl text-center font-semibold py-4 border-b  border-b-gray-100 shadow-xs bg-white'>Durée des utilisateurs</h4>
        <div className='flex flex-col gap-2'>
          {durations.map((user, i) => (
            <div key={i} className='border-b border-gray-200 py-4'>
              {user.pseudo} : {user.duree}
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default LeftNavbar