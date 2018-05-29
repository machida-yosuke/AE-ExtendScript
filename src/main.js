import * as json from "./1000000.json"

const count = json["name_all"].length
let name_array = []

const compName = "staffroll"
const creComp = app.project.items.addComp(compName,1920,1080,1.0,600,60)


json["name_all"].forEach((item, index) =>{
  if (index % 10 == 0) {
    name_array.push(json["name_all"][index]["name"] + "\n")
  }
  name_array.push(json["name_all"][index]["name"])
})

creComp.layers.addText(name_array.join(""));

alert(name_array.join(""))
