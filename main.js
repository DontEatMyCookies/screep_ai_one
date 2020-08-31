var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    //delete memory objects of dead creeps
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    //get creep count by role
    var creepDic = {
        harvester: 0,
        upgrader: 0
    };
    for (creeps in Game.creeps){
        creepDic[Game.creeps[creeps].memory.role] = creepDic[Game.creeps[creeps].memory.role] + 1;
        //console.log(creeps);
    }
    //spawn creeps
    if (!("harvester" in Game.creeps)) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], "harvester", {memory : {role:"harvester", harvSource:[]}})
        }
    if (creepDic["upgrader"] <= 4) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], "upgrader"+Game.time, {memory : {role:"upgrader", fillCore:false, harvSource:[]}})
        }
    if (!("builder" in Game.creeps)) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], "builder", {memory : {role:"builder", fillCore:false , harvSource:[]}});
        }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}