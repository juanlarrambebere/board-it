import { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Status } from 'types/status';
import { STATUS_LIST } from 'utils/constants';
import StatusTaskList from './StatusTaskList';
import TasksFilter from './TasksFilter';

const KanbanBoard: FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <TasksFilter />
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-wrap justify-start flex-1 gap-4 lg:justify-around">
          {STATUS_LIST.map((status) => (
            <StatusTaskList key={status} status={status as Status} />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default KanbanBoard;
