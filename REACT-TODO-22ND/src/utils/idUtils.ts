import { v4 as uuidv4 } from 'uuid';

// UUID 생성
export const generateId = (): string => {
  return uuidv4();
};