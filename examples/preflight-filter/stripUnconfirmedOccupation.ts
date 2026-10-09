export interface Occupation {
  confirmed?: boolean;
  [key: string]: unknown;
}

export interface PreflightInput {
  occupation?: Occupation;
  [key: string]: unknown;
}

/**
 * Returns a shallow copy of `input`.
 * Removes `occupation` unless `occupation.confirmed === true`.
 * Does not mutate `input`.
 */
export function stripUnconfirmedOccupation<T extends PreflightInput>(input: T): T {
  const next: T = { ...input };
  if (next.occupation?.confirmed !== true) {
    delete next.occupation;
  }
  return next;
}
