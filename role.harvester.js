var roleHarvester = {

    /** @param {Creep} creep **/
	/** test**/
    run: function(creep) {
        if(creep.store.getFreeCapacity() > 0) {
            if (!creep.memory.harvSource[0]){
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(Game.getObjectById(creep.memory.harvSource[0])) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.harvSource[0]));
            }
        }
        else {
            if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Spawn1']);
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }
        }
    }
};

module.exports = roleHarvester;