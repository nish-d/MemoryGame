
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var mainscene = ccs.load(res.MainScene_json);
        this.addChild(mainscene.node);

        /* you can create scene with following comment code instead of using csb file.
        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        */

        return true;
    }
});
var gameArray = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];
var pickedTiles=[];
var ScoreText;
var moves=0;
var shuffle = function(v)
{
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i),  x = v[--i], v[i] = v[j], v[j] = x);
    return v;
}
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
       // var layer = new HelloWorldLayer()
        // this.addChild(layer);
        gameArray=shuffle(gameArray);
        gameLayer=new game();
        gameLayer.init();
        this.addChild(gameLayer);
        console.log("Hello!! ");
    }
});
var game=cc.Layer.extend({
    init:function () {
        this._super();
        /*backgroundLayer = cc.LayerColor.create(new cc.Color(40,40,40,255), cc.winSize.width, cc.winSize.height);
        this.addChild(backgroundLayer);
        var target=cc.Sprite.create("assets/target.jpg");
        target.setPosition(cc.winSize.width/2,cc.winSize.height/2);
        backgroundLayer.addChild(target,0);
        setTimeout(function(){    backgroundLayer.removeChild(target);    }, 3000);*/
        var gradient = new cc.LayerGradient(cc.color(0,0,0,255), cc.color(0x46,0x82,0xB4,255));
        this.addChild(gradient);
        scoreText = cc.LabelTTF.create("Moves: 0","Arial","32",cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(scoreText);
        scoreText.setPosition(cc.winSize.width-70,100);

        for(i=0;i<16;i++){
           // var tile = new cc.Sprite("assets/target.png");
            var tile= new MemoryTile();
            tile.attr({
                x: cc.winSize.width/4-20,
                y: cc.winSize.height/4-20
            });
            tile.pictureValue=gameArray[i];
            this.addChild(tile,0);
            tile.setPosition(170+i%4*175,550-Math.floor(i/4)*165);
        }
    }
});
var MemoryTile = cc.Sprite.extend({
    ctor:function() {
        this._super();
        this.initWithFile("assets/target.png");
        cc.eventManager.addListener(listener.clone(), this);
    }
});
var listener = cc.EventListener.create({
    event: cc.EventListener.TOUCH_ONE_BY_ONE,
    swallowTouches: true,
    onTouchBegan: function (touch, event) {
        if(pickedTiles.length<2) {
            var target = event.getCurrentTarget();//returns current click target
            /*touch.getLocation method, you will have the coordinates of the touch or click
             inside the game, while the convertToNodeSpace method will
             convert such coordinates into the coordinates relative to the
             tile itself. This way, the location variable will contain the coordinates
             of the touch or click that is relative to the tile:
             */
            var location = target.convertToNodeSpace(touch.getLocation());
            var targetSize = target.getContentSize();
            var targetRectangle = cc.rect(0, 0, targetSize.width, targetSize.height);      //maps the width and height into a rectangle
            if (cc.rectContainsPoint(targetRectangle, location)) {
                console.log("I picked a tile!!");
                if(pickedTiles.indexOf(target)==-1){
                    target.initWithFile("assets/tile_"+target.pictureValue+".png");
                    pickedTiles.push(target);
                    if(pickedTiles.length==2){
                        checkTiles();
                    }
                }
            }
        }
    }
});
function checkTiles(){
        moves++;
        scoreText.setString("Moves: " + moves);
        var pause = setTimeout(function(){
            if(pickedTiles[0].pictureValue!=pickedTiles[1].pictureValue){
            pickedTiles[0].initWithFile("assets/target.png");
            pickedTiles[1].initWithFile("assets/target.png");
        }
        else{
            gameLayer.removeChild(pickedTiles[0]);
            gameLayer.removeChild(pickedTiles[1]);
        }      pickedTiles = [];    },1000);

}