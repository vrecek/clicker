import React from 'react'
import '../../css/BottomBar.css'
import { DisplayOption } from '../../interfaces/BottomInterfaces'
import Skills from './Display/Skills/Skills'
import Quests from './Display/Quests/Quests'
import DisplayToggle from './DisplayToggle'
import MenuToggle from './MenuToggle'
import Informations from './Display/Informations/Informations'

const BottomBar = ({tick}: {tick: boolean}) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [currentDisplay, setPrev] = React.useState<DisplayOption>(DisplayOption.SKILLS)
    const [display, setDisplay] = React.useState<JSX.Element>(<Skills />)


    const changeDisplay = (elem: HTMLElement, section: DisplayOption): void => {
        const children: Element[] = [...elem.parentElement!.children]


        for (const option of children) 
            option.className = ''

            
        elem.className = 'active'

        setPrev(section)

        switch (section) {
            case DisplayOption.SKILLS:
                setDisplay(<Skills />)
            return


            case DisplayOption.QUESTS:
                setDisplay(<Quests />)
            return


            case DisplayOption.INFORMATIONS:
                setDisplay(<Informations />)
            return

            default: return
        }
    }


    React.useEffect(() => {
        const current: HTMLElement = [...containerRef.current!.children][currentDisplay] as HTMLElement
        
        changeDisplay(current, currentDisplay)
    }, [tick])


    return (
        <section className="bottom-bar">

            <MenuToggle />

            { display }

            <DisplayToggle 
                changeFunc={changeDisplay}
                containerRef={containerRef}
            />

        </section>
    )
}

export default BottomBar