/*
 * A queue that receives a function that must return a promise.
 * It forces serial execution no matter if the function is sync or async.
 */
export default class MessageQueue {
  constructor(proc) {
    this.proc = proc;
    this.messages = [];
    this.running = false;
  }
  submit(message) {
    if (this.running) {
      this.messages.push(message);
    } else {
      this.execute(message);
    }
  }
  execute(message) {
    this.running = true;
    this.proc(message).then(() => {
      this.running = false;
      if (!this.messages) {
        this.execute(this.messages.shift());
      }
    });
  }
}
