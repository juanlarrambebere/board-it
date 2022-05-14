import { FC } from 'react';

type Props = { title: string; tasksCount: number; className: string };

const StatusTaskListHeader: FC<Props> = ({
  title,
  tasksCount,
  className,
}: Props) => {
  return (
    <div className="flex justify-between">
      <h2 className={className}>{title}</h2>
      <div className="flex">
        {tasksCount > 0 ? (
          <span>
            {tasksCount} {tasksCount === 1 ? 'task' : 'tasks'}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default StatusTaskListHeader;
