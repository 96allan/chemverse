// eventBus.js - Stateless Message Broker
const EventBus = {
  emit(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    window.dispatchEvent(event);
  },
  on(eventName, callback) {
    window.addEventListener(eventName, (e) => callback(e.detail));
  },
  off(eventName, callback) {
    window.removeEventListener(eventName, callback);
  }
};
export default EventBus;