/**
 * Created by Administrator on 2018/1/9 0009.
 */
function Floor() {
    var _this=this;
    base(this,LSprite,[]);
    _this.hy=0;
    _this.setView();
}
Floor.prototype.setView=function () {};
Floor.prototype.onframe=function () {
    var _this=this;
    _this.y-=STAGE_STEP;
};
Floor.prototype.hitRun=function () {};
//第一个平地面
function Floor1() {
    base(this,Floor,[]);
}
Floor1.prototype.setView = function () {
  var _this=this;
  _this.bitmap=new LBitmap(new LBitmapData(imglist["img_1"]));
    _this.bitmap.scaleX=game.scaleNum;
    _this.bitmap.scaleY=game.scaleNum;
  _this.addChild(_this.bitmap);
};
//第二个平地面
function Floor2() {
    base(this,Floor,[]);
    this.ctrlIndex = 0;
}
Floor2.prototype.setView = function () {
    var _this=this;
    _this.bitmap=new LBitmap(new LBitmapData(imglist["img_2"]));
    _this.bitmap.scaleX=game.scaleNum;
    _this.bitmap.scaleY=game.scaleNum;
    _this.hitRun();
    _this.addChild(_this.bitmap);
};
Floor2.prototype.hitRun=function () {
    var _this=this;
    _this.callParent("hitRun",arguments);
    _this.ctrlIndex++;
    if(_this.ctrlIndex >= 40){
        _this.parent.removeChild(this);
    }else if(_this.ctrlIndex==20){
        _this.bitmap.bitmapData.setCoordinate(100,0);
    }
};
//第三个平地面
function Floor3() {
    base(this,Floor,[]);
    this.hit=false;
    this.hy=10;
}
Floor3.prototype.setView = function () {
    var _this=this;
    _this.bitmap=new LBitmap(new LBitmapData(imglist["img_3"]));
    _this.bitmap.scaleX=game.scaleNum;
    _this.bitmap.scaleY=game.scaleNum;
    _this.addChild(_this.bitmap);
    _this.hitRun();
};
Floor3.prototype.hitRun=function () {
    var _this=this;
    _this.callParent("hitRun",arguments);
    if(_this.hit) return;
    _this.hit=true;
    _this.child.hp-=1;
};