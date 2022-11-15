let sum=0,t1,t2;
onmessage= function(e){
  t1=Date.now();
  for(let i=1;i<10000000;i++){
    sum+=1/(i*i)*Math.random();
  }
  t1=Date.now()-t1;
  t2=Date.now();
  for(let i=1;i<10000000;i++){
    sum+=1/(i*i)*Math.sin(i);
  }
  t2=Date.now()-t2;
  console.log(sum,t1*0.001+'s');
  postMessage({array:[t1*0.1,t2*0.1]});
}
