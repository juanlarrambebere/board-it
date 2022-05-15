import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRecoilValue } from 'recoil';
import taskIdsAtom from 'recoil/atoms/taskIdsAtom';
import { Status } from 'types/status';
import { STATUS_LIST } from 'utils/constants';
import StatusTaskList from './StatusTaskList';

const KanbanBoard: FC = () => {
  const taskIds = useRecoilValue(taskIdsAtom);

  return taskIds ? (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-wrap justify-start flex-1 gap-4 lg:justify-around">
        {STATUS_LIST.map((status) => (
          <StatusTaskList key={status} status={status as Status} />
        ))}
      </div>
    </DndProvider>
  ) : null;
};

export default KanbanBoard;
