var game = {
    _links: null,

    _containerId: null,
    _width: null,
    _height: null,

    _resources: null,
    _resourcesLoaded: 0,
    _animations: {},
    _animObjects: {},

    _sprites: null,

    init: function(container, width, height, links){
        game._links         = links;
        game._initProgress(0);
        game._containerId   = container;
        game._width         = width;
        game._height        = height;
        game._sprites       = new Array();
        game._animations    = new Array();
        //25 x 12 (800 x 324)
        for(var i = 0; i < 25; i++)
        {
            game._sprites[i] = new Array();
            for(var k = 0; k < 12; k++)
            {
                game._sprites[i][k] = new Array();
            }
        }
    },

    _initProgress: function(progressCount){
        if(progressCount == 0){
            game.initResources();
        }
        if(progressCount == 1 && game._resourcesLoaded == 2){
            game.loadGame();
        }
        if(progressCount == -1){
            console.log('SHIIIT!');
        }
    },

    initResources: function()
    {
        var xmlRequest = $.ajax({
            type: "GET",
            url: this._links['resources']
        });
        xmlRequest.done(function( data ) {
            game._resources = data;
            var terrainObj = new Image();
            //alert(data);
            terrainObj.src = game._resources.terrains.res;
            game._animations['terrain'] = game._resources.terrains.animations;
            terrainObj.onload = function() {
                game._animObjects['terrain'] = terrainObj;
                var k = game._sprites.length;
                for(i = 0; i < game._resources.terrains.items.length; i++){
                    var itemData = jQuery.parseJSON('{"type":"terrain","collisionType":"wall", "animation": "'+game._resources.terrains.items[i].animation+'","frameRate": "'+game._resources.terrains.items[i].frameRate+'"}');
                    game.setMapItem(game._resources.terrains.items[i].x, game._resources.terrains.items[i].y, 0, itemData);
                }
                game._resourcesLoaded++;
                game._initProgress(1);
            }
            var gnomekObj = new Image();
            gnomekObj.src = game._resources.gnomek.res;
            game._animations['gnomek'] = game._resources.gnomek.animations;
            gnomekObj.onload = function() {
                game._animObjects['gnomek'] = gnomekObj;
                var itemData = jQuery.parseJSON('{"type":"gnomek","collisionType":"user", "animation": "'+game._resources.gnomek.gnomek.animation+'","frameRate": "'+game._resources.gnomek.gnomek.frameRate+'"}');
                game.setMapItem(game._resources.gnomek.gnomek.x, game._resources.gnomek.gnomek.y, 1, itemData);
                game._resourcesLoaded++;
                game._initProgress(1);
            }
        });
        xmlRequest.fail(function(jqXHR, textStatus) {
            game._initProgress(-1);
        });

    },

    loadGame: function()
    {
        //alert('zzz');
        var stage = new Kinetic.Stage({
            container:  game._containerId,
            width:      game._width,
            height:     game._height
        });
        var layer = new Kinetic.Layer();

        for(var i = 0; i < game._sprites.length; i++){
            for (var k = 0; k < game._sprites[i].length; k++)
            {
                if(game._sprites[i][k].length == 0) continue;
                for(var j = 0; j < game._sprites[i][k].length; j++)
                {
                    var imageName = 'terrainObj';
                    if(game._sprites[i][k][j].getType() == 'gnomek') imageName = 'gnomekObj';
                    var animations = game._animations[game._sprites[i][k][j].getType()];
                    var sprite = new Kinetic.Sprite({
                        x: i*32,
                        y: k*32,
                        image: game._animObjects[game._sprites[i][k][j].getType()],
                        animation: game._sprites[i][k][j].getAnimation(),
                        animations: animations,
                        frameRate: game._sprites[i][k][j].getFrameRate()
                    });
                    layer.add(sprite);
                    sprite.start();
                }
            }
        }
        stage.add(layer);
    },

    setMapItem: function(x, y, itemType, itemData)
    {
        var spriteData = new gameSprite();
        spriteData.setCollisionType(itemData.collisionType);
        spriteData.setType(itemData.type);
        spriteData.setAnimation(itemData.animation);
        spriteData.setFrameRate(itemData.frameRate);
        game._sprites[x][y][itemType] = spriteData;
        //console.log(game._sprites[x][y]);
    }
}

function extend(Child, Parent) {
    var F = function() { }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.superclass = Parent.prototype
}
