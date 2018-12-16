import { v4 } from 'uuid';

export const uuid = (): string => v4();

export const idName = (table: string) => {
  return `id${table.substring(0, 1).toUpperCase()}${table.substring(1)}`;
};
