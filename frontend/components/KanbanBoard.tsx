import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import taskIdsAtom from 'recoil/atoms/taskIdsAtom';
import { Status } from 'types/status';
import { STATUS_LIST } from 'utils/constants';
import StatusTaskList from './StatusTaskList';

const KanbanBoard: FC = () => {
  const taskIds = useRecoilValue(taskIdsAtom);

  return taskIds ? (
    <div className="flex flex-wrap justify-start flex-1 gap-4 lg:justify-around">
      {STATUS_LIST.map((status) => (
        <StatusTaskList key={status} status={status as Status} />
      ))}
    </div>
  ) : null;
};

export default KanbanBoard;
