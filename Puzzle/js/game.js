/**
 * Created by Administrator on 2018/1/4 0004.
 */
var GameOne=function () {
    this.isGameOver = false;//游戏是否结束
    this.startTime=null;//游戏开始时间
    this.times=0;//游戏时间
    this.steps=0;//游戏步数
    this.blockList=[];//拆分后的拼图信息
    this.setStart();
};
GameOne.prototype={
    setStart:function () {
        var _this=this;
      startLayer=new LSprite();
      //显示游戏标题
      var title=new LTextField();
      title.x=(h5_config.width-120)/2;
      title.y=h5_config.height/4;
      title.size=30;
      title.color="#fff";
      title.text="拼图游戏";
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
        backLayer.removeChild(startLayer);
        this.startTime=new Date().getTime();
        gameLayer=new LSprite();
        //初始化拼图图片
        for (var i = 0; i < 9; i++) {
          /** 根据序号计算拼图块图片显示位置 */
           var y = (i / 3) >>> 0, x = i % 3;
           this.blockList.push(new Block(i,x,y));
        }
        //打乱拼图
        this.getRandomBlockList();
        //显示拼图
        this.showBlock();
        //显示时间
        this.addTimeTxt();
        //显示步数 
        this.addStepsTxt();
    },
    getRandomBlockList:function () {
        var blockList=this.blockList;
        /** 随机打乱拼图 */
        blockList.sort(function () {
            return 0.5 - Math.random();
        });
        /** 计算逆序和 */
        var reverseAmount = 0;
        for (var i = 0, l = blockList.length; i < l; i++) {
            var currentBlock = blockList[i];
            for (var j = i + 1; j < l; j++) {
                var comparedBlock = blockList[j];
                if (comparedBlock.index < currentBlock.index) {
                    reverseAmount++;
                }
            }
        }
        //此类游戏能否还原关键是看它打乱后的逆序次数之和是否为偶数
        /** 检测打乱后是否可还原 */
        if (reverseAmount % 2 != 0) {
            /** 不合格，重新打乱 */
            this.getRandomBlockList();
        }
    },
    showBlock:function () {
        var _this=this;
        for (var i = 0, l = this.blockList.length; i < l; i++) {
            var b = this.blockList[i];
            /** 根据序号计算拼图块位置 */
            var y = (i / 3) >>> 0, x = i % 3;
            b.setLocation(x, y);
            gameLayer.addChild(b);

        }
        backLayer.addChild(gameLayer);
    },
    addTimeTxt:function () {
        var _this=this;
        var timeTxt=new LTextField();
        timeTxt.x=h5_config.width/3;
        timeTxt.y=h5_config.width+(h5_config.height-h5_config.width)/3;
        timeTxt.size="18";
        timeTxt.color="#ccc";
        timeTxt.text="时间：00:00";
        gameLayer.addChild(timeTxt);
        setInterval(function () {
            var nowTime=new Date().getTime();
            _this.setTimes(nowTime-_this.startTime);
            timeTxt.text="时间："+_this.times+"";
        },1000);
    },
    setTimes:function (times) {
        var time=(Math.ceil(times/1000));
        var fen=Math.ceil(time/60)-1;
        var second=time%60;
        if(fen<10){fen="0"+fen+""}
        if(second<10){second="0"+second+""}
        this.times=fen+":"+second;
    },
    addStepsTxt:function () {
        var _this=this;
        this.stepsTxt=new LTextField();
        this.stepsTxt.x=h5_config.width/3;
        this.stepsTxt.y=h5_config.width+(h5_config.height-h5_config.width)/3+23;
        this.stepsTxt.size="18";
        this.stepsTxt.color="#ccc";
        this.stepsTxt.text="步数："+_this.steps+"";
        gameLayer.addChild(_this.stepsTxt);
    },
    updateStepsTxt:function () {
        this.stepsTxt.text="步数："+this.steps+"";
    },
    gameOver:function () {
        var _this=this;
        //添加最后一块
        var bmpd = imglist.clone();
        bmpd.setProperties(2 * h5_config.width/3, 2 * h5_config.width/3, h5_config.width/3-2, h5_config.width/3-2);
        var bmp = new LBitmap(bmpd);
        bmp.x=2 * h5_config.width/3+2;
        bmp.y=2 * h5_config.width/3+2;
        gameLayer.addChild(bmp);
        setTimeout(function () {
            console.log("游戏结束");
            backLayer.removeChild(gameLayer);
            gameOverLayer=new LSprite();
            var title=new LTextField();
            title.x=(h5_config.width-160)/2;
            title.y=h5_config.height/4-100;
            title.size=40;
            title.color="#fff";
            title.text="游戏结束";
            gameOverLayer.addChild(title);
            _this.showThumbnail();
            //时间和度数
            var title1=new LTextField();
            title1.x=(h5_config.width-200)/2;
            title1.y=h5_config.height-100;
            title1.size=20;
            title1.color="#fff";
            title1.text="用时:"+_this.times+" 步数："+_this.steps+"";
            gameOverLayer.addChild(title1);
            backLayer.addChild(gameOverLayer);
        },1000);
    },
    showThumbnail:function () {
        //显示完整图
        var thumbnail = new LBitmap(imglist);
        thumbnail.scaleX = h5_config.width/thumbnail.width*thumbnail.width*0.8;
        thumbnail.scaleY = h5_config.width/thumbnail.width*thumbnail.width*0.8;
        thumbnail.x = (h5_config.width - h5_config.width/thumbnail.width*thumbnail.width*0.8)/2;
        thumbnail.y = h5_config.height/4-40;
        gameOverLayer.addChild(thumbnail);
    }
};