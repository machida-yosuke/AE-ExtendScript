import * as json from "./10000.json"

const COMP_PROP = {
  'compWidth': 1920,
  'compHeight': 1080,
  'pixelAspect': 1.0,
  'compFps': 60,
  'compTime': 10 //秒
};

const TEXT_PROP = {
  'font': "Osaka",
  'size': 20,
  'lineHeight': 80,
  'color': [1, 1, 1]
};

// ここらへんはよくわからん
const offset = 17;

const count = 100;
let name_array = [];
let createCount = 0;

json["name_all"].forEach((item, index) =>{
  if (index % 10 == 0 && index != 0) {
    name_array.push(json["name_all"][index]["name"] + "\n")
  } else {
    name_array.push(json["name_all"][index]["name"])
  }

  if (index % count == 0 && index != 0) {
    createCount += 1;
    const compName = "staffroll" + createCount;
    const comp = app.project.items.addComp(
      compName,
      COMP_PROP.compWidth,
      COMP_PROP.compHeight,
      COMP_PROP.pixelAspect,
      COMP_PROP.compTime,
      COMP_PROP.compFps
    );

    const textLayer = comp.layers.addText(name_array.join("  "));
    var textLayer_TextProp = textLayer.property("Source Text");
    var textLayer_TextDocument = textLayer_TextProp.value;
    textLayer_TextDocument.resetCharStyle();
    textLayer_TextDocument.fillColor = TEXT_PROP.color;
    textLayer_TextDocument.font = TEXT_PROP.font;
    textLayer_TextDocument.leading = TEXT_PROP.lineHeight;
    textLayer_TextDocument.fontSize = TEXT_PROP.size;
    textLayer_TextProp.setValue(textLayer_TextDocument);

    const y =textLayer.sourceRectAtTime(0, false).height;
    textLayer('position').setValue([COMP_PROP.compWidth / 2, COMP_PROP.compHeight / 2]);
    textLayer('anchorPoint').setValue([0, y / 2]);

    textLayer('position').setValueAtTime(0, [COMP_PROP.compWidth / 2, COMP_PROP.compHeight + y / 2 + offset ])
    textLayer('position').setValueAtTime(COMP_PROP.compTime, [COMP_PROP.compWidth / 2, -y / 2 + offset])
    app.project.renderQueue.items.add(comp)
    name_array = []
  }
})

alert('owari');
