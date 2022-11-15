let sum,t1,t2;
onmessage= function(e){
  sum=0,t1=0,t2=0;
  t1=Date.now();
  for(let i=1;i<10000000;i++){
    sum+=1/(i*i)*Math.random();
  }
  t1=Date.now()-t1;
  postMessage({array:[t1*0.1,t2*0.1]});
  t2=Date.now(),sum='this is a string';
  for(let i=1;i<10000000;i++){
    sum=(sum+i%10).substr(1,16);
  }
  t2=Date.now()-t2;
  console.log(sum,t1*0.001+'s');
  postMessage({array:[t1*0.1,t2*0.1]});
}
