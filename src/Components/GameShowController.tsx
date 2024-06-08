import { useEffect, useState } from 'react'
import {
  GameNameModel,
  useLazyGetGetNameGameQuery,
  useLazyGetGetTriviaQuery,
  useLazyGetJeopardyGameQuery,
  useLazyGetSurveyGuessQuery,
  useLazyGetTranslateQuizQuery,
} from '../generatedApi'
import { NameGameBox } from './Shared/NameGameBox'
import { NameGameItemReveal, NameGameModel } from '../Model/NameGameModel'
import { NiButton } from './Shared/NiButton'
import { TriviaQuestionBox } from './Shared/TriviaQuestionbox'
import { TriviaGameModel, TriviaQuestionModel } from '../Model/TriviaModel'
import { TeamModel } from '../Model/TeamModel'
import { TeamsFooter } from './Shared/TeamsFooter'
import { TranslateSongGameBox } from './Shared/TranslateSongGameBox'
import { TranslateSongModel } from '../Model/TranslateSongModel'
import useLocalStorage from '../Hooks/localStorageHook'
import { SurveryGuessModel } from '../Model/SurveryGuessModel'
import { SurveyFieldBox } from './Shared/SurveyFieldBox'
import { JeopardyGameModel } from '../Model/JeopardyGameModel'
import { JeopardyGame } from './Games/JeopardyGame'
import { Dropdown, optionProps } from './Shared/Dropdown'
import {
  fetchJeopardy,
  fetchNameGame,
  fetchSurveyGame,
  fetchTranslateGame,
  fetchTriviaGame,
} from '../FakeApi'

