
import { test } from "@playwright/test";

export function step(name?: string) {
  return function <This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    const stepName =
      name ??
      context.name
        .toString()
        .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
        .toLowerCase()
        .replace(/^./, (char) => char.toUpperCase());

    return function (this: This, ...args: Args): Return {
      return test.step(stepName, async () => {
        return await target.apply(this, args);
      }) as Return;
    };
  };
}
