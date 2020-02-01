import { Dictionary } from '../utils/types/Dictionary';

type Errors = Dictionary<string[]>;

export const formatErrors = (errors: Errors) =>
  Object.entries(errors)
    .map(([key, errors]) => errors.map(error => `${key} ${error}`))
    .reduce((prev, curr) => [...prev, ...curr], []);
