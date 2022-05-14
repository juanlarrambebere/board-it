import classNames from 'classnames';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import taskIdsWithStatusSelectorFamily from 'recoil/selectors/taskIdsWithStatusSelectorFamily';
import { Status } from 'types/status';
import StatusTaskListHeader from './StatusTaskListHeader';
import TaskCard from './TaskCard';

type StatusConfig = {
  root: {
    className: string;
  };
  title: {
    text: string;
    className: string;
  };
};

// const STATUS_CONFIG: { [key in Status]: StatusConfig } = {
const STATUS_CONFIG = {
  TODO: {
    root: {
      className: 'bg-neutral-500/10',
    },
    title: {
      text: 'Todo',
      className: 'rounded-md p-1 bg-neutral-500/25 text-neutral-300',
    },
  },
  DOING: {
    root: {
      className: 'bg-orange-500/10',
    },
    title: {
      text: 'Doing',
      className: 'rounded-md p-1 bg-orange-500/25 text-orange-300',
    },
  },
  IN_REVIEW: {
    root: {
      className: 'bg-purple-500/10',
    },
    title: {
      text: 'In review',
      className: 'rounded-md p-1 bg-purple-500/25 text-purple-300',
    },
  },
  DONE: {
    root: {
      className: 'bg-green-500/10',
    },
    title: {
      text: 'Done',
      className: 'rounded-md p-1 bg-green-500/25 text-green-300',
    },
  },
};

type Props = {
  status: Status;
};

const StatusTaskList: FC<Props> = ({ status }: Props) => {
  const taskIdsWithStatus = useRecoilValue(
    taskIdsWithStatusSelectorFamily(status)
  );

  const { root, title } = STATUS_CONFIG[status];

  return (
    <div
      className={classNames(
        'flex flex-col p-2 space-y-2 rounded-lg h-fit w-fit',
        root.className
      )}
    >
      <StatusTaskListHeader
        title={title.text}
        className={title.className}
        tasksCount={taskIdsWithStatus?.length ?? 0}
      />
      {taskIdsWithStatus?.map((taskId) => (
        <TaskCard key={taskId} taskId={taskId} />
      ))}
    </div>
  );
};

export default StatusTaskList;
