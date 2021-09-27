type Ok<O> = { tag: "Ok"; val: O };
type Err<E> = { tag: "Err"; err: E };
export type Result<O, E> = Ok<O> | Err<E>;

export function newErr<O, E>(err: E): Result<O, E> {
  const errInstance: Err<E> = { tag: "Err", err };
  return errInstance;
}

export function newOk<O, E>(val: O): Result<O, E> {
  const okInstance: Ok<O> = { tag: "Ok", val };
  return okInstance;
}

export function match<T, O, E>(
  input: Result<O, E>,
  ok: (ok: O) => T,
  err: (err: E) => T
): T {
  switch (input.tag) {
    case "Ok":
      return ok(input.val);
    case "Err":
      return err(input.err);
    default:
      throw new Error("Unreachable");
  }
}

export function isErr<O, E>(input: Result<O, E>): boolean {
  switch (input.tag) {
    case "Ok":
      return false;
    case "Err":
      return true;
    default:
      throw new Error("Unreachable");
  }
}

export function isOk<O, E>(input: Result<O, E>): boolean {
  return !isErr(input);
}
