import { useSubscription } from '@apollo/client';
import {
  NewTaskIdsSubscriptionData,
  NewTaskIdsSubscriptionVariables,
  NEW_TASK_IDS_SUBSCRIPTION,
} from 'graphql/subscriptions/NewTaskIdsSubscription';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import taskIdsAtom from 'recoil/atoms/taskIdsAtom';
import lastTaskIdSelector from 'recoil/selectors/lastTaskIdSelector';

const useSubscribeToNewTasks = () => {
  const setTaskIds = useSetRecoilState(taskIdsAtom);
  const lastTaskId = useRecoilValue(lastTaskIdSelector);

  const { data, loading, error } = useSubscription<
    NewTaskIdsSubscriptionData,
    NewTaskIdsSubscriptionVariables
  >(NEW_TASK_IDS_SUBSCRIPTION, {
    variables: {
      idFrom: lastTaskId || 0,
    },
  });

  useEffect(() => {
    console.log({ data, loading, error });
    if (data?.tasks && data.tasks.length > 0) {
      const newTaskIds = data.tasks.map((task) => task.id);

      setTaskIds((taskIds) =>
        taskIds ? [...taskIds, ...newTaskIds] : newTaskIds
      );
    }
  }, [data, setTaskIds, loading, error]);

  return;
};

export default useSubscribeToNewTasks;
