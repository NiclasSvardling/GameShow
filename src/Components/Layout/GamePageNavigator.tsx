import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TeamsFooter } from '../Shared/TeamsFooter'
import useLocalStorage from '../../Hooks/localStorageHook'

export const GamePageNavigator: React.FC = () => {
  const navigate = useNavigate()
  const [gameType] = useLocalStorage<string>('GameType', '')

  const [currentPlaying, setCurrentPlaying] = useState<HTMLAudioElement | undefined>(undefined)
  useEffect(() => {
    if (gameType !== undefined) {
      switch (gameType.toString()) {
        case '-1':
          navigate('/')
          break
        case '0':
          navigate('/NameGame')
          break
        case '1':
          navigate('/Trivia')
          break
        case '2':
          navigate('/TranslateQuiz')
          break
        case '3':
          navigate('/SurveyGuess')
          break
        case '4':
          navigate('/JeopardyGame')
          break
      }
    }
  }, [gameType, navigate])

  const [audioPlay] = useLocalStorage<{ audio: string; play: boolean; seed?: number } | undefined>(
    'audioPlay',
    undefined,
  )
  const [tts, setTts] = useLocalStorage<string | undefined>('TextToSpeech', undefined)

  useEffect(() => {
    if (tts) {
      const u = new SpeechSynthesisUtterance(tts)
      const synth = window.speechSynthesis
      window.speechSynthesis.cancel()
      synth.speak(u)
      setTts(undefined)
    }
  }, [tts])

  useEffect(() => {
    if (audioPlay !== undefined) {
      let audio = new Audio(audioPlay.audio)
      if (audioPlay.play) {
        if (currentPlaying) {
          currentPlaying?.pause()
        }
        audio.play()
        setCurrentPlaying(audio)
      } else {
        if (currentPlaying) {
          currentPlaying?.pause()
        }
      }
    }
  }, [audioPlay])

  return (
    <>
      <Outlet />
      <TeamsFooter></TeamsFooter>
    </>
  )
}
