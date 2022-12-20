import BottomBar from './components/BottomBar/BottomBar'
import ContainerWrap from './components/ContainerWrap'
import LeftSection from './components/LeftSection/LeftSection'
import RightSection from './components/RightSection/RightSection'
import './css/index.css'

function App() {
    return (
        <ContainerWrap>

            <div className="two-sections-wrap">

                <LeftSection />
                <RightSection />

            </div>

            <BottomBar />

        </ContainerWrap>
    )
}

export default App
