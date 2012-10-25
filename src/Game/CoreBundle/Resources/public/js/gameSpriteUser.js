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
    this._switchAnimation();
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

gameSpriteUser.prototype._switchAnimation = function()
{
    if(this._currentAction == 'stay')
    {
        this.setAnimation('idle');
    }
}

gameSpriteUser.prototype.getNextAnimation = function()
{
    var currentAction = this.getCurrentAction();
    //console.log(currentAction);
    if(currentAction == 'move')
    {
        return this.setCurrentAction('stay');
        //this.handleAnimation(this.getAnimation());
    }
}