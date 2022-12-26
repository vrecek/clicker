import React from 'react'
import FigureImage from '../Common/Image'
import sword from '../../images/sword.png'
import Game from '../../util/Game'
import { GameContext, PlayerContext } from '../ContainerWrap'
import Player from '../../util/Player'

const Click = () => {
    const GAME: Game = React.useContext(GameContext),
          PLAYER: Player = React.useContext(PlayerContext)


    const clickHandle = (e: React.MouseEvent): void => {
        const t: HTMLElement = e.currentTarget as HTMLElement,
              isCritical: boolean = PLAYER.isCritical(),
              damage: number = isCritical 
                ? PLAYER.calculateCriticalDamage() 
                : PLAYER.getInformation<number>('clickPower')


        GAME.animateImage(t.children[0] as HTMLElement, 100)
        GAME.animateText(
            t, 
            damage,
            isCritical,
            1500
        )

        PLAYER.updateField('gold', damage)
        PLAYER.updateField('exp', PLAYER.getInformation('clickPower'))
        GAME.updateTotals('totalClicks', 1)

        GAME.updateState()
    }


    return (
        <section onClick={clickHandle} className="clickable">

            <div className="image">
                
                <FigureImage source={sword} />

            </div>

        </section>
    )
}

export default Click