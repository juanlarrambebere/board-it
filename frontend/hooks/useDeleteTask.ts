import { useMutation } from '@apollo/client';
import { DeleteTaskVariables, DELETE_TASK } from 'graphql/mutations/DeleteTask';
import { useRecoilCallback } from 'recoil';
import taskIdsAtom from 'recoil/atoms/taskIdsAtom';

const useCreateTask = () => {
  const [mutation] = useMutation<never, DeleteTaskVariables>(DELETE_TASK);

  const deleteTask = useRecoilCallback(
    ({ set }) =>
      async (taskId: number) => {
        const { data, errors } = await mutation({
          variables: {
            taskId,
          },
        });

        if (!data || errors) {
          // TODO log the error somewhere (ie: Sentry)
          throw 'Error creating task';
        }

        // Since the mutation worked, its safe to update the state without waiting for the subscription.
        set(taskIdsAtom, (taskIds) =>
          taskIds ? taskIds.filter((id) => id !== taskId) : taskIds
        );
      },
    [mutation]
  );

  return deleteTask;
};

export default useCreateTask;
