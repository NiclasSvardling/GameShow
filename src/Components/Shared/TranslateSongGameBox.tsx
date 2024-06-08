import { useEffect, useState } from 'react'
import useLocalStorage from '../../Hooks/localStorageHook'
import { TranslateSongModel } from '../../Model/TranslateSongModel'
import { NiButton } from './NiButton'

interface TranslateSongGameBoxProps {
  controller: boolean
}

export const TranslateSongGameBox: React.FC<TranslateSongGameBoxProps> = ({ controller }) => {
  const [state, setState] = useLocalStorage<TranslateSongModel[] | undefined>(
    'TranslateSong',
    undefined,
  )

  const [internalState, setInternalState] = useState<TranslateSongModel | undefined>(
    state?.find(t => t.isCurrent),
  )
  const [tts, setTts] = useLocalStorage<string | undefined>('TextToSpeech', undefined)

  useEffect(() => {
    setInternalState(state?.find(t => t.isCurrent))
  }, [state])

  useEffect(() => {
    setState(prev => {
      return prev?.map(p => {
        if (p.isCurrent && internalState) {
          return internalState
        }
        return p
      })
    })
  }, [internalState])

  useEffect(() => {}, [internalState?.lyrics])

  const switchCurrent = (nextOrPrev: boolean) => {
    const nextId = nextOrPrev ? (internalState?.id ?? 0) + 1 : (internalState?.id ?? 0) - 1

    setState(prev => {
      return prev?.map(p => {
        return { ...p, isCurrent: p.id === nextId }
      })
    })
  }

  const style = controller ? 'text-xl mb-4' : 'text-5xl pb-12'

  const updateLyricPlay = (lyr: { lyric: string; play: boolean; id: number }): void => {
    if (!lyr.play) {
      setTts(lyr.lyric)
      // const u = new SpeechSynthesisUtterance(lyr.lyric)
      // const synth = window.speechSynthesis
      // window.speechSynthesis.cancel()
      // synth.speak(u)
    }

    setState(prev => {
      return prev?.map(p => {
        if (p.isCurrent) {
          return {
            ...p,
            lyrics: p?.lyrics?.map(l => {
              if (lyr.id === l.id) {
                return {
                  ...l,
                  play: !l.play,
                }
              }
              return l
            }),
          }
        }
        return p
      })
    })
  }

  const getEmbededLink = (link: string): string | undefined => {
    const blaa = link.split('/')[3]

    const embedded = 'https://www.youtube.com/embed/' + blaa.replace('t=', 'start=')
    return embedded
  }

  if (internalState)
    return (
      <div className='flex'>
        <div>
          <div className='bg-[#ff5bf8] p-4 text-center rounded-xl w-fit text-white outline-4 outline-red-600 outline'>
            <div>
              {internalState?.lyrics?.map(lyr => (
                <div key={lyr.id} className='flex gap-4 mb-2 items-center'>
                  {controller && (
                    <NiButton
                      onClick={() => updateLyricPlay(lyr)}
                      Text={!lyr.play ? 'Play' : 'Hide'}></NiButton>
                  )}
                  <div
                    id={'Lyric-' + lyr.id}
                    className={`font-semibold ${
                      !lyr.play && !controller ? 'invisible' : ''
                    }  ${style}`}>
                    {lyr.lyric}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {controller && (
            <div>
              <div className='mt-4'>
                <div className='flex justify-between'>
                  <NiButton
                    disable={internalState.id == 0}
                    Text='<'
                    onClick={() => switchCurrent(false)}></NiButton>

                  <NiButton
                    Text='Reveal title'
                    onClick={() =>
                      setInternalState({
                        ...internalState,
                        revealTitle: !internalState.revealTitle,
                      })
                    }></NiButton>

                  <NiButton
                    disable={internalState.id === (state?.length ?? 0) - 1}
                    Text='>'
                    onClick={() => switchCurrent(true)}></NiButton>
                </div>
              </div>
            </div>
          )}
        </div>
        {internalState?.revealTitle && !controller && (
          <div className='pl-16'>
            <iframe
              width='853'
              height='480'
              src={getEmbededLink(internalState.youTubeLink ?? '')}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              title='Embedded youtube'
            />
          </div>
        )}
      </div>
    )
}
