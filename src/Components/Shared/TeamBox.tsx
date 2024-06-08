import { SetStateAction, useEffect, useState } from 'react'
import { TeamModel } from '../../Model/TeamModel'

interface TeamBoxProps {
  team: TeamModel
  allowEdit: boolean
  setTeams: React.Dispatch<SetStateAction<TeamModel[] | undefined>>
}

export const TeamBox: React.FC<TeamBoxProps> = ({ team, allowEdit, setTeams }) => {
  const [openContex, setOpenContext] = useState(false)
  const [teamClassName, setTeamClassName] = useState('')
  const [teamItem, setTeamItem] = useState(team)

  const deleteTeam = (team: TeamModel) => {
    const storage = localStorage.getItem('Teams')
    const allTeam: TeamModel[] = storage ? JSON.parse(storage) : undefined

    const deletedTeam = allTeam.filter(t => t.TeamId !== team.TeamId)
    setTeams(deletedTeam)
  }

  useEffect(() => {
    if (team.Score != teamItem.Score) {
      const outlineColor = team.Score > teamItem.Score ? 'outline-green-500' : 'outline-red-600'

      setTeamClassName(outlineColor)
      setTeamItem(team)
      const timeoutId = setTimeout(() => {
        setTeamClassName('')
      }, 500)

      return () => clearTimeout(timeoutId)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [team])

  return (
    <>
      <div
        className={`${teamItem.Color} ${teamClassName} py-4 px-8 rounded-full flex gap-2 outline outline-4`}
        onContextMenu={e => {
          e.preventDefault()
          setOpenContext(!openContex)
        }}>
        <div>{teamItem.TeamName}</div>

        <div className='w-20 text-end content-center'>{teamItem.Score} Points</div>
        {openContex && allowEdit && (
          <div className='fixed bg-black p-2 w-40 bottom-[80px]'>
            <ul>
              <li onClick={() => deleteTeam(teamItem)} className='cursor-pointer'>
                Radera
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
