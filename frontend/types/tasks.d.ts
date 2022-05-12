import 'types';
import { Status } from 'types/status';

declare module 'types' {
  declare namespace Raw {
    declare type Task = {
      id: number;
      created_at: string;
      description: string;
      name: string;
      status: string;
      updated_at: string;
    };
  }

  declare type Task = {
    id: number;
    createdAt: Date;
    description: string;
    name: string;
    status: Status;
    updatedAt: Date;
  };
}
