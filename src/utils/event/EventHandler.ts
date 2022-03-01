/**
 * 简易的事件发布、订阅、取消订阅
 * 支持热事件（能响应订阅之前发出的事件）
 * 尚有缺陷，但当下无影响：
 * 同名的事件后者会覆盖新的，也包括热事件
 *
 * @class EventHandler
 */
export default class EventHandler {
  private static collection = new Map<string, EventHandler>();
  // 单例模式
  static event(event: string) {
    let handler = this.collection.get(event);
    if (!handler) {
      handler = new EventHandler(event);
      this.collection.set(event, handler);
    }
    return handler;
  }
  private events: Map<string, Array<[() => void, string?]>> = new Map(); // 这是个冗余设计，map只会有一个key
  private event: string = '';
  private hotCache: Map<string, string[]> = new Map();
  constructor(event: string) {
    this.event = event;
    this.events.set(event, []);
  }

  subscribe(listener: () => void, config?: { hotKey: string }) {
    const events = this.events;
    const event = this.event;
    // 对该event增加listeners
    let listeners = events.get(event);
    if (!listeners) {
      events.set(event, [[listener!, config?.hotKey]]);
    } else {
      listeners.push([listener!, config?.hotKey]);
    }
    //如果是热事件，则寻找是否已经派发了事件
    if (config?.hotKey) {
      const called = this.hotCache.get(event);
      if (called && !called.find((item) => item === config.hotKey)) {
        listener.call(null);
        called.push(config.hotKey);
      }
    }
    const unsubscribe = () =>
      this.unsubscribe(event, listener!, config?.hotKey);
    return unsubscribe;
  }
  // 派发事件
  dispatch(config?: { hot: boolean }) {
    let event = this.event;
    let listeners = this.events.get(event);

    listeners?.forEach((item) => {
      item[0].call(null);
    });
    // 如果是热事件，则记录这次派发
    if (config?.hot) {
      this.hotCache.set(
        event,
        listeners?.map((item) => item[1]!).filter(Boolean) || [],
      );
    } else {
      this.hotCache.delete(event);
    }
  }
  // 取消订阅
  private unsubscribe(event: string, listener: () => void, hotKey?: string) {
    const events = this.events;
    let listeners = events.get(event);
    if (!listeners) {
      events.delete(event);
    } else {
      let index = listeners.findIndex((item) => {
        return item[0] === listener && item[1] === hotKey;
      });
      if (~index) {
        listeners.splice(index, 1);
      }
    }
  }
}
export const addUserEvent = EventHandler.event('addUser');
