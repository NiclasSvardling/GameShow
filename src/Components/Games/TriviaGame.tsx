import { TriviaQuestionBox } from '../Shared/TriviaQuestionbox'
import { TriviaQuestionModel } from '../../Model/TriviaModel'
import useLocalStorage from '../../Hooks/localStorageHook'

export const TriviaGame: React.FC = () => {
  const [currentQuestion] = useLocalStorage<TriviaQuestionModel[] | undefined>(
    'TriviaGame',
    undefined,
  )

  if (!currentQuestion) {
    return 'Waiting to start'
  } else {
    return (
      <>
        <div className='flex justify-center flex-col gap-2'>
          <div className='text-white text-center mb-[25vh] text-6xl font-bold'>Trivia</div>
          <div className='flex justify-center'>
            <TriviaQuestionBox isController={false}></TriviaQuestionBox>
          </div>
        </div>
      </>
    )
  }
}
