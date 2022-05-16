import { useMutation } from '@apollo/client';
import { parseJSON } from 'date-fns';
import {
  CreateTaskData,
  CreateTaskVariables,
  CREATE_TASK,
} from 'graphql/mutations/CreateTask';
import { useRecoilCallback } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';
import taskIdsAtom from 'recoil/atoms/taskIdsAtom';
import { Status } from 'types/status';

const useCreateTask = () => {
  const [mutation] = useMutation<CreateTaskData, CreateTaskVariables>(
    CREATE_TASK
  );

  const createTask = useRecoilCallback(
    ({ set }) =>
      async (name: string, status: Status) => {
        try {
          const { data, errors } = await mutation({
            variables: {
              name,
              status,
            },
          });

          if (!data || errors) {
            // TODO log the error somewhere (ie: Sentry)
            throw 'Error creating task';
          }

          // Since the mutation worked, its safe to update the state without waiting for the subscription.
          const newTask = data.task;
          set(taskIdsAtom, (taskIds) =>
            taskIds ? [...taskIds, newTask.id] : [newTask.id]
          );
          set(taskAtomFamily(newTask.id), {
            id: newTask.id,
            name: newTask.name,
            description: newTask.description,
            status: newTask.status as Status,
            updatedAt: parseJSON(newTask.updated_at),
            createdAt: parseJSON(newTask.created_at),
          });
        } catch (e) {
          // TODO log the error somewhere (ie: Sentry)
          throw 'Something went wrong while connecting to the server.';
        }
      },
    [mutation]
  );

  return createTask;
};

export default useCreateTask;
