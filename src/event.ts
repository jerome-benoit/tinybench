import type Task from './task';
import type { BenchEvents } from './types';

function createBenchEvent(eventType: BenchEvents, target?: Task) {
  const event = new Event(eventType);
  if (target) {
    Object.defineProperty(event, 'task', {
      value: target,
      enumerable: true,
      writable: false,
      configurable: false,
    });
  }
  return event;
}

// eslint-disable-next-line import/prefer-default-export
export { createBenchEvent };
