/**
 * Created by Administrator on 2018/1/9 0009.
 */
//添加主角
var AddHero=function () {
    base(this,LSprite,[]);
    this.moveType=null;  //主角运动方向
    this.hp=3;           //当前血量
    this.maxHp=3;        //游戏主角最大血量
    this.hpCtrl=0;       //血量提升速度
    this.isJump=true;    //是否处于跳跃状态
    this.speeds=0;       //主角下落的速度
    this._charaOld=0;    //每次下落之前的y坐标
    this.index=0;        //控制游戏主角动作变化的快慢
    this.g=10;           //重力加速度
    this.init();
};
AddHero.prototype={
    init:function () {
        this.Hero=new LBitmap(new LBitmapData(imglist["man"]));
        this.Hero.x=(h5_config.width-this.Hero.width)/2;
        this.Hero.y=100;
        this.addHeroControl();
        this.Hero.addEventListener(LEvent.ENTER_FRAME,this.onframe);
        gameLayer.addChild(this.Hero);

    },
    onframe:function () {
        var _this=game.addHero;
        _this.speeds+=_this.g;
        if(_this.speeds>20){_this.speeds=20;}
        if(_this.Hero.y>LGlobal.height){
            _this.hp=0;
        }
        if(_this.moveType=="left"){
            _this.Hero.x-=MOVE_STEP;
        }else if(_this.moveType=="right"){
            _this.Hero.x+=MOVE_STEP;
        }
        if(_this.Hero.x < 0){
            _this.Hero.x=0;
        }else if(_this.Hero.x>LGlobal.width-_this.Hero.width){
            _this.Hero.x=LGlobal.width-_this.Hero.width;
        }
        if(_this.index-- > 0){
            return;
        }
        _this.index=10;
    },
    addHeroControl:function () {
        var _this=this;
        gameLayer.addEventListener(LMouseEvent.MOUSE_UP,function (e) {
            if(e.offsetX>h5_config.width/2){
                _this.moveType="right";
            }else {
                _this.moveType="left";
            }
        });
    }
};