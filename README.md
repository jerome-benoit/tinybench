# Tinybench 🔎

[![CI](https://github.com/tinylibs/tinybench/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/tinylibs/tinybench/actions/workflows/test.yml)
[![NPM version](https://img.shields.io/npm/v/tinybench.svg?style=flat)](https://www.npmjs.com/package/tinybench)

Benchmark your code easily with Tinybench, a simple, tiny and light-weight `10KB` (`2KB` minified and gzipped) benchmarking library!
You can run your benchmarks in multiple JavaScript runtimes, Tinybench is completely based on the Web APIs with proper timing using
`process.hrtime` or `performance.now`.

- Accurate and precise timing based on the environment
- Statistically analyzed latency and throughput values: standard deviation, margin of error, variance, percentiles, etc.
- Concurrency support
- `Event` and `EventTarget` compatible events
- No dependencies

_In case you need more tiny libraries like tinypool or tinyspy, please consider submitting an [RFC](https://github.com/tinylibs/rfcs)_

## Installing

```shell
$ npm install -D tinybench
```

## Usage

You can start benchmarking by instantiating the `Bench` class and adding benchmark tasks to it.

```js
import { Bench } from 'tinybench'

const bench = new Bench({ name: 'simple benchmark', time: 100 })

bench
  .add('faster task', () => {
    console.log('I am faster')
  })
  .add('slower task', async () => {
    await new Promise(resolve => setTimeout(resolve, 1)) // we wait 1ms :)
    console.log('I am slower')
  })

await bench.run()

console.log(bench.name)
console.table(bench.table())

// Output:
// simple benchmark
// ┌─────────┬───────────────┬────────────────────────────┬───────────────────────────┬──────────────────────┬─────────────────────┬─────────┐
// │ (index) │ Task name     │ Throughput average (ops/s) │ Throughput median (ops/s) │ Latency average (ns) │ Latency median (ns) │ Samples │
// ├─────────┼───────────────┼────────────────────────────┼───────────────────────────┼──────────────────────┼─────────────────────┼─────────┤
// │ 0       │ 'faster task' │ '102906 ± 0.89%'           │ '82217 ± 14'              │ '11909.14 ± 3.95%'   │ '12163.00 ± 2.00'   │ 8398    │
// │ 1       │ 'slower task' │ '988 ± 26.26%'             │ '710'                     │ '1379560.47 ± 6.72%' │ '1408552.00'        │ 73      │
// └─────────┴───────────────┴────────────────────────────┴───────────────────────────┴──────────────────────┴─────────────────────┴─────────┘
```

The `add` method accepts a task name and a task function, so it can benchmark
it! This method returns a reference to the Bench instance, so it's possible to
use it to create an another task for that instance.

Note that the task name should always be unique in an instance, because Tinybench stores the tasks based
on their names in a `Map`.

Also note that `tinybench` does not log any result by default. You can extract the relevant stats
from `bench.tasks` or any other API after running the benchmark, and process them however you want.

More usage examples can be found in the [examples](./examples/) directory.

## Docs

### [`Bench`](./docs/classes/Bench.html)

### [`Task`](./docs/classes/Task.html)

### [`TaskResult`](./docs/interfaces/TaskResult.html)

### `Events`

Both the `Task` and `Bench` classes extend the `EventTarget` object. So you can attach listeners to different types of events in each class instance using the universal `addEventListener` and `removeEventListener` methods.

#### [`BenchEvents`](./docs/types/BenchEvents.html)

```js
// runs on each benchmark task's cycle
bench.addEventListener('cycle', (evt) => {
  const task = evt.task!;
});
```

#### [`TaskEvents`](./docs/types/TaskEvents.html)

```js
// runs only on this benchmark task's cycle
task.addEventListener('cycle', (evt) => {
  const task = evt.task!;
});
```

### [`BenchEvent`](./docs/types/BenchEvent.html)

## `process.hrtime`

if you want more accurate results for nodejs with `process.hrtime`, then import
the `hrtimeNow` function from the library and pass it to the `Bench` options.

```ts
import { hrtimeNow } from 'tinybench'
```

It may make your benchmarks slower, check [#42](https://github.com/tinylibs/tinybench/issues/42).

## Concurrency

- When `mode` is set to `null` (default), concurrency is disabled.
- When `mode` is set to 'task', each task's iterations (calls of a task function) run concurrently.
- When `mode` is set to 'bench', different tasks within the bench run concurrently. Concurrent cycles.

```ts
bench.threshold = 10 // The maximum number of concurrent tasks to run. Defaults to Number.POSITIVE_INFINITY.
bench.concurrency = 'task' // The concurrency mode to determine how tasks are run.
await bench.run()
```

## Prior art

- [Benchmark.js](https://github.com/bestiejs/benchmark.js)
- [mitata](https://github.com/evanwashere/mitata/)
- [tatami-ng](https://github.com/poolifier/tatami-ng)
- [Bema](https://github.com/prisma-labs/bema)

## Authors

| <a href="https://github.com/Aslemammad"> <img width='150' src="https://avatars.githubusercontent.com/u/37929992?v=4" /><br> Mohammad Bagher </a> |
| ------------------------------------------------------------------------------------------------------------------------------------------------ |

## Credits

| <a href="https://github.com/uzlopak"> <img width='150' src="https://avatars.githubusercontent.com/u/5059100?v=4" /><br> Uzlopak </a> | <a href="https://github.com/poyoho"> <img width='150' src="https://avatars.githubusercontent.com/u/36070057?v=4" /><br> poyoho </a> |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |

## Contributing

Feel free to create issues/discussions and then PRs for the project!

## Sponsors

Your sponsorship can make a huge difference in continuing our work in open source!

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/aslemammad/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/aslemammad/static/sponsors.svg'/>
  </a>
</p>
