function game (){}

game.prototype._links = null;

game.prototype._containerId = null;
game.prototype._width = null;
game.prototype._height= null;

game.prototype._gnomek = null;

game.prototype._resources = null;
game.prototype._resourcesLoaded = 0;
game.prototype._animations = {};
game.prototype._animObjects = {};

game.prototype._sprites = null;

game.prototype._maxX = 32;
game.prototype._maxY = 25;


game.prototype.init = function(container, width, height, links){
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

game.prototype._initProgress = function(progressCount){
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

game.prototype.getResources = function()
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

game.prototype.initResources = function(data)
{
    this._resources = data;
    var terrainObj = new Image();
    terrainObj.src = this._resources.terrains.res;

    this._animations['terrain'] = this._resources.terrains.animations;
    var self = this;
    terrainObj.onload = function() {
        self._animObjects['terrain'] = terrainObj;
        var k = self._sprites.length;
        for(i = 0; i < self._resources.terrains.items.length; i++)
        {
            var itemData = self._resources.terrains.items[i];
            itemData.type = 'terrain';
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
        var itemData =  self._resources.gnomek.gnomek;
        itemData.type = 'gnomek';
        //var itemData = jQuery.parseJSON('{"type":"gnomek","collisionType":"user", "animation": "'+self._resources.gnomek.gnomek.animation+'","frameRate": "'+self._resources.gnomek.gnomek.frameRate+'"}');
        self.setMapItem(self._resources.gnomek.gnomek.x, self._resources.gnomek.gnomek.y, 'gnomek', itemData);
        self._resourcesLoaded++;
        self._initProgress(1);
    }
}

game.prototype.loadGame = function()
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
                obj.setSprite(sprite);
                obj.handleAnimation(obj.getAnimation());
            });

        }
    }
    stage.add(layer);
    var anim = new Kinetic.Animation({
        func: function(frame) {
            //console.log(frame.);
            //console.log(frame.time);
        },
        node: layer
    });
    anim.start();
}

game.prototype.setMapItem = function(x, y, itemType, itemData)
{
    if(itemType == 'gnomek'){
        var spriteData = new gameSpriteUser();
    }else{
        var spriteData = new gameSprite();
    }
    spriteData.setGame(this);
    spriteData.setCollisionType(itemData.collisionType);
    spriteData.setType(itemData.type);
    spriteData.setAnimation(itemData.animation);
    spriteData.setFrameRate(itemData.frameRate);
    spriteData.setCoords(x, y);

    if(itemType == 'gnomek'){
        //console.log(itemData);
        spriteData.setCurrentAction(itemData.currentAction);
        spriteData.setCurrentPosition(itemData.currentPosition);
        this._gnomek = spriteData;
    }
    this._sprites[x][y].items[itemType] = spriteData;
}

game.prototype.tryAction =  function(action)
{
    //TODO: a lot - check for collision at least
    methodName = 'tryAct_'+action;
    var self = this;
    if(game.prototype.hasOwnProperty(methodName)){
        return this[methodName].call(self, self);
    }
    this._gnomek.setCurrentAction('stay');
    //console.log('action not matched');
    return false;
}

game.prototype.tryAct_moveLeft = function(caller)
{
    //console.log(caller);
    var canMove = caller.canMove(caller._gnomek.getCoordX() - 1, caller._gnomek.getCoordY());
    if(canMove == false){
        caller.tryAction('stay');
        return false;
    }
    caller._gnomek.setCurrentAction('move');
    caller._gnomek.setCurrentPosition('left');
    caller.sendDo('moveLeft');
    return true;
}

game.prototype.tryAct_moveRight = function(caller)
{
    var canMove = caller.canMove(caller._gnomek.getCoordX() + 1, caller._gnomek.getCoordY());
    if(canMove == false){
        return false;
    }

    var prevAction = caller._gnomek.getCurrentAction();
    //caller._gnomek.setCurrentAction('move');
    //caller._gnomek.setCurrentPosition('right');
    caller._gnomek.setTurn('move', 'right');
    caller.sendDo('moveRight');
    return true;
}

game.prototype.tryAct_moveTop = function(caller)
{
    var canMove = caller.canMove(caller._gnomek.getCoordX(), caller._gnomek.getCoordY() - 1);
    if(canMove == false){
        return false;
    }
    caller._gnomek.setCurrentAction('move');
    caller._gnomek.setCurrentPosition('top');
    caller.sendDo('moveTop');
    return true;
}

game.prototype.tryAct_moveDown = function(caller)
{
    var canMove = caller.canMove(caller._gnomek.getCoordX(), caller._gnomek.getCoordY() + 1);
    if(canMove == false){
        return false;
    }
    caller._gnomek.setCurrentAction('move');
    caller._gnomek.setCurrentPosition('bottom');
    caller.sendDo('moveBottom');
    return true;
}

game.prototype.sendDo = function(action)
{
    var xmlRequest = $.ajax({
        type: "POST",
        url: this._links['do']+'/'+action
    });
    xmlRequest.done(function( data ) {
        console.log(data);
    });
}

game.prototype.canMove = function(x, y)
{
    if(x < 0 || y < 0) return false;
    if(x - 1 > this._maxX || y - 1 > this._maxY) return false;

    //checking walls or other players
    var notIsWall = true;
    $.each(this._sprites[x][y].items, function(j, obj){
        if(obj.getCollisionType() == 'wall') {
            notIsWall = false;
            return false;
        }
    });
    if(!notIsWall) return false;
    return true;
}

game.prototype.eventListener = function(event, sender)
{
    if(gameSprite instanceof sender)
    {
        if(event == 'animation')
        {
            //this._sprites[x][y].items[sender.getType()].
        }
    }
}

game.prototype.getAnimationLength = function(itemType, animation)
{
    console.log(this._animations[itemType][animation].length);
    return this._animations[itemType][animation].length;
}

function extend(Child, Parent) {
    var F = function() { }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.superclass = Parent.prototype
}