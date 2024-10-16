import { SetStateAction } from 'react'
import { SurveryEntryClientModel, SurveryGuessModel } from '../../Model/SurveryGuessModel'
interface SurveryTextBoxProps {
  surveyBox: SurveryEntryClientModel
  index: number
  controller: boolean
  setSurvey: React.Dispatch<SetStateAction<SurveryGuessModel | undefined>>
}

export const SurveryTextBox: React.FC<SurveryTextBoxProps> = ({
  surveyBox,
  index,
  controller,
  setSurvey,
}) => {
  return (
    <div
      style={{ perspective: '1000px' }}
      key={index}
      className='w-[700px] text-center rounded cursor-pointer'
      onClick={() => {
        if (controller) {
          if (!surveyBox.isRevealed) {
            let audio = new Audio('/GameShow/correct.mp3')
            audio.play()
          }
          setSurvey(p => {
            return {
              ...p,
              surveyEntries: p?.surveyEntries?.map(m => {
                if (m.id === surveyBox.id) {
                  return { ...m, isRevealed: !m.isRevealed }
                }
                return m
              }),
            }
          })
        }
      }}>
      <div
        style={{
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          transform: surveyBox.isRevealed ? 'rotateX(180deg)' : 'rotateX(0)',
        }}>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
          }}
          className='bg-[#3c97f6] p-2 border-4 flex justify-center'>
          {!controller && (
            <div className='bg-[#0251c4] w-48 flex justify-center rounded-[50%] p-2'>
              <div className='text-7xl content-center'> {index}</div>
            </div>
          )}
          {controller && (
            <div className='flex justify-center p-2'>
              <div className='text-5xl content-center'> {surveyBox.entry}</div>
            </div>
          )}
        </div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
          }}
          className='bg-[#0251c4] p-2 border-4 flex justify-center'>
          <div className='flex h-28 justify-center rounded-[50%] p-2'>
            <div className='text-5xl content-center'> {surveyBox.entry}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
