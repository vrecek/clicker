import React from 'react'
import '../../../../css/Informations.css'
import { BottomInformation } from '../../../../interfaces/BottomInterfaces'
import Game from '../../../../util/Game'
import Player from '../../../../util/Player'
import { GameContext, PlayerContext } from '../../../ContainerWrap'
import InfoDiv from './InfoDiv'

const Informations = () => {
    const plr: Player = React.useContext(PlayerContext),
          game: Game = React.useContext(GameContext)


    const listInformations: BottomInformation[] = [
        {
            header: 'statistics',
            list: [
                { value: plr.getInformation<string>('clickPower', true), what: 'Click power' },
                { value: plr.getInformation<string>('dps', true), what: 'Damage Per Second' },
                { value: plr.getInformation<number>('dpsMultiplier'), what: 'DPS Multiplier' },
                { value: `${plr.getInformation<number>('critChance')}%`, what: 'Critical chance' },
                { value: `${plr.getInformation<number>('critPower') * 100}%`, what: 'Critical power' },
                { value: `${plr.getInformation<number>('skillCooldown')}%`, what: 'Skill cooldown' },
            ]
        },

        {
            header: 'progress',
            list: [
                { value: plr.getInformation('level'), what: 'Level' },
                { value: plr.getInformation('exp'), what: 'Experience' },
                { value: plr.getInformation('expRequired'), what: 'Exp. Required' },
                { value: plr.getInformation('expMultiplier'), what: 'Exp. Multiplier' }
            ]
        },

        {
            header: 'miscellaneous',
            list: [
                { value: game.calculatePlayTime(), what: 'Play time' },
                { value: plr.getInformation<string>('totalGold', true), what: 'Total gold' },
            ]
        }
    ]


    return (
        <section className="display informations">

            {
                listInformations.map((x, i) => (
                    <InfoDiv
                        key={i}
                        header={x.header}
                        list={x.list}
                    />
                ))
            }

        </section>
    )
}

export default Informations