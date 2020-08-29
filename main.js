var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

module.exports.loop = function () {

    if (!("harvester" in Game.creeps)) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], "harvester", {memory : {role:"harvester"}})
            console.log("spawning harvester")
        }
    if (!("upgrader" in Game.creeps)) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], "upgrader", {memory : {role:"upgrader", fillCore:false}})
            console.log("spawning upgrader")
        }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}