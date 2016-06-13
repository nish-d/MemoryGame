
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

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
       // var layer = new HelloWorldLayer()
        // this.addChild(layer);
        var gameLayer=new game();
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
        for(i=0;i<16;i++){
           // var tile = new cc.Sprite("assets/target.png");
            var tile= new MemoryTile();
            tile.attr({
                x: cc.winSize.width/4-20,
                y: cc.winSize.height/4-20
            });
            this.addChild(tile,0);
            tile.setPosition(170+i%4*180,600-Math.floor(i/4)*170);
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
