import { delay, map, merge, Observable } from "rxjs";

type Params = {
  onEvent$: Observable<unknown>;
  delayTime: number;
};

export const createToggleFlagObservable = ({
  onEvent$,
  delayTime = 1000
}: Params) => {
  const enableFlag$ = onEvent$.pipe(map(() => true));
  const disableFlag$ = onEvent$.pipe(delay(delayTime)).pipe(map(() => false));
  const toggleFlag$ = merge(enableFlag$, disableFlag$);
  return toggleFlag$;
};
