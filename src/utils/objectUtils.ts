export type AnyObject = Record<string, any>;
export type AnyArray = unknown[];
export type AnyObjectOrArray = AnyObject | AnyArray;
export const isEmpty = (object: AnyObjectOrArray): boolean => !(object && Object.keys(object).length);
