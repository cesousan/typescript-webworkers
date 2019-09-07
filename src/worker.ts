

/// <reference lib ="webworker" />



onmessage = function(e) {
  console.log('Worker: Message received from main script');
  postMessage(e + ' ALL THE THINGS', null);
} 