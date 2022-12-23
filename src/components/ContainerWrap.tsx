import React from 'react'
import Game from '../util/Game'
import Player from '../util/Player'
import { WrapOptions } from '../interfaces/CommonInterfaces'
import Upgrades from '../util/Upgrades/UpgradesArray'

const GameContext = React.createContext<Game>(new Game([]))
const PlayerContext = React.createContext<Player>(new Player())


const ContainerWrap = ({children, updater}: WrapOptions) => {
    const [game] = React.useState<Game>( new Game(Upgrades, updater) )
    const [player] = React.useState<Player>( new Player(updater) )

    React.useEffect(() => {
        game.entryLoading()

        player.initializeDPS()
        // game.initializeTimer()
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