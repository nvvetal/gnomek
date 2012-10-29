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
    if(currentPosition == 'stay') this.setCurrentAction('none');
    this._currentPosition = currentPosition;
}

gameSpriteUser.prototype.getCurrentPosition = function()
{
    return this._currentPosition;
}



gameSpriteUser.prototype.getNextTurn = function()
{
    var currentAction   = this.getCurrentAction();
    var currentPosition = this.getCurrentPosition();
    console.log('get'+currentAction+currentPosition);
    if(currentAction == 'move')
    {
        if(currentPosition == 'right'){
            return this.setTurn('move', 'right');
        }

        if(currentPosition == 'rightEnd'){
            return this.setTurn('move', 'right');
        }
        if(currentPosition == 'rightBegin'){
            //console.log(currentPosition);
            return this.setTurn('stay', 'none');
        }
        return this.setTurn('stay', 'none');
    }
}

gameSprite.prototype.setTurn = function(action, position)
{
    if(action == 'stay')
    {
        this.setAnimation('idle');
        this.setCurrentPosition('none');
    }else if(action == 'move'){
        var ucPos = position.charAt(0).toUpperCase() + position.substr(1);
        if(this._currentPosition == 'none'){
            ucPos += 'End';
        }else if(this._currentAction != 'stay'){
            ucPos += 'Begin';
        }
        console.log('set'+this._currentAction + ucPos);
        this.setAnimation(this._currentAction + ucPos);
        this.setCurrentAction(action);
        this.setCurrentPosition(position);
    }
}