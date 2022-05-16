import { gql } from '@apollo/client';

export interface TaskIdsSubscriptionData {
  tasks: {
    id: number;
  }[];
}

export const TASK_IDS_SUBSCRIPTION = gql`
  subscription TaskIdsSubscription {
    tasks {
      id
    }
  }
`;
