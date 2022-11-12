let sum=0,t1=Date.now();
  for(let i=0;i<10000000;i++){
    sum=((365/i)*Math.random())
    sum=((365%i)/Math.random())
    sum=((365*i)+Math.random())
    sum=((365-i)-Math.random())
  }
  t1=Date.now()-t1;
  console.log(sum,t1*0.001+'s');
  postMessage(t1*0.1);