import React from 'react'
import Game from '../util/Game'
import Player from '../util/Player'
import { WrapOptions } from '../interfaces/CommonInterfaces'
import Upgrades from '../util/Upgrades/UpgradesArray'
import Skills from '../util/Skills/SkillsArray'
import Quests from '../util/Quests/QuestsArray'

const GameContext = React.createContext<Game>(new Game([], [], []))
const PlayerContext = React.createContext<Player>(new Player())


const ContainerWrap = ({children, updater}: WrapOptions) => {
    const [player] = React.useState<Player>( new Player(updater) )
    const [game] = React.useState<Game>( new Game(Upgrades, Skills, Quests, player, updater) )

    game.listenQuestEvent()

    React.useEffect(() => {
        game.entryLoading()

        game.mainInterval(() => {

            player.initializeDPS()
            game.determineNewQuests()
            game.initializeTimer()

        })
    }, [])
        

    return (
        <div className="App">

            <GameContext.Provider value={game}>
            <PlayerContext.Provider value={player}>


                <main className="main-container-wrap">

                    {children}

                </main>


            </PlayerContext.Provider>
            </GameContext.Provider>

        </div>
    )
}

export default ContainerWrap
export {
    GameContext,
    PlayerContext
}