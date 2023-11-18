// Handle incoming messages from the main thread
self.onmessage = function (event) {
  const message = event.data;

  // Process each message received from the main thread
  console.log("Received message in worker:", message);

  self.postMessage("Processed messages in the worker");
};
