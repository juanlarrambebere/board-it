import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';

type Props = {
  taskId: number;
};

const TaskCard: FC<Props> = ({ taskId }: Props) => {
  const task = useRecoilValue(taskAtomFamily(taskId));

  return task ? (
    <div className="flex flex-col p-2 rounded-lg bg-neutral-800 w-60">
      <span>{task.name}</span>
      <span className="text-sm text-neutral-500">{task.id}</span>
    </div>
  ) : null;
};

export default TaskCard;
