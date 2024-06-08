import React from 'react'
import useLocalStorage from '../../Hooks/localStorageHook'
import { SurveryGuessModel } from '../../Model/SurveryGuessModel'
import { SurveryTextBox } from './SurveryTextBox'

interface SurveyFieldBoxProp {
  controller: boolean
}

export const SurveyFieldBox: React.FC<SurveyFieldBoxProp> = ({ controller }) => {
  const [surveyGuess, setSurveyGuess] = useLocalStorage<SurveryGuessModel | undefined>(
    'SurveyGuess',
    undefined,
  )

  return (
    <>
      <div className='flex justify-center'>
        <div className='flex-col text-white w-[fit] text-center'>
          <div className='text-4xl mb-4'>{surveyGuess?.surveyTitle}</div>
          <div className='text-white bg-[#ffa400] px-4 py-8 border-4 rounded-xl flex flex-row gap-4'>
            <div className='flex flex-col gap-4'>
              {surveyGuess?.surveyEntries?.slice(0, 4)?.map((survey, index) => (
                <React.Fragment key={index}>
                  <SurveryTextBox
                    index={index + 1}
                    surveyBox={survey}
                    controller={controller}
                    setSurvey={setSurveyGuess}></SurveryTextBox>
                </React.Fragment>
              ))}
            </div>
            <div className='flex flex-col gap-4'>
              {surveyGuess?.surveyEntries?.slice(4)?.map((survey, index) => (
                <React.Fragment key={index}>
                  <SurveryTextBox
                    index={index + 5}
                    surveyBox={survey}
                    controller={controller}
                    setSurvey={setSurveyGuess}></SurveryTextBox>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
