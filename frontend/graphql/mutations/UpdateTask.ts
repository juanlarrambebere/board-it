import { gql } from '@apollo/client';
import { Raw } from 'types';

export interface UpdateTaskData {
  task: Raw.Task;
}

export interface UpdateTaskVariables {
  taskId: number;
  changes: Partial<Pick<Raw.Task, 'name' | 'description' | 'status'>>;
}

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: Int!, $changes: tasks_set_input!) {
    task: update_tasks_by_pk(pk_columns: { id: $taskId }, _set: $changes) {
      id
      created_at
      description
      name
      status
      updated_at
    }
  }
`;
