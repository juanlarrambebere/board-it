import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import taskIdsAtom from 'recoil/atoms/taskIdsAtom';
import { Status } from 'types/status';
import StatusTasks from './StatusTasks';

const STATUS_LIST = ['TODO', 'DOING', 'IN_REVIEW', 'DONE'];

const KanbanBoard: FC = () => {
  const taskIds = useRecoilValue(taskIdsAtom);

  return taskIds ? (
    <div className="flex justify-around flex-1 gap-8 bg-red-500">
      {STATUS_LIST.map((status) => (
        <StatusTasks key={status} status={status as Status} />
      ))}
    </div>
  ) : null;
};

export default KanbanBoard;
