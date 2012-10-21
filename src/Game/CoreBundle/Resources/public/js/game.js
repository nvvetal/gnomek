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
        //32 x 25 (1024 x 800)
        for(var i = 0; i < 32; i++)
        {
            game._sprites[i] = new Array();
            for(var k = 0; k < 25; k++)
            {
                game._sprites[i][k] = jQuery.parseJSON('{"items": {}}');
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
                    game.setMapItem(game._resources.terrains.items[i].x, game._resources.terrains.items[i].y, 'terrain', itemData);
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
                game.setMapItem(game._resources.gnomek.gnomek.x, game._resources.gnomek.gnomek.y, 'gnomek', itemData);
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
                $.each(game._sprites[i][k].items, function(j, obj)
                {
                    var imageName = 'terrainObj';
                    if(obj.getType() == 'gnomek') imageName = 'gnomekObj';
                    var animations = game._animations[obj.getType()];
                    var sprite = new Kinetic.Sprite({
                        x: i * 32,
                        y: k * 32,
                        image: game._animObjects[obj.getType()],
                        animation: obj.getAnimation(),
                        animations: animations,
                        frameRate: obj.getFrameRate()
                    });
                    layer.add(sprite);
                    sprite.start();
                });

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
        game._sprites[x][y].items[itemType] = spriteData;
    }
}

