import { TestScheduler } from "rxjs/testing";
import test from "ava";
import { delay, map, merge, Observable } from "rxjs";

type Params = {
  onEvent$: Observable<unknown>;
  delayTime: number;
};

const createToggleFlagObservable = ({
  onEvent$,
  delayTime = 1000
}: Params) => {
  const enableFlag$ = onEvent$.pipe(map(() => true));
  const disableFlag$ = onEvent$.pipe(delay(delayTime)).pipe(map(() => false));
  const toggleFlag$ = merge(enableFlag$, disableFlag$);
  return toggleFlag$;
};

test("クリックした後にポップアップを表示し、2秒後にポップアップを非表示", (t) => {
  const scheduler = new TestScheduler(t.deepEqual.bind(t));
  scheduler.run(({ hot, expectObservable }) => {
    const onEvent$ = hot("a", { a: undefined });
    const toggleFlag$ = createToggleFlagObservable({
      onEvent$,
      delayTime: 2000
    });
    expectObservable(toggleFlag$).toBe("a 1999ms b", {
      a: true,
      b: false
    });
  });
});
