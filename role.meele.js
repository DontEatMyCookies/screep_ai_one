var roleMeele = {

    run: function(creep) {
        var enemyArr = Game.rooms["W5N8"].find(FIND_HOSTILE_CREEPS);
        pathCost = [0, ];
        //console.log(enemyArr);
        if (enemyArr.length <= 0){
            creep.moveTo(9,12);
        }else{
            for (i = 0; i <=enemyArr.length; i++){
                //console.log(creeps);
                if(findPath(creep.pos, enemyArr[i].pos, costCallback) < pathCost){
                    pathCost = [findPath(creep.pos, creeps.pos), creeps];
                }
            }
            if(pathCost[1] == ERR_NOT_IN_RANGE) {
                 //creep.moveTo(pathCost[1], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleMeele;