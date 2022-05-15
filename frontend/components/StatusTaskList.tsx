import classNames from 'classnames';
import { FC, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import taskIdsWithStatusSelectorFamily from 'recoil/selectors/taskIdsWithStatusSelectorFamily';
import { Status } from 'types/status';
import { STATUS_CONFIG } from 'utils/constants';
import NewTaskInput from './NewTaskInput';
import StatusTaskListHeader from './StatusTaskListHeader';
import TaskCard from './TaskCard';

const COLOR_CLASSNAMES_MAPPING = {
  neutral: {
    rootClassName: 'bg-neutral-500/10',
    titleClassName: 'bg-neutral-500/25 text-neutral-300',
    buttonClassName: 'hover:bg-neutral-300/10',
  },
  orange: {
    rootClassName: 'bg-orange-500/10',
    titleClassName: 'bg-orange-500/25 text-orange-300',
    buttonClassName: 'hover:bg-orange-300/10',
  },
  purple: {
    rootClassName: 'bg-purple-500/10',
    titleClassName: 'bg-purple-500/25 text-purple-300',
    buttonClassName: 'hover:bg-purple-300/10',
  },
  green: {
    rootClassName: 'bg-green-500/10',
    titleClassName: 'bg-green-500/25 text-green-300',
    buttonClassName: 'hover:bg-green-300/10',
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

  const { name, color } = STATUS_CONFIG[status];
  const { rootClassName, titleClassName, buttonClassName } =
    COLOR_CLASSNAMES_MAPPING[color];

  return (
    <div
      className={classNames(
        'flex flex-col p-2 space-y-2 rounded-lg h-fit w-fit group',
        rootClassName
      )}
    >
      <StatusTaskListHeader
        title={name}
        className={classNames('rounded-md p-1', titleClassName)}
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
          buttonClassName
        )}
        onClick={showNewTaskInput}
      >
        New task
      </button>
    </div>
  );
};

export default StatusTaskList;
