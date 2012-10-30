function gameSpriteUser()
{

}

extend(gameSpriteUser, gameSprite);

//move, mine, stay
gameSpriteUser.prototype._currentAction = '';

//none, left, right, top, bottom
gameSpriteUser.prototype._currentPosition = 'none';

gameSpriteUser.prototype.setCurrentAction = function(currentAction)
{
    this._currentAction = currentAction;
    //this._switchAnimation();
}

gameSpriteUser.prototype.getCurrentAction = function()
{
    return this._currentAction;
}

gameSpriteUser.prototype.setCurrentPosition = function(currentPosition)
{
    //if(currentPosition == 'stay') this.setCurrentAction('none');
    this._currentPosition = currentPosition;
}

gameSpriteUser.prototype.getCurrentPosition = function()
{
    return this._currentPosition;
}

gameSpriteUser.prototype.handleAnimation = function(animation)
{
    if(this._sprite != null){
        //console.log(animation);
        this._sprite.setAnimation(animation);
        var self = this;

        this._sprite.afterFrame(this._game.getAnimationLength(this.getType(), animation) - 1, function(){
            self.getNextTurn();
        });
    }
}

gameSpriteUser.prototype.getNextTurn = function()
{
    var currentAction   = this.getCurrentAction();
    var currentPosition = this.getCurrentPosition();
    //console.log(currentAction, currentPosition);
    if(currentAction == 'move')
    {
        if(currentPosition == 'right')
        {
            this._game.moveItem(this.getType(), this._coordX, this._coordY,  this._coordX + 1, this._coordY);
            return this.setTurn('stay', 'none');
        }
        if(currentPosition == 'left')
        {
            this._game.moveItem(this.getType(), this._coordX, this._coordY,  this._coordX - 1, this._coordY);
            return this.setTurn('stay', 'none');
        }

        return this.setTurn('stay', 'none');
    }
}

gameSpriteUser.prototype.setTurn = function(action, position)
{
    //console.log('setTurn: ', action, position);
    if(action == 'stay')
    {
        this.setCurrentPosition('none');
        this.setCurrentAction(action);
        this.setAnimation('stay');
    }else if(action == 'move'){
        var ucPos = position.charAt(0).toUpperCase() + position.substr(1);
        this.setCurrentPosition(position);
        this.setCurrentAction(action);
        this.setAnimation(action+ucPos);
    }
}

