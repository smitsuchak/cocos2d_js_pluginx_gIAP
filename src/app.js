/*
 *  Developer Name : Smit Suchak
 *  Description : Google IAP plugin using cocos2d-JS via plugin-x 
 *  Email: smitsuchak@gmail.com
 */


var s_googleAPIKEY ={"GooglePlayAppKey":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoNqngCji4zWeXNe2HrsBBXW0pW5u1wD6ss8qvdV6eu6SXLkfNfBcuGIYkytstJZECfVJBMXc81cChcPUE+B252OK8dw0c0o5cmBSJKD6C4mQ3k7WrP78U3BZXRH+0QnUsZ9eBDMEaV3mKHEIOZqSQtnYBZIz/p5qLGb0HUBEt+PFnkvMdyhD5Pas1IRoMJZp8MI1tlEkBaigiw7rE6sAfr0VEkiSsYnQJjGV29vg1Gk4v354IGtWyCH29hGiYR1Ozo7Mid4OHuJ5dvVX0AHQ/19pR1WW0LIsAQqSLAMmQKxFwpKpta9hmnSateKALw/W9IxG7q6YNgqNZCBNoW2qcQIDAQAB"}
;
var g_pIAP = null;

if (!plugin) {
	var plugin = {};
}
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    IAPtext:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        
        if(plugin){
        	cc.log("Pluginis not null")
        }
        var pluginManager = plugin.PluginManager.getInstance();
        if(pluginManager){
        	cc.log("Plugin manager is not null");
        }

        
        g_pIAP = pluginManager.loadPlugin("IAPGooglePlay");

        if(g_pIAP===null){
        	cc.log("Android g_pIAP is null");
        }
        g_pIAP.configDeveloperInfo(s_googleAPIKEY);
        g_pIAP.setListener(this);
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        
        
        this.IAPtext = new cc.LabelTTF("Press Test IAP...", "Arial", 15);
        // position the label on the center of the screen
        this.IAPtext.setAnchorPoint(cc.p(0.5, 0));
        this.IAPtext.x = size.width / 2;
        this.IAPtext.y = 400;
        // add the label as a child to this layer
        this.addChild(this.IAPtext, 5);

        // add a "close" icon to exit the progress. it's an autorelease object
        var testIAP = new cc.MenuItemImage(
            "res/TestIAP.png",
            "res/TestIAP.png",
            function () {
                cc.log("Menu is clicked!");
                this.IAPtext.setString("Processing...");
                var prod ={"IAPId":"com_smit_test",
                		"IAPSecKey":""};
                g_pIAP.payForProduct(prod);
            }, this);
        testIAP.attr({
            x: size.width/2,
            y: 500,
            anchorX: 0.5,
            anchorY: 0
        });
        
        var closeItem = new cc.MenuItemImage(
        		res.CloseNormal_png,
        		res.CloseSelected_png,
        		function () {
        			cc.director.end();
        		}, this);
        closeItem.attr({
        	x: size.width/2,
        	y: 300,
        	anchorX: 0.5,
        	anchorY: 0
        });

        var menu = new cc.Menu(testIAP,closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Cocos2d-JS v3.2 Google IAP Test", "Arial", 25);
        helloLabel.setAnchorPoint(0.5, 0);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 700  ;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

      
        return true;
    },

onPayResult: function (ret, msg, productInfo) {
	cc.log("onPayResult ret is " + ret);
	var str = "";
	if (ret == 0){//plugin.ProtocolIAP.PayResultCode.PaySuccess) {
		str = "payment Success pid is " + productInfo.productId;
		
	} else if (ret == 1){//plugin.ProtocolIAP.PayResultCode.PayFail) {
		str = "payment fail";
	}
	cc.log("onPayResult" + str +"msg:" +JSON.stringify(msg) + "prod:"+JSON.stringify(productInfo));
	this.IAPtext.setString(JSON.stringify(msg));
}

});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

