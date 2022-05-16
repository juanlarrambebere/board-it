import classNames from 'classnames';
import useUpdateTask from 'hooks/useUpdateTask';
import { FC, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import taskIdsWithStatusSelectorFamily from 'recoil/selectors/taskIdsWithStatusSelectorFamily';
import { Status } from 'types/status';
import { STATUS_CONFIG } from 'utils/constants';
import EmptyTaskListPlaceholder from './EmptyTaskListPlaceholder';
import NewTaskInput from './NewTaskInput';
import StatusTaskListHeader from './StatusTaskListHeader';
import TaskCard, { TASK_CARD } from './TaskCard';

const COLOR_CLASSNAMES_MAPPING = {
  neutral: {
    rootClassName: 'bg-neutral-500/10',
    onDragClassName: 'bg-neutral-500',
    titleClassName: 'bg-neutral-500/25 text-neutral-300',
    buttonClassName: 'hover:bg-neutral-300/10',
  },
  orange: {
    rootClassName: 'bg-orange-500/10',
    onDragClassName: 'bg-orange-500',
    titleClassName: 'bg-orange-500/25 text-orange-300',
    buttonClassName: 'hover:bg-orange-300/10',
  },
  purple: {
    rootClassName: 'bg-purple-500/10',
    onDragClassName: 'bg-purple-500',
    titleClassName: 'bg-purple-500/25 text-purple-300',
    buttonClassName: 'hover:bg-purple-300/10',
  },
  green: {
    rootClassName: 'bg-green-500/10',
    onDragClassName: 'bg-green-500',
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
    toast.error("Oops! We couldn't create the task. Please, try again");
  }, []);

  const { name, color } = STATUS_CONFIG[status];
  const { rootClassName, onDragClassName, titleClassName, buttonClassName } =
    COLOR_CLASSNAMES_MAPPING[color];

  const updateTask = useUpdateTask();

  const handleDrop = useCallback(
    async ({ taskId }: { taskId: number }) => {
      try {
        await updateTask(taskId, { status });
      } catch (_e) {
        toast.error("Oops! We couldn't delete the task. Please, try again");
      }
    },
    [status, updateTask]
  );

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: TASK_CARD,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div
      className={classNames(
        'flex flex-col p-2 space-y-2 rounded-lg h-fit w-64 group shadow-lg',
        rootClassName,
        {
          [onDragClassName]: isOver && canDrop,
        }
      )}
      ref={drop}
    >
      <StatusTaskListHeader
        title={name}
        className={classNames('rounded-md p-1', titleClassName)}
        tasksCount={taskIdsWithStatus?.length ?? 0}
      />
      {taskIdsWithStatus ? (
        taskIdsWithStatus.map((taskId) => (
          <TaskCard key={taskId} taskId={taskId} />
        ))
      ) : (
        <EmptyTaskListPlaceholder />
      )}

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
