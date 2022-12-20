import React from 'react'
import '../../css/BottomBar.css'
import { DisplayOption } from '../../interfaces/BottomInterfaces'
import Skills from './Display/Skills/Skills'
import Quests from './Display/Quests/Quests'
import DisplayToggle from './DisplayToggle'
import MenuToggle from './MenuToggle'
import Informations from './Display/Informations/Informations'

const BottomBar = () => {
    const [display, setDisplay] = React.useState<JSX.Element>(<Skills />)

    const changeDisplay = (e: React.MouseEvent, section: DisplayOption): void => {
        const t: HTMLElement = e.currentTarget as HTMLElement,
              children: Element[] = [...t.parentElement!.children]


        for (const option of children) 
            option.className = ''

            
        t.className = 'active'

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


    return (
        <section className="bottom-bar">

            <MenuToggle />

            { display }

            <DisplayToggle 
                changeFunc={changeDisplay}
            />

        </section>
    )
}

export default BottomBar