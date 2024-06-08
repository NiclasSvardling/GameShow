import { GameNameItem, GameNameModel } from '../generatedApi'

export class NameGameModel {
  name: string
  NameGame: NameGameItemReveal[]

  constructor(m: GameNameModel) {
    this.name = m.name ?? ''
    this.NameGame = m.nameGame ? m.nameGame.map(ng => new NameGameItemReveal(ng)) : []
  }
}

export class NameGameItemReveal {
  id: number
  title: string
  revealed?: boolean

  constructor(m: GameNameItem) {
    this.id = m.id ?? -1
    this.title = m.title ?? ''
    this.revealed = false
  }
}
