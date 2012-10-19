function gameSprite(){
    //none, wall, user - using for collisions
    this._collisionType = 'none';

    //none, terrain, gnomek
    this._type = 'none';

    this._animation = '';
    this._frameRate = 2;

    this.getCollisionType = function(){
        return this._collisionType;
    }

    this.setCollisionType = function(collisionType){
        this._collisionType = collisionType;
    }

    this.getType = function(){
        return this._type;
    }

    this.setType = function(type){
        this._type = type;
    }

    this.getAnimation = function(){
        return this._animation;
    }

    this.setAnimation = function(animation){
        this._animation = animation;
    }

    this.getFrameRate = function(){
        return this._frameRate;
    }

    this.setFrameRate = function(frameRate){
        this._frameRate = frameRate;
    }
}

gameSprite.prototype = {};