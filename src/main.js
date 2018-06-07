import * as json from "./1000.json"

preferences.rulerUnits = Units.PIXELS;
doc = documents.add(1280, 720);


layers = doc.artLayers;
layer1 = layers.add();
layer1.kind = LayerKind.TEXT;
layer1.textItem.contents = "テキストファイルから読み込んだ文字列";

layer1.textItem.size = 40;
layer1.textItem.font = "Osaka";
layer1.textItem.justification = Justification.CENTER;
layer1.textItem.color.rgb.red = 255;
layer1.textItem.color.rgb.green = 255;
layer1.textItem.color.rgb.blue = 255;
layer1.textItem.horizontalScale = 90;


function translateLayerInCenter () {
	var targetLayer = layer1;
	var targetLayerBounds = targetLayer.bounds;
	var targetLayerX = parseInt(targetLayerBounds[0]);
	var targetLayerY = parseInt(targetLayerBounds[1]);
	var targetLayerWidth = Math.abs( parseInt(targetLayerBounds[0]) - parseInt(targetLayerBounds[2]) );
	var targetLayerHeight = Math.abs( parseInt(targetLayerBounds[1]) - parseInt(targetLayerBounds[3]) );
	var canvasWidth = activeDocument.width;
	var canvasHeight = activeDocument.height;
	var distanceX = ( canvasWidth - targetLayerWidth ) / 2;
	var distanceY = ( canvasHeight - targetLayerHeight ) / 2;
	targetLayer.translate( targetLayerX * -1, targetLayerY * -1 );
	targetLayer.translate( distanceX, distanceY );
}

translateLayerInCenter();

docObj = activeDocument;
docObj.activeLayer = docObj.layers["背景"];
docObj.activeLayer.remove();

// fileObj = new File("~/Desktop/test.png");
// pngOpt = new PNGSaveOptions();
// pngOpt.interlaced = false;
// activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);
// activeDocument.close(SaveOptions.DONOTSAVECHANGES);

alert("owari");
