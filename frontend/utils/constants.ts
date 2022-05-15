import { Status } from 'types/status';

export const STATUS_LIST = ['TODO', 'DOING', 'IN_REVIEW', 'DONE'];

export const STATUS_CONFIG: {
  [key in Status]: {
    name: string;
    color: 'neutral' | 'orange' | 'purple' | 'green';
  };
} = {
  TODO: {
    name: 'Todo',
    color: 'neutral',
  },
  DOING: {
    name: 'Doing',
    color: 'orange',
  },
  IN_REVIEW: {
    name: 'In review',
    color: 'purple',
  },
  DONE: {
    name: 'Done',
    color: 'green',
  },
};
