// biome-ignore lint/suspicious/noExplicitAny: intentional
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
					.filter(({ id: subscriptionId }) => subscriptionId !== id),
			);
	}

	/**
	 * @param {string} eventName
	 * @param {Array<any>} args
	 * @returns void
	 */
	// biome-ignore lint/suspicious/noExplicitAny: intentional
	emit(eventName: string, ...args: Array<any>): void {
		for (const { callback } of this.subscriptions.get(eventName)) {
			callback(...args);
		}
	}
	/**
	 *
	 * @param eventName eventName to be deleted
	 * @returns void
	 */
	clear(eventName: string): void {
		this.subscriptions = new Subscriptions(
			[...this.subscriptions].filter(([key]) => key !== eventName),
		);
	}
}
