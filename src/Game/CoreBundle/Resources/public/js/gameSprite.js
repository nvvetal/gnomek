function gameSprite(){
    //none, wall, user - using for collisions
    this._collisionType = 'none';

    //none, terrain, gnomek
    this._type = 'none';

    this._animation = '';
    this._frameRate = 2;

    this._coordX = null;
    this._coordY = null;

    this.getCollisionType = function()
    {
        return this._collisionType;
    }

    this.setCollisionType = function(collisionType)
    {
        this._collisionType = collisionType;
    }

    this.getType = function()
    {
        return this._type;
    }

    this.setType = function(type)
    {
        this._type = type;
    }

    this.getAnimation = function()
    {
        return this._animation;
    }

    this.setAnimation = function(animation)
    {
        this._animation = animation;
    }

    this.getFrameRate = function()
    {
        return this._frameRate;
    }

    this.setFrameRate = function(frameRate)
    {
        this._frameRate = frameRate;
    }

    this.setCoords = function(x, y)
    {
        this._coordX = x;
        this._coordY = y;
    }

    this.getCoordX = function()
    {
        return this._coordX;
    }

    this.getCoordY = function()
    {
        return this._coordY;
    }

}

gameSprite.prototype = {};