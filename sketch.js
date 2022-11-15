let result=[],cores=navigator.hardwareConcurrency,workerList = [],size=12;
if(!cores)
  cores=4;
function setup() {
  createCanvas(400, 400);
  colorMode(HSB)
  stroke(80)
  frameRate(10)
}
for (let i = 0; i < cores; i++) {
  let newWorker = new Worker('cpuworker.js')
  newWorker.onmessage = function(e) {
    console.log(e)
    result[i]=(e.data.array);
  }
  workerList.push(newWorker);
}
restart();
function draw(){
  textSize(size);
  background(90);
  //text('总时间:'+sumof(result)*0.001,10,30);
  fill(0);
  text(cores+'核心'+' 相当于'+(46.7/sumof(result)*cores*cores/16).toFixed(5)+'个iPhone 8',10,2.5*size);
  fill(100);
  rect(5, 3*size, 0.95*width,0.9*height);
  for(let i=0;i<result.length;i++){//条形图
    let a=result[i][0],b=result[i][1];
    fill(0)
    text('core'+i,10,5*size+2.5*size*i);
    text((a*0.01).toFixed(3)+'s',5*size+a,5*size+2.5*size*i);
    text((b*0.01).toFixed(3)+'s',5*size+b,6*size+2.5*size*i);
    //console.log(result[i])
    fill(150-a, 204, 255);
    rect(4.5*size, 4*size+2.5*size*i, a,1*size);

    fill(150-b, 204, 255);
    rect(4.5*size, 5*size+2.5*size*i, b,1*size);

  }
  if(4*size+2.5*size*cores>height-20)
    size*=0.99;
}
function sumof(arr){
  let sum=0;
  for(let i=0;i<arr.length;i++){
    sum+=arr[i][0];
  }
  return sum;
}
function restart(){
  result=[]
  console.log('restart!')
  for (let i = 0; i < cores; i++) {
  workerList[i].postMessage('restart')
}
}
