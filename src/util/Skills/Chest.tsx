import Skill from "../Skill"
import chestReady from '../../images/skills/chest-closed.png'
import chestCooldown from '../../images/skills/chest-open.png'
import Player from "../Player"
import Game from "../Game"


const clickAction = (plr: Player, skill: Skill): void => {
    const dps: number = plr.getInformation<number>('dps'),
          cp: number = plr.getInformation<number>('clickPower'),
          random: number = Math.floor(Math.random() * (dps / 4)) * (cp / 1.5),
          randomEnd = Game.fixedValue(Math.random() + .05)


    const goldGained: number = plr.getInformation<number>('level') * random * randomEnd

    plr.updateField('gold', goldGained)
    skill.createResultBox(`Gained [[${Game.numberFormat(goldGained)}]] gold`, 3000)
}


const Chest: Skill = new Skill(
    'skill-chest',
    chestReady,
    chestCooldown,
    240,
    5,
    clickAction,
    { 
        name: 'Random chest', 
        desc: 'You recently found a chest on your path. You realized this is a botomless pit that spits out a gold from time-to-time', 
        what: 'Gives random gold, depending on the [[DPS]] and [[Click Power]]' 
    }
)


export default Chest