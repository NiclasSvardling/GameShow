import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../Hooks/localStorageHook'
import { JeopardyGameModel, JeopardyQuestionModel } from '../../Model/JeopardyGameModel'

interface JeopardyGameProps {
  isController?: boolean
}

export const JeopardyGame: React.FC<JeopardyGameProps> = ({ isController }) => {
  const [jeopardyGame, setJeopardyGame] = useLocalStorage<JeopardyGameModel[] | undefined>(
    'JeopardyGame',
    undefined,
  )

  const [boxPosition, setBoxPosition] = useState<
    { key: string; coord: { left: number; top: number } }[]
  >([])

  const width = isController ? 'w-40 h-28' : 'w-40 h-28'

  const handleQuestionClick = (q: JeopardyQuestionModel, id: number) => {
    setJeopardyGame(prev => {
      if (prev) {
        return prev.map(j => {
          if (j.id !== id) {
            return j
          }
          return {
            ...j,
            questions: j.questions.map(que => {
              if (que.id === q.id) {
                if (que.isDailyDouble && que.isRevealed) {
                  return { ...que, isDailyDouble: false }
                } else {
                  return { ...que, isRevealed: !que.isRevealed, isDone: true }
                }
              }
              return que
            }),
          }
        })
      }
      return prev
    })
  }

  useEffect(() => {
    jeopardyGame?.forEach((jeop, i) => {
      jeop.questions.map((q, j) => {
        const key = 'jeop' + i.toString() + j.toString()
        const element = document.getElementById(key)
        const rect = element?.getBoundingClientRect()
        const toAdd = {
          key: key,
          coord: {
            top: ((rect?.top ?? 0) + (rect?.bottom ?? 0)) / 2,
            left: ((rect?.left ?? 0) + (rect?.right ?? 0)) / 2,
          },
        }
        setBoxPosition(prev => {
          const filtered = prev.filter(k => k.key !== key)
          return [...filtered, toAdd]
        })
      })
    })
  }, [])

  return (
    <>
      <div
        className={`flex justify-center gap-4  ${!isController ? 'h-[100vh] items-center' : ''}`}>
        {jeopardyGame?.map((jeop, index) => (
          <React.Fragment key={index}>
            <div className='flex flex-col gap-2'>
              <div
                className={`text-2xl text-[#d59e4c] bg-[#06106e] text-center content-center p-1 ${width}`}>
                {jeop.theme}
              </div>
              <div className='flex flex-col gap-2'>
                {jeop.questions?.map((question, i) => (
                  <React.Fragment key={i}>
                    <div
                      id={`jeop${index}${i}`}
                      onClick={() => handleQuestionClick(question, jeop.id ?? -1)}
                      className={`cursor-pointer  text-5xl text-[#d59e4c] bg-[#06106e] text-center content-center p-1 ${width}`}>
                      {!question.isDone && <div> {(i + 1) * 200}$</div>}
                    </div>
                    <div
                      style={{
                        backgroundImage: question.isDailyDouble
                          ? 'url("/GameShow/DailyDouble.jpg")'
                          : '',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',

                        transformOrigin: `${
                          boxPosition.find(k => k.key == `jeop${index}${i}`)?.coord.left
                        }px ${boxPosition.find(k => k.key == `jeop${index}${i}`)?.coord.top}px`,
                      }}
                      onClick={() => handleQuestionClick(question, jeop.id ?? -1)}
                      className={`flex flex-col gap-20 font-semibold text-[#d59e4c] bg-[#06106e] transition-all duration-500 transform origin-center absolute inset-0 flex items-center justify-center text-6xl p-32 text-center ${
                        question.isRevealed ? 'scale-100' : 'scale-0'
                      }`}>
                      {!question.isDailyDouble && (
                        <>
                          {question.isRevealed && question.question}
                          {isController && (
                            <div className='text-green-500 text-5xl'>{question.answer}</div>
                          )}
                        </>
                      )}
                    </div>
                  </React.Fragment>
                ))}
                ;
              </div>
            </div>
          </React.Fragment>
        ))}
        ;
      </div>
    </>
  )
}
