import Quest from "../Quest";


const tracerFunc = (): void => {

}


const Quest_Lvl_5_2: Quest = new Quest(
    {min: 500, max: 1500},
    {min: 2000, max: 5000},
    1,
    'Quest 5lvl 2',
    'Desc quest 5 1',
    'Click 1000 times',
    tracerFunc,
    1000,
    0
)


export default Quest_Lvl_5_2