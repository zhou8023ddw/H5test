/**
 * Created by 周乐杰 on 2018/1/4.
 */
//切割图片
var Block=function (i,x,y) {
    this.Width=h5_config.width/3;
    var Width=this.Width;
    var width=imglist.width/3;
    LExtends(this, LSprite, []);
    if(i<8){
        var bmpd = imglist.clone();
        bmpd.setProperties(x * width, y * width, width, width);
        this.bmp = new LBitmap(bmpd);
        this.bmp.scaleX=Width/width;
        this.bmp.scaleY=Width/width;
        this.addChild(this.bmp);
    }
    var border = new LShape();
    border.graphics.drawRect(2, "#CCCCCC", [0, 0, Width, Width]);
    this.addChild(border);
    this.index = i;
    this.addEventListener(LMouseEvent.MOUSE_UP, this.onClick);
};
Block.prototype={
    setLocation:function (x, y) {
        //定位
        this.locationX = x;
        this.locationY = y;
        this.x = x * this.Width;
        this.y = y * this.Width;
    },
    onClick:function (e) {
        var self = e.currentTarget;
        var checkList=[];
        /** 判断右侧是否有方块 */
        if (self.locationX > 0) {
            checkList.push(Block.prototype.getBlock(self.locationX - 1, self.locationY));
        }
        /** 判断左侧是否有方块 */
        if (self.locationX < 2) {
            checkList.push(Block.prototype.getBlock(self.locationX + 1, self.locationY));
        }
        /** 判断上方是否有方块 */
        if (self.locationY > 0) {
            checkList.push(Block.prototype.getBlock(self.locationX, self.locationY - 1));
        }
        /** 判断下方是否有方块 */
        if (self.locationY < 2) {
            checkList.push(Block.prototype.getBlock(self.locationX, self.locationY + 1));
        }
        for(var i=0;i<checkList.length;i++){
            var check0=checkList[i];
            //判断是否是空白拼图块
            if(check0.index==8){
                game.steps++;
                game.updateStepsTxt();
                Block.prototype.exchangePosition(self,check0);
            }
        }
    },
    getBlock:function (x,y) {
        return game.blockList[y * 3 + x];
    },
    exchangePosition:function (b1,b2) {
        var b1x = b1.locationX, b1y = b1.locationY,
            b2x = b2.locationX, b2y = b2.locationY,
            b1Index = b1y * 3 + b1x,
            b2Index = b2y * 3 + b2x;
        /** 在地图块数组中交换两者位置 */
        game.blockList.splice(b1Index, 1, b2);
        game.blockList.splice(b2Index, 1, b1);
        /** 交换两者显示位置 */
        b1.setLocation(b2x, b2y);
        b2.setLocation(b1x, b1y);

        /** 判断游戏是否结束 */
        Block.prototype.isGameOver();
    },
    isGameOver:function () {
        var reductionAmount = 0, l = game.blockList.length;
        /** 计算还原度 */
        for (var i = 0; i < l; i++) {
            var b = game.blockList[i];
            if (b.index == i) {
                reductionAmount++;
            }
        }

        /** 计算是否完全还原 */
        if (reductionAmount == l) {
            /** 游戏结束 */
            game.gameOver();
        }
    }
};