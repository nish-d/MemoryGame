var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MainScene_json : "res/MainScene.json",
    Target_jpg      :"assets/target.png"
};

var tiles=[
    "assets/tile_0.png",
    "assets/tile_1.png",
    "assets/tile_2.png",
    "assets/tile_3.png",
    "assets/tile_4.png",
    "assets/tile_5.png",
    "assets/tile_6.png",
    "assets/tile_7.png",

]

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
for( var i in tiles){
    g_resources.push(tiles[i]);
}

