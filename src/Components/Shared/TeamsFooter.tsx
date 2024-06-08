import { TeamModel } from '../../Model/TeamModel'
import { TeamBox } from './TeamBox'
import useLocalStorage from '../../Hooks/localStorageHook'

interface TeamsFooterProps {
  isController?: boolean
}

export const TeamsFooter: React.FC<TeamsFooterProps> = ({ isController }) => {
  const editable = isController ?? false
  const [teams, setTeams] = useLocalStorage<TeamModel[] | undefined>('Teams', undefined)

  const updateTeam = (team: TeamModel): void => {
    setTeams(prevTeams => {
      const updatedTeams = prevTeams?.map(t => {
        if (t.TeamId === team.TeamId) {
          return { ...t, Score: team.Score }
        }
        return t
      })
      return updatedTeams
    })
  }

  if (!teams) return <></>

  return (
    <footer style={{ width: '-webkit-fill-available' }} className='fixed bottom-0 p-4'>
      <div className='flex gap-32 justify-center text-white font-semibold'>
        {teams.map(t => (
          <div key={t.TeamId} className='flex gap-2'>
            {editable && (
              <button
                onClick={() => updateTeam({ ...t, Score: t.Score - 1 })}
                className={`rounded-full w-14 h-14 ${t.Color} font-bold`}>
                -
              </button>
            )}
            <TeamBox setTeams={setTeams} allowEdit={editable} team={t}></TeamBox>
            {editable && (
              <button
                onClick={() => updateTeam({ ...t, Score: t.Score + 1 })}
                className={`rounded-full w-14 h-14 ${t.Color} font-bold`}>
                +
              </button>
            )}
          </div>
        ))}
      </div>
    </footer>
  )
}
