import { useEffect } from 'react'
import { NameGameItemReveal, NameGameModel } from '../../Model/NameGameModel'

interface NameGameBox {
  item: NameGameItemReveal
  hidden: boolean
  className?: string
  controllerView: boolean
}

export const NameGameBox: React.FC<NameGameBox> = ({ item, className, controllerView }) => {
  useEffect(() => {
    if (!controllerView && item.revealed) {
      let audio = new Audio('/GameShow/correct.mp3')
      audio.play()
    }
  }, [item.revealed])

  return (
    <div style={{ perspective: '1000px' }} className='w-[200px]'>
      <div
        id='inner'
        className='rounded relative w-full h-full shadow-md border-4'
        style={{
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: item.revealed ? 'rotateY(180deg)' : 'rotateY(0)',
        }}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
          }}
          className={` p-2 h-20 bg-[#d613cc] content-center text-center ${className}`}>
          {controllerView && <div className='font-semibold text-white'>{item.title}</div>}
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className={` p-2 h-20 bg-teal-400 content-center text-center ${className}`}>
          <div className='font-bold'>{item.title} </div>
        </div>
      </div>
    </div>
  )
}
