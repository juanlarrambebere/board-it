import { useSubscription } from '@apollo/client';
import {
  TaskIdsSubscriptionData,
  TASK_IDS_SUBSCRIPTION,
} from 'graphql/subscriptions/TaskIdsSubscription';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import taskIdsAtom from 'recoil/atoms/taskIdsAtom';

const useSubscribeToTasks = () => {
  const setTaskIds = useSetRecoilState(taskIdsAtom);

  const { data, loading, error } = useSubscription<
    TaskIdsSubscriptionData,
    never
  >(TASK_IDS_SUBSCRIPTION);

  useEffect(() => {
    if (data?.tasks && data.tasks.length > 0) {
      const newTaskIds = data.tasks.map((task) => task.id);

      setTaskIds(newTaskIds);
    }
  }, [data, setTaskIds, loading, error]);

  return;
};

export default useSubscribeToTasks;
