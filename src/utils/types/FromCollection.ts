export type FromCollection<T> = T extends (infer K)[] ? K : never;
