import { Record } from './types/Record';

type RecordType<T> = T extends Record<infer K> ? K : T;

export function mapRecord<T, F>(
  object: Record<T>,
  mapper: (value: T, key?: string) => F
): Record<F> {
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
