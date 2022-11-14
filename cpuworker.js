let sum=0,t1;
onmessage= function(e){
  t1=Date.now();
  for(let i=1;i<10000000;i++){
    sum+=1/(i*i)*Math.random();
  }
  t1=Date.now()-t1;
  console.log(sum,t1*0.001+'s');
  postMessage(t1*0.1);
}
