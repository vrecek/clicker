import Game from "../Game";
import Player from "../Player";
import Quest from "../Quest";


const tracerFunc = (player: Player, game: Game, quest: Quest<number>): void => {
    if (!quest.getBuffer)
        quest.setBuffer = game.getTotals('totalClicks')


    const progressClicks = quest.getBuffer!,
          actualClicks = game.getTotals('totalClicks')


    // Click detected
    if (progressClicks !== actualClicks) {
        quest.setBuffer = actualClicks
        quest.setTrackerProgressValue(1)

        if (quest.getTrackerProgressValue >= quest.getTrackerMaxValue) 
            quest.finishQuest(player, game)
    }
}


const Quest_Lvl_5_1: Quest = new Quest<number>(
    {min: 500, max: 1500},
    {min: 2000, max: 5000},
    5,
    'Fighting master',
    'Fight your way through enemies',
    'Click 1000 times',
    tracerFunc,
    1000
)


export default Quest_Lvl_5_1