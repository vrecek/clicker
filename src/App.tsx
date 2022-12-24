import React from 'react'
import BottomBar from './components/BottomBar/BottomBar'
import ContainerWrap from './components/ContainerWrap'
import LeftSection from './components/LeftSection/LeftSection'
import RightSection from './components/RightSection/RightSection'
import './css/index.css'

function App() {
    const [tick, update] = React.useState<boolean>(false)
    // chest | timemaster | refresh values; add multiplier dps etc | change whatDesc in Upgrade to T (like buffer)

    return (
        <ContainerWrap updater={update}>

            <div className="two-sections-wrap">

                <LeftSection />
                <RightSection />

            </div>

            <BottomBar tick={tick} />

        </ContainerWrap>
    )
}

export default App
