import * as json from "./1000.json"

const count = 300; // 最大文字名前数
let name_array = [];
let createCount = 0;
const size = 10; //文字の大きさ
const line = 15; //改行のタイミング
const len = json["name_all"].length - 1;

json["name_all"].forEach((item, index) =>{
  if (index % line == 0 && index != 0) {
    name_array.push(json["name_all"][index]["name"] + "\r")
  } else {
    name_array.push(json["name_all"][index]["name"])
  }
  if (index % count == 0 && index != 0 || index == len) {
    createCount += 1;
    const docName = "staffroll" + createCount;

    preferences.rulerUnits = Units.PIXELS;
    const doc = documents.add(1280, 720);
    const layers = doc.artLayers;
    const layer1 = layers.add();
    layer1.kind = LayerKind.TEXT;
    layer1.textItem.contents = name_array.join("  ");

    layer1.textItem.size = size;
    layer1.textItem.font = "Osaka";
    layer1.textItem.justification = Justification.CENTER;
    layer1.textItem.color.rgb.red = 255;
    layer1.textItem.color.rgb.green = 0;
    layer1.textItem.color.rgb.blue = 0;
    layer1.textItem.useAutoLeading = false;
    layer1.textItem.leading = (activeDocument.height - size) / ((count / line) - 1);
    layer1.textItem.horizontalScale = 100;
    // alert((activeDocument.height - (size - size / 2) * line ) / (line))
    function translateLayerInCenter () {
    	const targetLayer = layer1;
    	const targetLayerBounds = targetLayer.bounds;
    	const targetLayerX = parseInt(targetLayerBounds[0]);
    	const targetLayerY = parseInt(targetLayerBounds[1]);
    	const targetLayerWidth = Math.abs( parseInt(targetLayerBounds[0]) - parseInt(targetLayerBounds[2]) );
    	const targetLayerHeight = Math.abs( parseInt(targetLayerBounds[1]) - parseInt(targetLayerBounds[3]) );
    	const canvasWidth = activeDocument.width;
    	const canvasHeight = index == len ? targetLayerHeight : activeDocument.height;
    	const distanceX = ( canvasWidth - targetLayerWidth ) / 2;
    	const distanceY = ( canvasHeight - targetLayerHeight ) / 2;
    	targetLayer.translate( targetLayerX * -1, targetLayerY * -1 );
    	targetLayer.translate( distanceX, distanceY );
    }

    translateLayerInCenter();
    const docObj = activeDocument;
    docObj.activeLayer = docObj.layers["背景"];
    docObj.activeLayer.remove();

    const fileObj = new File("~/Desktop/amuro/nameImg/" + docName + ".png");
    const pngOpt = new PNGSaveOptions();
    pngOpt.interlaced = false;
    activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);
    activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    name_array = [];
  }
})
alert("owari");
