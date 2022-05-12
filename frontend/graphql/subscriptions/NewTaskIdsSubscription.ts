import { gql } from '@apollo/client';

export interface NewTaskIdsSubscriptionData {
  tasks: {
    id: number;
  }[];
}

export interface NewTaskIdsSubscriptionVariables {
  idFrom: number;
}

export const NEW_TASK_IDS_SUBSCRIPTION = gql`
  subscription TaskIdsSubscription($idFrom: Int!) {
    tasks(where: { id: { _gt: $idFrom } }) {
      id
    }
  }
`;
