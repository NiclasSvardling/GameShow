import { useEffect, useState } from 'react'
import useLocalStorage from '../../Hooks/localStorageHook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglass } from '@fortawesome/free-regular-svg-icons/faHourglass'

export const CountDownTime: React.FC = () => {
  const [timer, setTimer] = useLocalStorage<number | undefined>('CountDown', undefined)
  const [internalTimer, setInternalTimer] = useState<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    if (timer) {
      setInternalTimer(
        setInterval(() => {
          setTimer(timer - 1)
        }, 1000),
      )

      return () => clearInterval(internalTimer)
    }
  }, [timer])

  if (timer)
    return (
      <>
        <div>
          <div
            className={`${
              timer > 20 || timer % 2 == 0 ? 'text-white' : 'text-[#be123c]'
            } flex gap-1 items-center place-content-center mt-4 text-9xl`}>
            <FontAwesomeIcon icon={faHourglass} />
            <div>{timer}</div>
          </div>
        </div>
      </>
    )
}
