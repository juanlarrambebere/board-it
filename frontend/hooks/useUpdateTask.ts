import { useMutation } from '@apollo/client';
import { parseJSON } from 'date-fns';
import {
  UpdateTaskData,
  UpdateTaskVariables,
  UPDATE_TASK,
} from 'graphql/mutations/UpdateTask';
import { useRecoilCallback } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';
import { Raw } from 'types';
import { Status } from 'types/status';

const useUpdateTask = () => {
  const [mutation] = useMutation<UpdateTaskData, UpdateTaskVariables>(
    UPDATE_TASK
  );

  const updateTask = useRecoilCallback(
    ({ set }) =>
      async (
        taskId: number,
        changes: Partial<Pick<Raw.Task, 'name' | 'description' | 'status'>>
      ) => {
        try {
          const { data, errors } = await mutation({
            variables: {
              taskId,
              changes,
            },
          });

          if (!data || errors) {
            // TODO log the error somewhere (ie: Sentry)
            throw 'Error updating task';
          }

          // Since the mutation worked, its safe to update the state without waiting for the subscription.
          const updatedTask = data.task!;
          set(taskAtomFamily(taskId), (task) => ({
            ...task,
            ...{
              id: updatedTask.id,
              name: updatedTask.name,
              description: updatedTask.description,
              status: updatedTask.status as Status,
              updatedAt: parseJSON(updatedTask.updated_at),
              createdAt: parseJSON(updatedTask.created_at),
            },
          }));
        } catch (e) {
          // TODO log the error somewhere (ie: Sentry)
          throw 'Something went wrong while connecting to the server.';
        }
      },
    [mutation]
  );

  return updateTask;
};

export default useUpdateTask;
