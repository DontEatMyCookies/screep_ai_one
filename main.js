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
        upgrader: 0,
        builder: 0
    };
    for (creeps in Game.creeps){
        creepDic[Game.creeps[creeps].memory.role] = creepDic[Game.creeps[creeps].memory.role] + 1;
        //console.log(creeps);
    }
    //service text
    new RoomVisual("W5N8").text("Bucket: "+Game.cpu.bucket, 29, 0, 0)
    //new RoomVisual("W5N8").text("CPU: "+Game.cpu.getUsed(), 29, 1, 0)
    //spawn creeps
    if (creepDic["harvester"] <= 1) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], "harvester"+Game.time, {memory : {role:"harvester", harvSource:[], extensionFills:[] }})
        }
    if (creepDic["upgrader"] <= 4) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE], "upgrader"+Game.time, {memory : {role:"upgrader", fillCore:false, harvSource:[] }})
        }
    if (creepDic["builder"] <= 2) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], "builder"+Game.time, {memory : {role:"builder", fillCore:false , harvSource:[], toBuild:[] }});
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