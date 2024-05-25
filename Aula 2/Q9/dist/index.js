"use strict";
var Actions;
(function (Actions) {
    Actions["Attack"] = "Attack";
    Actions["Defend"] = "Defend";
    Actions["UseItem"] = "UseItem";
    Actions["Escape"] = "Escape";
})(Actions || (Actions = {}));
function doSomething(character, action) {
    const [job, equip, life] = character;
    switch (action) {
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
const mage = ["Mage", "Staff", 75];
const mageAction = Actions.Attack;
const warrior = ["Warrior", "Sword", 150];
const warriorAction = Actions.Defend;
const archer = ["Archer", "Bow", 95];
const archerAction = Actions.UseItem;
doSomething(mage, mageAction);
doSomething(warrior, warriorAction);
doSomething(archer, archerAction);
