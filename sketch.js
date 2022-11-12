let result,cores
function setup() {
  createCanvas(400, 400);
  cores=window.navigator.hardwareConcurrency;
  console.log()
  let workerList = [];
result=[]
for (let i = 0; i < cores; i++) {
  let newWorker = new Worker('cpuworker.js')
  newWorker.onmessage = function(e) {
    result.push(e.data);
  }
  workerList.push(newWorker);
}
}

function draw(){
  background(220);
  //text('总时间:'+sumof(result)*0.001,10,30);
  text('相当于'+300/sumof(result)*cores*cores/16+'个i3-9100f',10,30);
  for(let i=0;i<result.length;i++){
    text('core'+i,10,65+30*i);
    rect(50, 50+30*i, result[i],20);
  }
}
function sumof(arr){
  let sum=0;
  for(let i=0;i<arr.length;i++){
    sum+=arr[i];
  }
  return sum;
}