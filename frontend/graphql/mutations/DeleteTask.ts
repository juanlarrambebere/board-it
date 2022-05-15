import { gql } from '@apollo/client';

export interface DeleteTaskVariables {
  taskId: number;
}

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: Int!) {
    delete_tasks_by_pk(id: $taskId) {
      id
    }
  }
`;
