export type EventCallback<T = void> = (...args: Array<any>) => T;

export class Subscriptions extends Map<
  string,
  Array<{ id: symbol; callback: EventCallback }>
> {
  get(key: string): { id: symbol; callback: EventCallback }[] {
    return super.get(key) || [];
  }
}

export type Unsubscribe = () => void;

export class EventEmitter {
  subscriptions: Subscriptions;

  constructor() {
    this.subscriptions = new Subscriptions();
  }

  /**
   * @param {string} eventName
   * @param {EventCallback} callback
   * @return {Unsubscribe}
   */
  subscribe(eventName: string, callback: EventCallback): Unsubscribe {
    const id = Symbol(callback.toString());
    this.subscriptions.set(eventName, [
      ...this.subscriptions.get(eventName),
      { id, callback },
    ]);

    return () =>
      this.subscriptions.set(
        eventName,
        this.subscriptions
          .get(eventName)
          .filter(({ id: subscriptionId }) => subscriptionId !== id)
      );
  }

  /**
   * @param {string} eventName
   * @param {Array<any>} args
   */
  emit(eventName: string, ...args: Array<any>): void {
    this.subscriptions
      .get(eventName)
      .forEach(({ callback }) => callback(...args));
  }
}
