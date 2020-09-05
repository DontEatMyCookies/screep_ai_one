var roleBuilder = {

    /** @param {Creep} creep **/
	/** test**/
    run: function(creep) {
        if(creep.store.getFreeCapacity() >= 0 && creep.memory.fillCore == false) {
            if (!creep.memory.harvSource[0]){
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }
            //var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(Game.getObjectById(creep.memory.harvSource[0])) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById(creep.memory.harvSource[0]), {visualizePathStyle: {stroke: '#ffffff'}});
            }
            if (creep.store.getFreeCapacity() == 0){
                creep.memory.fillCore = true;
                //console.log("Builder info: Capacity full");
                creep.say("full🤤"), true;
            }
        } else {
            spawnPos = Game.spawns.Spawn1.pos;
            //create build array for extentions
            var extensionSize = 2;
            buildArray = []
            for (i = -extensionSize; i <=extensionSize; i++){
                for (o = -extensionSize; o <=extensionSize; o++){
                    //console.log(spawnPos["x"]-i+"_"+spawnPos["y"]-o)
                    //console.log("x: "+spawnPos["x"]+"   y: "+spawnPos["y"]);
                    buildArray.push([spawnPos["x"]+i, spawnPos["y"]+o]);
                }
            }
            //visualize build area for extensions
            //Game.rooms["W5N8"].createConstructionSite(buildArray[0][0], buildArray[0][1], STRUCTURE_EXTENSION);
            showVisCon = false;
            if(showVisCon){
                new RoomVisual("W5N8").rect(buildArray[0][0],buildArray[0][1],buildArray[buildArray.length -1][0]-buildArray[0][0],buildArray[buildArray.length -1][1]-buildArray[0][1]);
            }

            //create construction sites
            helper = [spawnPos["x"], spawnPos["y"]];
            //Storage + ROAD connection
            Game.rooms["W5N8"].createConstructionSite(helper[0]+3, helper[1], STRUCTURE_ROAD);
            Game.rooms["W5N8"].createConstructionSite(helper[0]+4, helper[1], STRUCTURE_STORAGE);
            
            //Extensions
            for (i = 0; i < buildArray.length; i++){
                if (buildArray[i][0] != spawnPos["x"] && buildArray[i][1] != spawnPos["y"]){
                    Game.rooms["W5N8"].createConstructionSite(buildArray[i][0], buildArray[i][1], STRUCTURE_EXTENSION);
                    //console.log("building extension: "+buildArray[i][0]+" "+buildArray[i][1]);
                }else if (buildArray[i] != helper){
                    //console.log(buildArray[i]+" - "+helper)
                    //console.log(buildArray[i][0] != helper[0])
                    Game.rooms["W5N8"].createConstructionSite(buildArray[i][0], buildArray[i][1], STRUCTURE_ROAD);
                }
            }
            //road Store to Controller
            if (creep.memory.checkRoad){
                console.log("road check");
                creep.memory.checkRoad = false;
            }
            //get construction sites and move
            var btargets = creep.room.find(FIND_CONSTRUCTION_SITES);
            //console.log(creep.room.find(FIND_CONSTRUCTION_SITES));
            if(btargets.length) {
                if(creep.build(btargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(btargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(creep.store[RESOURCE_ENERGY] == 0){
                //console.log("Builder info: Capacity empty")
                creep.say("empty😱", true);
                creep.memory.fillCore = false;
                creep.memory.harvSource = creep.room.find(FIND_SOURCES).map(x=>x.id);
            }else{
                //creep.moveTo(9,12)
            }
            //move to parking space
            if(creep.room.find(FIND_CONSTRUCTION_SITES) == ""){
                creep.moveTo(9,12)
            }
        }
    }
};

module.exports = roleBuilder;