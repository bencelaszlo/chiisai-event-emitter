import { EventEmitter } from '../src';

describe('eventEmitter', () => {
  it('should add callback to subscriptions if it has no subscriptions', () => {
    const testCallbackA = jest.fn();

    const eventEmitter = new EventEmitter();
    eventEmitter.subscribe('test-event', testCallbackA);

    expect(eventEmitter.subscriptions.has('test-event')).toEqual(true);
    expect(eventEmitter.subscriptions.get('test-event')).toEqual([
      { id: expect.any(Symbol), callback: testCallbackA },
    ]);
  });

  it('should add callback to subscriptions if it has subscriptions', () => {
    const testCallbackA = jest.fn();
    const testCallbackB = jest.fn();

    const eventEmitter = new EventEmitter();
    eventEmitter.subscribe('test-event', testCallbackA);
    eventEmitter.subscribe('test-event', testCallbackB);

    expect(eventEmitter.subscriptions.has('test-event')).toEqual(true);
    expect(eventEmitter.subscriptions.get('test-event')).toContainEqual({
      id: expect.any(Symbol),
      callback: testCallbackA,
    });
  });

  it('should add callback for another event to subscriptions', () => {
    const testCallbackA = jest.fn();
    const testCallbackB = jest.fn();

    const eventEmitter = new EventEmitter();
    eventEmitter.subscribe('test-event-a', testCallbackA);
    eventEmitter.subscribe('test-event-b', testCallbackB);

    expect(eventEmitter.subscriptions.has('test-event-a')).toEqual(true);
    expect(eventEmitter.subscriptions.get('test-event-a')).toContainEqual({
      id: expect.any(Symbol),
      callback: testCallbackA,
    });
    expect(eventEmitter.subscriptions.has('test-event-b')).toEqual(true);
    expect(eventEmitter.subscriptions.get('test-event-b')).toContainEqual({
      id: expect.any(Symbol),
      callback: testCallbackB,
    });
  });

  it('should call all subscriptions', () => {
    const testCallbackA = jest.fn();
    const testCallbackB = jest.fn();
    const mockEventArgs = { a: 'a' };

    const eventEmitter = new EventEmitter();
    eventEmitter.subscribe('test-event', testCallbackA);
    eventEmitter.subscribe('test-event', testCallbackB);
    eventEmitter.emit('test-event', mockEventArgs);

    expect(testCallbackA).toHaveBeenCalled();
    expect(testCallbackA).toHaveBeenCalledWith(mockEventArgs);
    expect(testCallbackB).toHaveBeenCalled();
    expect(testCallbackB).toHaveBeenCalledWith(mockEventArgs);
  });

  it('should not call unsubscribed callbacks', () => {
    const testCallbackA = jest.fn();
    const testCallbackB = jest.fn();
    const mockEventArgs = { a: 'a' };

    const eventEmitter = new EventEmitter();
    const { unsubscribe: unsubscribeCallbackA } = eventEmitter.subscribe(
      'test-event',
      testCallbackA
    );
    eventEmitter.subscribe('test-event', testCallbackB);
    unsubscribeCallbackA();
    eventEmitter.emit('test-event', mockEventArgs);

    expect(testCallbackA).not.toHaveBeenCalled();
    expect(testCallbackB).toHaveBeenCalled();
    expect(testCallbackB).toHaveBeenCalledWith(mockEventArgs);
  });
});
