import React from 'react'
import Game from '../functions/Game'
import Player from '../functions/Player'
import { WrapOptions } from '../interfaces/CommonInterfaces'

const GameContext = React.createContext<Game>(new Game())
const PlayerContext = React.createContext<Player>(new Player())


const ContainerWrap = ({children, updater}: WrapOptions) => {
    const [game] = React.useState<Game>( new Game(updater) )
    const [player] = React.useState<Player>( new Player(updater) )

    React.useEffect(() => {
        // player.initializeDPS()
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