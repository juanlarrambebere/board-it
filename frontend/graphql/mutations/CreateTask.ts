import { gql } from '@apollo/client';
import { Raw } from 'types';
import { Status } from 'types/status';

export interface CreateTaskData {
  task: Raw.Task;
}

export interface CreateTaskVariables {
  name: string;
  status: Status;
  description?: string;
}

export const CREATE_TASK = gql`
  mutation CreateTask($name: String!, $status: String!, $description: String) {
    task: insert_tasks_one(
      object: { name: $name, status: $status, description: $description }
    ) {
      id
      created_at
      description
      name
      status
      updated_at
    }
  }
`;
