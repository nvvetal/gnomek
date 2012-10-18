var game = {
    _loadMax: 1,
    _links: null,

    _containerId: null,
    _width: null,
    _height: null,

    _terrain: null,

    _sprite: null,

    init: function(container, width, height, links){
        game._links = links;
        game._initProgress(0);
        game._containerId = container;
        game._width = width;
        game._height = height;
        game._sprite = new Array();
    },

    _initProgress: function(progressCount){
        if(progressCount == 0){
            game.initTerrain();
        }
        if(progressCount == 1){
            game.initGnomek();
        }
        if(progressCount == 2){
            game.loadGame();
        }
        if(progressCount == -1){
            console.log('SHIIIT!');
        }
    },

    initTerrain: function()
    {
        var isLoaded = false;
        var xmlRequest = $.ajax({
            type: "GET",
            url: this._links['terrain']
        });
        xmlRequest.done(function( data ) {
            isLoaded = true;
            game._terrain = data;
            var terrainObj = new Image();
            terrainObj.src = game._terrain.res;
            //console.log(game._terrain.animations);

            terrainObj.onload = function() {
                //console.log(game._terrain);
                for(i = 0; i < game._terrain.terrains.length; i++){
                    var sprite = new Kinetic.Sprite({
                        x: game._terrain.terrains[i].x,
                        y: game._terrain.terrains[i].y,
                        image: terrainObj,
                        animation: game._terrain.terrains[i].animation,
                        animations: game._terrain.animations,
                        frameRate: game._terrain.terrains[i].frameRate
                    });
                    game._sprite.push(sprite);
                }
                game._initProgress(1);
            }

            //todo load data in correct format
        });
        xmlRequest.fail(function(jqXHR, textStatus) {
            game._initProgress(-1);
        });

    },

    initGnomek: function(){
        game._initProgress(2);
    },

    loadGame: function(){

        var stage = new Kinetic.Stage({
            container: game._containerId,
            width: game._width,
            height: game._height
        });
        var layer = new Kinetic.Layer();

        for(i = 0; i < game._sprite.length; i++){
            layer.add(game._sprite[i]);
            //alert(game._sprite[i].toString());
            game._sprite[i].start();
        }
        stage.add(layer);
    }
}