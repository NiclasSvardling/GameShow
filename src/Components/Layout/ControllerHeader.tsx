import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Outlet } from 'react-router-dom'
import useLocalStorage from '../../Hooks/localStorageHook'

export const ControllerHeader: React.FC = () => {
  const [audioPlay, setAudioPlay] = useLocalStorage<
    { audio: string; play: boolean; seed?: number } | undefined
  >('audioPlay', undefined)

  return (
    <>
      <header className='absolute right-[50px] z-10'>
        <div className='flex grow justify-center gap-24 text-7xl z-100'>
          <FontAwesomeIcon
            className='text-[#86efac] cursor-pointer'
            icon={faThumbsUp}
            onClick={() => {
              setAudioPlay({ audio: '/correct.mp3', play: true, seed: Math.random() })
              // let audio = new Audio('/correct.mp3')
              // audio.play()
            }}
          />
          <FontAwesomeIcon
            className='cursor-pointer text-[#f43f5e]'
            icon={faThumbsDown}
            onClick={() => {
              setAudioPlay({ audio: '/incorrect.mp3', play: true, seed: Math.random() })
            }}
          />
        </div>
      </header>
      <Outlet />
    </>
  )
}
