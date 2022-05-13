import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import taskIdsWithStatusSelectorFamily from 'recoil/selectors/taskIdsWithStatusSelectorFamily';
import { Status } from 'types/status';

type Props = {
  status: Status;
};

const StatusTasks: FC<Props> = ({ status }: Props) => {
  const taskIdsWithStatus = useRecoilValue(
    taskIdsWithStatusSelectorFamily(status)
  );

  return (
    <div className="flex flex-col space-y-2">
      <h2>{status}</h2>
      {taskIdsWithStatus
        ? taskIdsWithStatus.map((taskId) => <div key={taskId}>{taskId}</div>)
        : 'Empty!'}
    </div>
  );
};

export default StatusTasks;
