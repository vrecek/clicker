import React from 'react'
import BottomBar from './components/BottomBar/BottomBar'
import ContainerWrap from './components/ContainerWrap'
import LeftSection from './components/LeftSection/LeftSection'
import RightSection from './components/RightSection/RightSection'
import './css/index.css'

function App() {
    const [, update] = React.useState<boolean>(false)


    return (
        <ContainerWrap updater={update}>

            <div className="two-sections-wrap">

                <LeftSection />
                <RightSection />

            </div>

            <BottomBar />

        </ContainerWrap>
    )
}

export default App
