import { FC, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';
import TaskEditModal from './TaskEditModal';

type Props = {
  taskId: number;
};

const TaskCard: FC<Props> = ({ taskId }: Props) => {
  const task = useRecoilValue(taskAtomFamily(taskId));

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDoubleClick = useCallback(() => setIsEditModalOpen(true), []);

  const handleCloseModal = useCallback(() => setIsEditModalOpen(false), []);

  return task ? (
    <div
      className="flex flex-col p-2 break-words rounded-lg bg-neutral-800 w-60"
      onDoubleClick={handleDoubleClick}
    >
      <span>{task.name}</span>
      <span className="text-sm text-neutral-500">{task.id}</span>
      <TaskEditModal
        taskId={taskId}
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  ) : null;
};

export default TaskCard;
