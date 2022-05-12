import { gql } from '@apollo/client';
import { Raw } from 'types';

export interface TaskSubscriptionData {
  task: Raw.Task;
}

export interface TaskSubscriptionVariables {
  taskId: number;
}

export const TASK_SUBSCRIPTION = gql`
  subscription TaskSubscription($taskId: Int!) {
    task: tasks_by_pk(id: $taskId) {
      created_at
      description
      name
      id
      status
      updated_at
    }
  }
`;
