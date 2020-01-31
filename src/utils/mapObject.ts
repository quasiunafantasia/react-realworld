import { Dictionary } from './types/Dictionary';

type RecordType<T> = T extends Dictionary<infer K> ? K : T;

export function mapRecord<T, F>(
  object: Dictionary<T>,
  mapper: (value: T, key?: string) => F
): Dictionary<F> {
  return Object.entries(object)
    .map(([key, value]) => [key, mapper(value, key)] as [string, F])
    .reduce(
      (prev, [key, value]) => ({
        ...prev,
        [key]: value
      }),
      {}
    );
}
