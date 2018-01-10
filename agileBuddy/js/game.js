/**
 * Created by Administrator on 2018/1/4 0004.
 */
var GameOne=function () {
    this.isGameOver = false;//游戏是否结束
    this.startTime=null;//游戏开始时间
    this.times=0;//游戏时间
    this.steps=0;//游戏步数
    this.blockList=[];//拆分后的拼图信息
    this.scaleNum=0.7;//图片缩放
    this.setStart();
};
GameOne.prototype={
    setStart:function () {
        var _this=this;
      startLayer=new LSprite();
      //显示游戏标题
      var title=new LTextField();
      title.x=(h5_config.width-225)/2;
      title.y=h5_config.height/4;
      title.size=30;
      title.color="#fff";
      title.text="是男人就下100层";
      startLayer.addChild(title);
      //显示说明文字
      startLayer.graphics.drawRect(1,"#fff",[(h5_config.width-220)/2,h5_config.height/4*3-60,220,40]);//[x,y,width,height]
      var txtClick=new LTextField();
      txtClick.size=18;
      txtClick.color="#fff";
      txtClick.text="点击页面开始游戏";
      txtClick.x=(h5_config.width-144)/2;
      txtClick.y=h5_config.height/4*3-50;
      startLayer.addChild(txtClick);
      backLayer.addChild(startLayer);
      //添加点击事件
      startLayer.addEventListener(LMouseEvent.MOUSE_UP,function () {
         _this.startGame();
      });

    },
    startGame:function () {
        var _this=this;
        console.log("开始游戏");
        var imgWidth=imglist['bg'].width;
        var imgHeight=imglist['bg'].height;
        backLayer.removeChild(startLayer);
        gameLayer=new LSprite();
        //添加背景图片
        var gameBg=new LBitmapData(imglist['bg']);
        this.gameBgM=new LBitmap(gameBg);
        this.gameBgM.scaleX=h5_config.width/imgWidth;
        gameLayer.addChild(this.gameBgM);
        this.gameBgM1=new LBitmap(gameBg);
        this.gameBgM1.scaleX=h5_config.width/imgWidth;
        this.gameBgM1.y=_this.gameBgM.getHeight();
        gameLayer.addChild(this.gameBgM1);
        this.gameBgM2=new LBitmap(gameBg);
        this.gameBgM2.scaleX=h5_config.width/imgWidth;
        this.gameBgM2.y=_this.gameBgM.getHeight()*2;
        gameLayer.addChild(this.gameBgM2);
        gameLayer.addEventListener(LEvent.ENTER_FRAME,_this.backgroundRun);
        //添加底部图层
        stageLayer=new LSprite();
        gameLayer.addChild(stageLayer);
        //添加主角
        _this.addHero=new AddHero();
        backLayer.addChild(gameLayer);
    },
    backgroundRun:function () {
        var _this=game;
        _this.gameBgM.y-=STAGE_STEP;
        _this.gameBgM1.y-=STAGE_STEP;
        _this.gameBgM2.y-=STAGE_STEP;
        if(_this.gameBgM.y<-_this.gameBgM.getHeight()){
            _this.gameBgM.y =_this.gameBgM1.y;
            _this.gameBgM1.y=_this.gameBgM.y+_this.gameBgM.getHeight();
            _this.gameBgM2.y=_this.gameBgM.y+_this.gameBgM.getHeight()*2;
        }
        if(stageSpeed--<0){
            stageSpeed=100;
            _this.addStage();
        }
        for(var key in stageLayer.childList){
            var child=stageLayer.childList[key];
            child.y--;
            if(child.y<-h5_config.height){
                stageLayer.removeChild(child)
            }
        }
    },
    addStage:function () {
        var matage;
        var index = Math.ceil(Math.random()*2);
        if(index==1){
            matage=new Floor1();
        }else if(index==2){
            matage=new Floor2();
        }else if(index==3){
            matage=new Floor3();
        }
        matage.y=480;
        matage.x=Math.random()*280;
        stageLayer.addChild(matage);
    }
};