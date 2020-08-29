var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.store.getFreeCapacity() >= 0 && creep.memory.fillCore == false) {
            if (!creep.memory.harvSource[0]){
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(Game.getObjectById(creep.memory.harvSource[0])) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.harvSource[0]));
            }
            if (creep.store.getFreeCapacity() == 0){
                creep.memory.fillCore = true;
                //console.log("Builder info: Capacity full");
                creep.say("full");
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            if(creep.store[RESOURCE_ENERGY] == 0){
                //console.log("Builder info: Capacity empty")
                creep.say("empty");
                creep.memory.fillCore = false;
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }
        }
    }
};

module.exports = roleUpgrader;