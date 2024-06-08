import { NameGameModel } from '../../Model/NameGameModel'
import { NameGameBox } from '../Shared/NameGameBox'
import useLocalStorage from '../../Hooks/localStorageHook'

export const NameGameShowViewer: React.FC = () => {
  const [data] = useLocalStorage<NameGameModel | undefined>('NameGame', undefined)

  if (!data) {
    return 'Waiting to start'
  } else {
    return (
      <>
        <div>
          <div className='text-white text-center mb-16 text-6xl font-bold'>{data.name}</div>
          <div className='flex content-center justify-center'>
            <div className='w-[80%] '>
              <div
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                }}
                className='grid gap-4'>
                {data.NameGame.map((item, index) => (
                  <div key={index}>
                    <NameGameBox
                      item={item}
                      hidden={!item.revealed}
                      controllerView={false}></NameGameBox>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
