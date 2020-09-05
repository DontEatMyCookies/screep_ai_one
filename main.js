var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleArcher = require('role.archer');
var roleMeele = require('role.meele');

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
        builder: 0,
        meele: 0
    };
    for (creeps in Game.creeps){
        creepDic[Game.creeps[creeps].memory.role] = creepDic[Game.creeps[creeps].memory.role] + 1;
        //console.log(creeps);
    }
    //service text
    new RoomVisual("W5N8").text("Energy: "+Game.rooms["W5N8"].energyAvailable+"/"+Game.rooms["W5N8"].energyCapacityAvailable, 29, 0, 0);
    new RoomVisual("W5N8").text("Bucket: "+Game.cpu.bucket, 29, 1, 0);
    new RoomVisual("W5N8").text("Controller: "+parseFloat(((Game.getObjectById("cdbf0773313f0a9").progress/Game.getObjectById("cdbf0773313f0a9").progressTotal)*100).toFixed(5), 10)+"%", 29, 2, 0);
    
    //spawn creeps
    if (creepDic["harvester"] <= 1) {
            Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], "harvester"+Game.time, {memory : {role:"harvester", harvSource:[], extensionFills:[] }})
        }else{
            if (creepDic["meele"] <= 0) {
                    Game.spawns["Spawn1"].spawnCreep([ATTACK, MOVE, MOVE, TOUGH, TOUGH, TOUGH], "meele"+Game.time, {memory : {role:"meele", }})
                }
            if (creepDic["upgrader"] <= 0) {
                    Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], "upgrader"+Game.time, {memory : {role:"upgrader", fillCore:false, harvSource:[] }})
                }
            if (creepDic["builder"] <= 1) {
                    Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], "builder"+Game.time, {memory : {role:"builder", fillCore:false, checkRoad:true, harvSource:[], toBuild:[] }});
                }
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
        if(creep.memory.role == 'archer') {
            roleArcher.run(creep);
        }
        if(creep.memory.role == 'meele') {
            roleMeele.run(creep);
        }
    }
}