function gameSprite(){

}

//none, wall, user - using for collisions
gameSprite.prototype._collisionType = 'none';

gameSprite.prototype._counter = 0;

//none, terrain, gnomek
gameSprite.prototype._type = 'none';

gameSprite.prototype._animation = '';
gameSprite.prototype._animationLength = 2;

gameSprite.prototype._frameRate = 2;

gameSprite.prototype._coordX = null;
gameSprite.prototype._coordY = null;

gameSprite.prototype._owner = null;

gameSprite.prototype._sprite = null;

gameSprite.prototype._game = null;

gameSprite.prototype.getCollisionType = function()
{
    return this._collisionType;
}

gameSprite.prototype.setCollisionType = function(collisionType)
{
    this._collisionType = collisionType;
}

gameSprite.prototype.getType = function()
{
    return this._type;
}

gameSprite.prototype.setType = function(type)
{
    this._type = type;
}

gameSprite.prototype.getAnimation = function()
{
    return this._animation;
}

gameSprite.prototype.setAnimation = function(animation)
{
    this._animation         = animation;
    //console.log(this._game.getAnimationLength(this.getType(), animation));
    this.handleAnimation(animation);
}

gameSprite.prototype.handleAnimation = function(animation)
{
    if(this._sprite != null){
        this._sprite.setAnimation(animation);
        var self = this;
       // console.log(this.getType(), animation);
        this._sprite.afterFrame(this._game.getAnimationLength(this.getType(), animation) - 1, function(){
            self.getNextAnimation();
        });
    }
}

gameSprite.prototype.getFrameRate = function()
{
    return this._frameRate;
}

gameSprite.prototype.setFrameRate = function(frameRate)
{
    this._frameRate = frameRate;
}

gameSprite.prototype.setCoords = function(x, y)
{
    this._coordX = x;
    this._coordY = y;
}

gameSprite.prototype.getCoordX = function()
{
    return this._coordX;
}

gameSprite.prototype.getCoordY = function()
{
    return this._coordY;
}

gameSprite.prototype.getOwner = function()
{
    return this._owner;
}

gameSprite.prototype.setOwner = function(owner)
{
    this._owner = owner;
}

gameSprite.prototype.sendEvent = function(event)
{
    this._owner.eventListener(event, this);
}

gameSprite.prototype.getSprite = function()
{
    return this._sprite;
}

gameSprite.prototype.setSprite = function(sprite)
{
    this._sprite = sprite;
}

gameSprite.prototype.setGame = function(game)
{
    this._game = game;
}

gameSprite.prototype._switchAnimation = function()
{

}

gameSprite.prototype.incCounter = function()
{
    this._counter++;
    console.log(this.getType(), this._counter);
}

gameSprite.prototype.clearCounter = function()
{
    this._counter = 0;
}

gameSprite.prototype.getNextAnimation = function()
{

}