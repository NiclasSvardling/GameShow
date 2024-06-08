import React, { useEffect } from 'react'
import { TriviaGameModel } from '../../Model/TriviaModel'
import useLocalStorage from '../../Hooks/localStorageHook'
import { NiButton } from './NiButton'

interface TriviaQuestionBoxProps {
  isController: boolean
}

export const TriviaQuestionBox: React.FC<TriviaQuestionBoxProps> = ({ isController }) => {
  const [questions, setQuestions] = useLocalStorage<TriviaGameModel | undefined>(
    'TriviaGame',
    undefined,
  )

  const switchCurrent = (nextOrPrev: boolean) => {
    const nextId = nextOrPrev
      ? (questions?.triviaQuestions?.find(q => q.isCurrent)?.id ?? 0) + 1
      : (questions?.triviaQuestions?.find(q => q.isCurrent)?.id ?? 0) - 1

    setQuestions(prev => {
      return {
        isTransition: true,
        triviaQuestions: !prev?.triviaQuestions
          ? []
          : prev?.triviaQuestions?.map(p => {
              return { ...p, isCurrent: nextId === p.id, showOptions: false }
            }),
      }
    })
  }

  useEffect(() => {
    if (questions?.isTransition) {
      const timer = setTimeout(() => {
        setQuestions({ ...questions, isTransition: false })
      }, 500) // match this duration with your CSS animation duration

      return () => clearTimeout(timer)
    }
  }, [questions?.isTransition])

  const slideOutRight = {
    animation: 'slideOutRight 0.5s forwards',
  }

  const slideInLeft = {
    animation: 'slideInLeft 0.5s forwards',
  }

  const keyframes = `
  @keyframes slideOutRight {
    from { transform: translateX(0); }
    to { transform: translateX(100%); }
  }
  @keyframes slideInLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
`

  if (!questions?.triviaQuestions?.find(q => q.isCurrent)) {
    return <>ERROR</>
  }

  return (
    <>
      <style>{keyframes}</style>
      {isController && (
        <div className='flex gap-4'>
          <NiButton
            Text='<'
            disable={questions.triviaQuestions?.find(q => q.isCurrent)?.id === 0}
            onClick={() => {
              if (
                questions.triviaQuestions?.find(q => q.isCurrent)?.id &&
                (questions.triviaQuestions?.find(q => q.isCurrent)?.id ?? 0) > 1
              ) {
                switchCurrent(false)
              }
            }}></NiButton>
          <NiButton
            Text='>'
            disable={
              questions.triviaQuestions?.find(q => q.isCurrent)?.id ===
              (questions.triviaQuestions?.length ?? 0) - 1
            }
            onClick={() => {
              switchCurrent(true)
            }}></NiButton>
        </div>
      )}
      <div
        id='box'
        style={questions.isTransition ? slideOutRight : slideInLeft}
        className='rounded-2xl bg-white w-fit p-8 text-6xl font-bold border-4 border-black'>
        <div className='content-center text-center'>
          {questions.triviaQuestions?.find(q => q.isCurrent)?.question}
        </div>
        {questions.triviaQuestions?.find(q => q.isCurrent)?.showOptions && (
          <div className='mt-8 flex flex-col gap-4'>
            {questions.triviaQuestions
              ?.find(q => q.isCurrent)
              ?.options?.map((opt, index) => (
                <div key={index} className=''>
                  <div className='text-5xl'>
                    {index + 1}. {opt.optionText}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      {isController && (
        <NiButton
          Text='Toggle options'
          onClick={() => {
            if (questions) {
              setQuestions(() => {
                return {
                  ...questions,
                  triviaQuestions: questions.triviaQuestions.map(m => {
                    if (m.isCurrent) {
                      return { ...m, showOptions: !m.showOptions }
                    } else {
                      return m
                    }
                  }),
                }
              })
            }
          }}></NiButton>
      )}
    </>
  )
}
