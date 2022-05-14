import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import taskIdsWithStatusSelectorFamily from 'recoil/selectors/taskIdsWithStatusSelectorFamily';
import { Status } from 'types/status';
import NewTaskInput from './NewTaskInput';
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
  newTaskButton: {
    className: string;
  };
};

const STATUS_CONFIG: { [key in Status]: StatusConfig } = {
  TODO: {
    root: {
      className: 'bg-neutral-500/10',
    },
    title: {
      text: 'Todo',
      className: 'rounded-md p-1 bg-neutral-500/25 text-neutral-300',
    },
    newTaskButton: {
      className: 'hover:bg-neutral-300/10',
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
    newTaskButton: {
      className: 'hover:bg-orange-300/10',
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
    newTaskButton: {
      className: 'hover:bg-purple-300/10',
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
    newTaskButton: {
      className: 'hover:bg-green-300/10',
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

  const [isNewTaskInputVisible, setIsNewTaskInputVisible] = useState(false);

  const showNewTaskInput = useCallback(
    () => setIsNewTaskInputVisible(true),
    []
  );

  const hideNewTaskInput = useCallback(
    () => setIsNewTaskInputVisible(false),
    []
  );

  const handleTaskCreationError = useCallback(() => {
    // TODO give some feedback to the user.
  }, []);

  const { root, title, newTaskButton } = STATUS_CONFIG[status];

  return (
    <div
      className={classNames(
        'flex flex-col p-2 space-y-2 rounded-lg h-fit w-fit group',
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

      {isNewTaskInputVisible && (
        <NewTaskInput
          status={status}
          onCreated={hideNewTaskInput}
          onCancelled={hideNewTaskInput}
          onError={handleTaskCreationError}
        />
      )}
      <button
        className={classNames(
          'w-fit text-sm hidden group-hover:block p-1 rounded-lg',
          newTaskButton.className
        )}
        onClick={showNewTaskInput}
      >
        New task
      </button>
    </div>
  );
};

export default StatusTaskList;
