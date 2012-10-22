function game (){
    this._links = null;

    this._containerId = null;
    this._width = null;
    this._height= null;

    this._gnomek = null;

    this._resources = null;
    this._resourcesLoaded = 0;
    this._animations = {};
    this._animObjects = {};

    this._sprites = null;

    this._maxX = 32;
    this. _maxY = 25;


    this.init = function(container, width, height, links){
        this._links         = links;
        this._initProgress(0);
        this._containerId   = container;
        this._width         = width;
        this._height        = height;
        this._sprites       = new Array();

        //console.log(this._animations);
        //32 x 25 (1024 x 800)
        for(var i = 0; i < this._maxX; i++)
        {
            this._sprites[i] = new Array();
            for(var k = 0; k < this._maxY; k++)
            {
                this._sprites[i][k] = jQuery.parseJSON('{"items": {}}');
            }
        }
    }

    this._initProgress = function(progressCount){
        if(progressCount == 0){
            this.getResources();
        }
        if(progressCount == 1 && this._resourcesLoaded == 2){
            this.loadGame();
        }
        if(progressCount == -1){
            console.log('SHIIIT!');
        }
    }

    this.getResources = function()
    {
        var xmlRequest = $.ajax({
            type: "GET",
            url: this._links['resources']
        });

        var self = this;
        xmlRequest.done(function( data ){
            self.initResources(data);
        });
        xmlRequest.fail(function(jqXHR, textStatus) {
            self._initProgress(-1);
        });
    }

    this.initResources = function(data)
    {
        this._resources = data;
        var terrainObj = new Image();
            terrainObj.src = this._resources.terrains.res;

            this._animations['terrain'] = this._resources.terrains.animations;
            var self = this;
            terrainObj.onload = function() {
                self._animObjects['terrain'] = terrainObj;
                var k = self._sprites.length;
                for(i = 0; i < self._resources.terrains.items.length; i++){
                    var itemData = jQuery.parseJSON('{"type":"terrain","collisionType":"wall", "animation": "'+self._resources.terrains.items[i].animation+'","frameRate": "'+self._resources.terrains.items[i].frameRate+'"}');
                    self.setMapItem(self._resources.terrains.items[i].x, self._resources.terrains.items[i].y, 'terrain', itemData);
                }
                self._resourcesLoaded++;
                self._initProgress(1);
            }
            var gnomekObj = new Image();
            gnomekObj.src = self._resources.gnomek.res;
            self._animations['gnomek'] = self._resources.gnomek.animations;
            gnomekObj.onload = function() {
                self._animObjects['gnomek'] = gnomekObj;
                var itemData = jQuery.parseJSON('{"type":"gnomek","collisionType":"user", "animation": "'+self._resources.gnomek.gnomek.animation+'","frameRate": "'+self._resources.gnomek.gnomek.frameRate+'"}');
                self.setMapItem(self._resources.gnomek.gnomek.x, self._resources.gnomek.gnomek.y, 'gnomek', itemData);
                self._resourcesLoaded++;
                self._initProgress(1);
            }
    }

    this.loadGame = function()
    {
        var stage = new Kinetic.Stage({
            container:  this._containerId,
            width:      this._width,
            height:     this._height
        });
        var layer = new Kinetic.Layer();
        //console.log( this._sprites);
        //return false;
        for(var i = 0; i < this._sprites.length; i++){
            for (var k = 0; k < this._sprites[i].length; k++)
            {
                if(this._sprites[i][k].length == 0) continue;
                var self = this;
                $.each(this._sprites[i][k].items, function(j, obj)
                {
                    var imageName = 'terrainObj';
                    if(obj.getType() == 'gnomek') {
                        imageName = 'gnomekObj';
                    }
                    var animations = self._animations[obj.getType()];
                    var sprite = new Kinetic.Sprite({
                        x: i * 32,
                        y: k * 32,
                        image: self._animObjects[obj.getType()],
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

    }

    this.setMapItem = function(x, y, itemType, itemData)
    {
        var spriteData = new gameSprite();
        spriteData.setCollisionType(itemData.collisionType);
        spriteData.setType(itemData.type);
        spriteData.setAnimation(itemData.animation);
        spriteData.setFrameRate(itemData.frameRate);
        spriteData.setCoords(x, y);
        if(itemType == 'gnomek'){
            this._gnomek = spriteData;
        }
        this._sprites[x][y].items[itemType] = spriteData;
    }

    this.tryAction =  function(action)
    {
        //TODO: a lot - check for collision at least
        if(action == 'moveLeft'){
            var canMove = this.canMove(this._gnomek.getCoordX() - 1, this._gnomek.getCoordY());
            console.log(canMove);
            if(canMove == false){
                console.log('Cannot do ' + action);
                return false;
            }
            this.sendDo(action);
            return true;
        }
        console.log('action not matched');
        return false;
    }

    this.sendDo = function(action)
    {
        var xmlRequest = $.ajax({
            type: "POST",
            url: this._links['do']+'/'+action
        });
        xmlRequest.done(function( data ) {
            console.log(data);
        });
    }

    this.canMove = function(x, y)
    {
        if(x < 0 || y < 0) return false;
        if(x - 1 > this._maxX || y - 1 > this._maxY) return false;

        //checking walls or other players
        $.each(this._sprites[x][y].items, function(j, obj){
            if(obj.getCollisionType() == 'wall') {
                console.log(obj.getCollisionType());
                return false;
            }
        });
        return true;
    }

}

game.prototype = {};
