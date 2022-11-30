import Events from "events";

const eventEmitter = new Events();
eventEmitter.setMaxListeners(10);

export default eventEmitter;
