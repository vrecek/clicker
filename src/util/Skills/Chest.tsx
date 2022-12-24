import Skill from "../Skill"
import chestReady from '../../images/skills/chest-closed.png'
import chestCooldown from '../../images/skills/chest-open.png'
import Player from "../Player"


const clickAction = (plr: Player): void => {
    const goldGained: number = 2

    plr.updateField('gold', goldGained)
}


const Chest: Skill = new Skill(
    'skill-chest',
    chestReady,
    chestCooldown,
    200,
    2,
    clickAction
)


export default Chest