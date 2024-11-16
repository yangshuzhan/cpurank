let result = []
  , cores = navigator.hardwareConcurrency
  , workerList = []
  , size = 20;
//console.log(navigator.hardwareConcurrency);
let bars = [];
for (let e = 0; e < cores; e++)
    bars.push([0, 0]);

fetch("convertcsv.json")
  .then(response => response.json())
  .then(json =>{
  let selectElement = document.getElementById('options');
for (var i = 0; i <= json.length; i++) {
  selectElement.add(new Option(json[i][0],json[i][1]));
}
}
       );

function setup() {
    let canvas=createCanvas(400,350);
  noStroke(),
    strokeWeight(0)
  resize()
}
cores = cores || 8;
for (let r = 0; r < cores; r++) {
    let e = new Worker("cpuworker.js");
    result[r] = [0, 0],
    e.onmessage = function(e) {
        result[r] = e.data.array,
        changeoption()
    }
    ,
    workerList.push(e)
}
function draw() {
    textSize(size),
    size = height/(4+2.5*cores);
    clear();
    for (let t = 0; t < result.length; t++) {
        let e = 0
          , r = 0;
        try {
            e = result[t][0],
            r = result[t][1]
        } catch (e) {}
        bars[t][0] = .5 * (bars[t][0] + e),
        bars[t][1] = .5 * (bars[t][1] + r),
        fill(0),
        text("core" + t, 10, 4 * size + 2.5 * size * t),
        text((.01 * e).toFixed(3) + "s", 5 * size + e, 4 * size + 2.5 * size * t),
        text((.01 * r).toFixed(3) + "s", 5 * size + r, 5 * size + 2.5 * size * t),
        fill(0, 255, 0),
        rect(4.5 * size, 3 * size + 2.5 * size * t, bars[t][0], size),
        fill(240, 240, 0),
        rect(4.5 * size, 4 * size + 2.5 * size * t, bars[t][1], size)
    }
    
}
function minof(r) {
    let t = 1 / 0;
    try {
        for (let e = 0; e < r.length; e++)
            t > r[e][0] && (t = r[e][0])
    } catch (e) {}
    return t
}
function restart() {
    result = [];
    //console.log("restart!");
    for (let e = 0; e < cores; e++)
        bars[e] = [0, 0],
        workerList[e].postMessage("restart")
}
restart();
function share() {
    var e = {
        title: "rankCPU",
        text: "Test your CPU speed!",
        url: "https://www.rankcpu.com"
    };
    navigator.canShare(e) ? navigator.share(e) : navigator.clipboard.writeText(e.url).then( () => {
        alert("successfully copied")
    }
    )
}
function changeoption(){
  let selectElement = document.getElementById('options');
  document.querySelector("#variable").text = (90*1033/selectElement.value/ minof(result)).toFixed(4)
}
onresize = resize;
screen.orientation.onchange = resize;
function resize(){
  width=max(windowWidth*0.5,400),height=windowHeight*0.5;
  if(windowWidth<windowHeight)
    width=max(windowWidth*0.95,400)
  resizeCanvas(width,height)
  let selectElement = document.getElementById('canvas');
  selectElement.style.width=width+'px';
  selectElement.style.height=height+50+'px';
  
  selectElement = document.getElementById('canvas2');
  selectElement.style.width=width-1+'px';
  selectElement.style.height=height+'px';
  
  selectElement = document.getElementById('button');
  selectElement.style.top=-height-20+'px';
  
  selectElement = document.getElementById('share');
  selectElement.style.bottom=-height-50+'px';
  
  selectElement = document.getElementById('label');
  selectElement.style.bottom=-height+50+'px';
}
navigator.getBattery().then((battery) => {
  if(battery.charging)
    document.querySelector("#charging").outerHTML = 'is charging'+'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#57AF4E"><path d="M320-80q-17 0-28.5-11.5T280-120v-640q0-17 11.5-28.5T320-800h80v-80h160v80h80q17 0 28.5 11.5T680-760v280q-100 1-170 70.5T440-240q0 46 16 87t45 73H320Zm40-560h240v-80H360v80ZM660-80v-120H560l140-200v120h100L660-80Z"/></svg>';
  else document.querySelector("#charging").textContent = 'not charging';
});
