







export function getWorker(url: string) {
  if ((<any>window).Worker) {
    const myWorker = new Worker(url);
    let callWorker = function() {
      myWorker.postMessage("ZOUBIDA");
    }

    myWorker.onmessage = function(e) {
      console.log("Received from worker: ", e.data);
    }

    callWorker();
  } else {
    console.log("your browser does\'nt support web workers")
  }
}