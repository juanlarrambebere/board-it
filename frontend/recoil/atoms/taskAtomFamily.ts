import { parseJSON } from 'date-fns';
import { backendCLient } from 'graphql/apollo';
import {
  TaskSubscriptionData,
  TaskSubscriptionVariables,
  TASK_SUBSCRIPTION,
} from 'graphql/subscriptions/TaskSubscription';
import { AtomEffect, atomFamily } from 'recoil';
import { Task } from 'types';
import { Status } from 'types/status';

const subscriptionEffect: (taskId: number) => AtomEffect<Task | undefined> =
  (taskId) =>
  ({ setSelf, trigger }) => {
    if (trigger === 'get') {
      const subscription = backendCLient
        .subscribe<TaskSubscriptionData, TaskSubscriptionVariables>({
          query: TASK_SUBSCRIPTION,
          variables: { taskId },
        })
        .subscribe(
          (result) => {
            if (result.data?.task) {
              const { id, name, description, updated_at, created_at } =
                result.data.task;

              setSelf({
                id,
                name,
                description,
                status: status as Status,
                updatedAt: parseJSON(updated_at),
                createdAt: parseJSON(created_at),
              });
            }
          },
          (error) => {
            throw error;
          }
        );

      return () => {
        subscription.unsubscribe();
      };
    }
  };

const taskAtomFamily = atomFamily<Task | undefined, number>({
  key: 'taskAtomFamily',
  default: undefined,
  effects: (taskId) => [subscriptionEffect(taskId)],
});

export default taskAtomFamily;
