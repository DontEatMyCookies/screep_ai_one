var roleHarvester = {

    /** @param {Creep} creep **/
	/** test**/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            if (!creep.memory.harvSource[0]){
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }
            if (!creep.memory.extensionFills[0]){
                creep.memory.extensionFills = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }}).map(x=>x.id);
                console.log(creep.memory.extensionFills);
            }
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(Game.getObjectById(creep.memory.harvSource[0])) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.harvSource[0]));
            }
        }
        else {
            //var extensions = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }});
            //console.log(Game.spawns.Spawn1.energyCapacity)
            //console.log(creep.memory.extensionFills);
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }
            //console.log("spawn full: "+String(Game.spawns.Spawn1.energy)+" - "+300)
            if(Game.spawns.Spawn1.energy == 300){
                console.log("spawn full")
                //console.log(Game.getObjectById(creep.memory.extensionFills[0]))
                for (i=0;i<creep.memory.extensionFills.length;i++)
                    if(Game.getObjectById(creep.memory.extensionFills[i]).getFreeCapacity != 0){
                        if(creep.transfer(Game.getObjectById(creep.memory.extensionFills[i]), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(Game.getObjectById(creep.memory.extensionFills[i]));
                        }else{
                            creep.moveTo(Game.spawns['Spawn1']);
                        }
                    }
            }else{
                //console.log("none 2")
            }
        }
    }
};

module.exports = roleHarvester;