export const GameShowController: React.FC = () => {
  const possibleColors = ['bg-[#1cb8ef]', 'bg-[#f1c968]', 'bg-[#82cb80]', 'bg-[#e45861]']

  const [fetchGame, { data, isFetching }] = useLazyGetGetNameGameQuery()
  const [fetchGameTrivia, dataTrivia] = useLazyGetGetTriviaQuery()
  const [fetchTranslateSong, dataTranslateSong] = useLazyGetTranslateQuizQuery()
  const [fetchSurveyGuess, dataSurveyGuess] = useLazyGetSurveyGuessQuery()
  const [fetchJeopardyData, dataJeopardy] = useLazyGetJeopardyGameQuery()

  const [timeForCountDown, setTimeForCountDown] = useState(0)
  const [timer, setTimer] = useLocalStorage<number | undefined>('CountDown', undefined)
  const [nameGameField, setNameGameField] = useLocalStorage<NameGameModel | undefined>(
    'NameGame',
    undefined,
  )

  const [jeopardyGame, setJeopardyGame] = useLocalStorage<JeopardyGameModel[] | undefined>(
    'JeopardyGame',
    undefined,
  )

  const [currentQuestion, setCurrentQuestion] = useLocalStorage<TriviaGameModel | undefined>(
    'TriviaGame',
    undefined,
  )
  const [translateSong, setTranslateSong] = useLocalStorage<TranslateSongModel[] | undefined>(
    'TranslateSong',
    undefined,
  )
  const [surveyGuess, setSurveyGuess] = useLocalStorage<SurveryGuessModel | undefined>(
    'SurveyGuess',
    undefined,
  )

  const [addedTeam, setAddedTeam] = useState<string | undefined>()
  const [teams, setTeams] = useLocalStorage<TeamModel[] | undefined>('Teams', undefined)
  const [audioPlay, setAudioPlay] = useLocalStorage<
    { audio: string; play: boolean; seed?: number } | undefined
  >('audioPlay', { audio: '/GameShow/intro.mp3', play: false, seed: Math.random() })

  const startNameGame = async () => {
    //fetchGame()
    const data = await fetchNameGame()
    const temp: NameGameModel = new NameGameModel(data)
    setNameGameField(temp)
    setCurrentQuestion(undefined)
    setTranslateSong(undefined)
    setSurveyGuess(undefined)
    setJeopardyGame(undefined)
    localStorage.setItem('GameType', '0')

    setAudioPlay({ audio: '/GameShow/nextRound.mp3', play: true, seed: Math.random() })
  }

  const toStartpage = () => {
    setNameGameField(undefined)
    setCurrentQuestion(undefined)
    setTranslateSong(undefined)
    setSurveyGuess(undefined)
    setJeopardyGame(undefined)
    localStorage.setItem('GameType', '-1')
  }

  const startTriviaGame = async () => {
    // fetchGameTrivia()
    const trivia = await fetchTriviaGame()

    const temp = trivia.map((m, i) => {
      return {
        question: m.question,
        id: m.id,
        options: m.options,
        showOptions: false,
        isCurrent: i === 0,
      } as TriviaQuestionModel
    })
    setCurrentQuestion({ isTransition: false, triviaQuestions: temp })
    setNameGameField(undefined)
    setTranslateSong(undefined)
    setSurveyGuess(undefined)
    setJeopardyGame(undefined)

    localStorage.setItem('GameType', '1')
  }

  const startTranslateGame = async () => {
    //fetchTranslateSong()
    const translate = await fetchTranslateGame()
    const temp = translate.map(m => new TranslateSongModel(m))

    setTranslateSong(temp)
    setNameGameField(undefined)
    setCurrentQuestion(undefined)
    setSurveyGuess(undefined)
    setJeopardyGame(undefined)
    localStorage.setItem('GameType', '2')
  }
  const startSurveyGuessGame = async () => {
    //fetchSurveyGuess()
    const survey = await fetchSurveyGame()
    console.log(survey)
    const temp = new SurveryGuessModel(survey)
    setTranslateSong(undefined)
    setNameGameField(undefined)
    setCurrentQuestion(undefined)
    setJeopardyGame(undefined)

    setSurveyGuess(temp)

    localStorage.setItem('GameType', '3')
  }
  const startJeopardyGame = async () => {
    //fetchJeopardyData()
    const jeopardy = await fetchJeopardy()
    const temp = jeopardy.map(j => new JeopardyGameModel(j))
    setJeopardyGame(temp)
    setTranslateSong(undefined)
    setNameGameField(undefined)
    setCurrentQuestion(undefined)
    setSurveyGuess(undefined)
    localStorage.setItem('GameType', '4')
  }

  useEffect(() => {
    if (data) {
      const temp: NameGameModel = new NameGameModel(data as GameNameModel)
      setNameGameField(temp)
      setCurrentQuestion(undefined)
      setTranslateSong(undefined)
      setSurveyGuess(undefined)
      setJeopardyGame(undefined)
    }
  }, [data, isFetching])

  // useEffect(() => {
  //   if (dataTrivia.data) {
  //     const temp = { ...dataTrivia.data?.at(0), showOptions: false }
  //     setCurrentQuestion(temp)
  //     setNameGameField(undefined)
  //     setTranslateSong(undefined)
  //     setSurveyGuess(undefined)
  //     setJeopardyGame(undefined)
  //   }
  // }, [dataTrivia, dataTrivia.data, dataTrivia.isFetching])

  useEffect(() => {
    if (dataTranslateSong.data) {
      const temp = dataTranslateSong.data.map(m => new TranslateSongModel(m))

      setTranslateSong(temp)
      setNameGameField(undefined)
      setCurrentQuestion(undefined)
      setSurveyGuess(undefined)
      setJeopardyGame(undefined)
    }
  }, [dataTranslateSong.data, dataTranslateSong.isFetching])

  useEffect(() => {
    if (dataSurveyGuess.data) {
      const temp = new SurveryGuessModel(dataSurveyGuess.data)
      setTranslateSong(undefined)
      setNameGameField(undefined)
      setCurrentQuestion(undefined)
      setJeopardyGame(undefined)

      setSurveyGuess(temp)
    }
  }, [dataSurveyGuess.data, dataSurveyGuess.isFetching])

  useEffect(() => {
    if (dataJeopardy.data) {
      const temp = dataJeopardy.data.map(j => new JeopardyGameModel(j))
      setJeopardyGame(temp)
      setTranslateSong(undefined)
      setNameGameField(undefined)
      setCurrentQuestion(undefined)
      setSurveyGuess(undefined)
    }
  }, [dataJeopardy.data, dataJeopardy.isFetching])

  const revealItem = (nameGame: NameGameItemReveal) => {
    if (nameGameField?.NameGame) {
      setNameGameField(_ => {
        return {
          ...nameGameField,
          NameGame: nameGameField.NameGame.map(n => {
            if (n.id === nameGame.id) {
              return {
                ...n,
                revealed: !n.revealed,
              }
            }
            return n
          }),
        }
      })
    }
  }
  const addTeam = (team: string | undefined) => {
    if (!team) {
      return
    }

    if (teams) {
      const freeColor = possibleColors.filter(p => !teams.some(r => r.Color === p)).at(0)
      const newTeam: TeamModel = {
        TeamName: team,
        Score: 0,
        Color: freeColor ?? '',
        TeamId: Math.max(...teams.map(r => r.TeamId)) + 1,
      }

      setTeams([...teams, newTeam])
    } else {
      const newTeam: TeamModel = {
        TeamName: team,
        Score: 0,
        Color: possibleColors.at(0) ?? '',
        TeamId: 0,
      }
      setTeams([newTeam])
    }

    setAddedTeam('')
  }

  const getAudioDropDown = (): optionProps[] => {
    const list: optionProps[] = [
      { id: '1', value: 'intro' },
      { id: '2', value: 'tense' },
    ]
    return list
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-row gap-16'>
          <div>
            <h3 className='text-white'> Add Team</h3>
            <div className='flex gap-2'>
              <input
                value={addedTeam}
                onChange={change => setAddedTeam(change.target.value)}
                type='text'></input>
              <NiButton Text='Add' onClick={() => addTeam(addedTeam)}></NiButton>
            </div>
          </div>
          <div>
            <h3 className='text-white'> Set timer</h3>
            <div className='flex gap-2'>
              <input
                value={timeForCountDown}
                onChange={change => setTimeForCountDown(Number(change.target.value))}
                type='number'></input>
              <NiButton Text='Add' onClick={() => setTimer(timeForCountDown)}></NiButton>
              <NiButton Text='Cancel' onClick={() => setTimer(undefined)}></NiButton>
            </div>
          </div>
        </div>

        <div className='mb-8 flex gap-4'>
          <NiButton Text='To start page' onClick={() => toStartpage()}></NiButton>
          <NiButton Text='Start Name Game' onClick={() => startNameGame()}></NiButton>
          <NiButton Text='Start Trivia Game' onClick={() => startTriviaGame()}></NiButton>
          <NiButton Text='Start Translate Game' onClick={() => startTranslateGame()}></NiButton>
          <NiButton Text='Start Survey Game' onClick={() => startSurveyGuessGame()}></NiButton>
          <NiButton Text='Start Jeopardy Game' onClick={() => startJeopardyGame()}></NiButton>
          <Dropdown
            onChange={e => {
              setAudioPlay({ audio: '/GameShow/' + e.currentTarget.value + '.mp3', play: false })
            }}
            options={getAudioDropDown()}></Dropdown>
          <NiButton
            Text='Play'
            onClick={() => {
              console.log(audioPlay)
              if (audioPlay) {
                setAudioPlay({ ...audioPlay, play: true, seed: Math.random() })
              }
            }}></NiButton>
          <NiButton
            Text='Pause'
            onClick={() => {
              if (audioPlay) {
                setAudioPlay({ ...audioPlay, play: false, seed: Math.random() })
              }
            }}></NiButton>
        </div>

        {nameGameField && nameGameField.NameGame.length > 0 && (
          <div
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            }}
            className='grid gap-4'>
            {nameGameField.NameGame.map((item, index) => (
              <div onClick={() => revealItem(item)} className='cursor-pointer' key={index}>
                <NameGameBox item={item} hidden={false} controllerView={true}></NameGameBox>
              </div>
            ))}
          </div>
        )}
        {currentQuestion && (
          <div className='flex flex-col items-center gap-4'>
            <TriviaQuestionBox isController={true}></TriviaQuestionBox>
          </div>
        )}
        {translateSong && localStorage.getItem('TranslateSong') && (
          <div className='self-center'>
            <TranslateSongGameBox controller={true}></TranslateSongGameBox>
          </div>
        )}
        {surveyGuess && localStorage.getItem('SurveyGuess') && (
          <div>
            <SurveyFieldBox controller={true}></SurveyFieldBox>
          </div>
        )}
        {jeopardyGame && jeopardyGame?.length > 0 && (
          <div>
            <JeopardyGame isController={true}></JeopardyGame>
          </div>
        )}
      </div>
      <TeamsFooter isController={true}></TeamsFooter>
    </>
  )
}
