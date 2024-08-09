export type EventCallback<T = void> = (...args: Array<any>) => T;
export type Subscriptions = Map<
  string,
  Array<{ id: symbol; callback: EventCallback }>
>;
export type Unsubscribe = { unsubscribe: () => void };

export default class EventEmitter {
  subscriptions: Subscriptions;

  constructor() {
    this.subscriptions = new Map();
  }

  /**
   * @param {string} eventName
   * @param {EventCallback} callback
   * @return {Unsubscribe}
   */
  subscribe(eventName: string, callback: EventCallback): Unsubscribe {
    const id = Symbol(callback.toString());
    this.subscriptions.set(
      eventName,
      this.subscriptions.has(eventName)
        ? [...(this.subscriptions.get(eventName) || []), { id, callback }]
        : [{ id, callback }]
    );

    return {
      unsubscribe: () =>
        this.subscriptions.set(
          eventName,
          (this.subscriptions.get(eventName) || []).filter(
            ({ id: subscriptionId }) => subscriptionId !== id
          )
        ),
    };
  }

  /**
   * @param {string} eventName
   * @param {Array<any>} args
   */
  emit(eventName: string, ...args: Array<any>): void {
    (this.subscriptions.get(eventName) || []).forEach(({ callback }) =>
      callback(...args)
    );
  }
}
