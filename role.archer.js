var roleArcher = {

    run: function(creep) {
        var enemyArr = Game.rooms["W5N8"].find(FIND_HOSTILE_CREEPS);
        pathCost = [0, ];
        for (creeps in enemyArr){
            if(findPath(creep.pos, creeps.pos, costCallback) < pathCost){
                pathcost = findPath(creep.pos, creeps.pos);
            }
        }
    }
};

module.exports = roleArcher;