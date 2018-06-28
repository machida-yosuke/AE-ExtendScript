// import * as json from "./10000.json"
import * as json from "./15890.json"
// 秒
// const timelineSecond = 13560
const timelineSecond = 219

// １コンポ何人の名前を入れるか
// const maxName = 10000000
// const putName = 10000;

const maxName = 15890
const putName = 15890;

const createCompNum = maxName / putName

const COMP_PROP = {
  'compWidth': 1920,
  'compHeight': 1080,
  'pixelAspect': 1.0,
  'compFps': 60,
  'compTime': timelineSecond / createCompNum //秒
};

const oneFrame = 1 / COMP_PROP.compFps

const TEXT_PROP = {
  'font': "Osaka",
  'size': 20,
  'lineHeight': 60,
  'color': [1, 1, 1]
};

// ここらへんはよくわからん ズレ修正
const offset = 33;

const len =json["name_all"].length
alert(len)


// １行何人入れるか
const line = 15;

let name_array = [];
let createCount = 0;

json["name_all"].forEach((item, index) =>{
  if (index % line == 0 && index != 0) {
    name_array.push(json["name_all"][index]["name"] + "\n")
  } else {
    name_array.push(json["name_all"][index]["name"] + " / ")
  }
  if (index % putName == 0 && index != 0 || index == len - 1) {
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

    const textLayer = comp.layers.addText(name_array.join(""));
    var textLayer_TextProp = textLayer.property("Source Text");
    var textLayer_TextDocument = textLayer_TextProp.value;
    textLayer_TextDocument.resetCharStyle();
    textLayer_TextDocument.fillColor = TEXT_PROP.color;
    textLayer_TextDocument.font = TEXT_PROP.font;
    textLayer_TextDocument.leading = TEXT_PROP.lineHeight;
    textLayer_TextDocument.fontSize = TEXT_PROP.size;
    textLayer_TextProp.setValue(textLayer_TextDocument);

    const y = textLayer.sourceRectAtTime(0, false).height - offset;

    // const kyori = y + COMP_PROP.compHeight + TEXT_PROP.lineHeight - TEXT_PROP.size
    // const zikan = COMP_PROP.compTime *  COMP_PROP.compFps
    // const hayasa = kyori / zikan
    // const diff = COMP_PROP.compHeight / hayasa
    // const diffToSecond = diff / 60

    // comp.duration = COMP_PROP.compTime + diffToSecond
    // textLayer.outPoint = comp.duration

    textLayer('position').setValue([COMP_PROP.compWidth / 2, COMP_PROP.compHeight / 2]);
    textLayer('anchorPoint').setValue([0, y / 2]);

    textLayer('position').setValueAtTime(0, [COMP_PROP.compWidth / 2, COMP_PROP.compHeight + y / 2 + offset / 2])
    textLayer('position').setValueAtTime(COMP_PROP.compTime, [COMP_PROP.compWidth / 2, -y / 2 - offset / 2])
    // textLayer('position').setValueAtTime(COMP_PROP.compTime + diffToSecond - oneFrame, [COMP_PROP.compWidth / 2, -y / 2 - offset / 2])
    app.project.renderQueue.items.add(comp)
    name_array = []
  }
})

alert('owari');
