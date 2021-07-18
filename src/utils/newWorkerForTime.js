//新开线程处理计时任务
const newWorkerForTime = (time = 60) => {
  const startTimeFile = `let time = ${time};
    const time60s = setInterval(() => {
       postMessage(--time);
       time === 0 && clearInterval(time60s);
    }, 1000);
   `;
  const file = new Blob([startTimeFile]);
  return new Worker(window.URL.createObjectURL(file));
};

export default newWorkerForTime;
