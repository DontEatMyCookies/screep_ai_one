var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store[RESOURCE_ENERGY] <= 50 && creep.memory.fillCore == false) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            if (creep.store[RESOURCE_ENERGY] == 50){
                creep.memory.fillCore = true;
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if(creep.store[RESOURCE_ENERGY] == 0){
                console.log(creep.store[RESOURCE_ENERGY])
                creep.memory.fillCore = false;
            }
        }
    }
};

module.exports = roleUpgrader;