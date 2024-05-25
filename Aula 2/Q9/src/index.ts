type Job = "Mage" | "Warrior" | "Archer";
type Equip = "Staff" | "Sword" | "Bow";

type Character = [Job, Equip, number];

enum Actions {
    Attack = "Attack",
    Defend = "Defend",
    UseItem = "UseItem",
    Escape = "Escape"
}

function doSomething(character: Character, action: Actions){
    const [job, equip, life] = character;

    switch (action){
        case Actions.Attack:
            console.log(`${job} with ${equip} is attacking! Current HP: ${life}}`);
            break;
        case Actions.Defend:
            console.log(`${job} with ${equip} is defending! Current HP: ${life} `);
            break;
        case Actions.UseItem:
            console.log(`${job} with ${equip} is using a item to recovery life! Current HP: ${life}`);
            break;
        case Actions.Escape:
            console.log(`${job} with ${equip} is running away! Current HP: ${life}`);
        default:
            console.log("Invalid action!");
    }
}

const mage: Character = ["Mage", "Staff", 75]
const mageAction: Actions = Actions.Attack

const warrior: Character = ["Warrior", "Sword", 150]
const warriorAction: Actions = Actions.Defend

const archer: Character = ["Archer", "Bow", 95]
const archerAction: Actions = Actions.UseItem

doSomething(mage, mageAction);
doSomething(warrior, warriorAction);
doSomething(archer,archerAction);