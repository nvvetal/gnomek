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

//using for animation
gameSprite.prototype._milliseconds = 0;

gameSprite.prototype._iteration = 0;

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
    //console.log('setting'+animation);
    if(this._sprite != null){
        this._sprite.setAnimation(animation);
        var self = this;
       // console.log(this.getType(), animation);

        this._sprite.afterFrame(this._game.getAnimationLength(this.getType(), animation), function(){
            self.getNextTurn();

            //sprite
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

gameSprite.prototype.getNextTurn = function()
{
    //console.log('ololo');
}

gameSprite.prototype.setTurn = function(action, position)
{

}

gameSprite.prototype.incMilliseconds = function(milliseconds)
{
    this._milliseconds += milliseconds;
}

gameSprite.prototype.getMilliseconds = function()
{
    return this._milliseconds;
}

gameSprite.prototype.clearMilliseconds = function()
{
    this._milliseconds = 0;
}


gameSprite.prototype.incIteration = function()
{
    this._iteration ++;
}

gameSprite.prototype.getIteration = function()
{
    return this._iteration;
}

gameSprite.prototype.clearIteration = function()
{
    this._iteration = 0;
}

gameSprite.prototype.isTurnEnd = function()
{
    if(this.getMaxIterations() < this.getIteration()) return true;
    return false;

}

gameSprite.prototype.getMaxIterations = function()
{
    return 10;
}