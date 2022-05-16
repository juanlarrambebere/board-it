import { format } from 'date-fns';
import useForm from 'hooks/useForm';
import useUpdateTask from 'hooks/useUpdateTask';
import { FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';
import Modal from './Modal';
import StatusSelect from './StatusSelect';
import TaskContextMenu from './TaskContextMenu';

type Props = {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
};

const TaskEditModal: FC<Props> = ({ isOpen, onClose, taskId }: Props) => {
  const task = useRecoilValue(taskAtomFamily(taskId));

  const { formData, handleChange, setFormValue, resetForm } = useForm({
    initialState: {
      name: task?.name,
      description: task?.description,
      status: task?.status,
    },
  });

  const isFormDirty =
    task?.name !== formData.name ||
    task?.description !== formData.description ||
    task?.status !== formData.status;

  const updateTask = useUpdateTask();

  const handleSaveClick = useCallback(async () => {
    try {
      await updateTask(taskId, formData);
    } catch (e) {
      // TODO give feedback to the user.
    }
  }, [formData, taskId, updateTask]);

  const handleClose = useCallback(() => {
    onClose();
    resetForm();
  }, [onClose, resetForm]);

  const handleStatusChange = useCallback(
    (status) => {
      setFormValue('status', status);
    },
    [setFormValue]
  );

  return task ? (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col space-y-4">
        <div className="flex p-4 space-x-4 rounded-lg bg-neutral-700/50">
          <span>{taskId}</span>
          <textarea
            name="name"
            value={formData.name}
            onChange={handleChange}
            rows={2}
            className="flex-1 bg-transparent rounded-lg cursor-auto resize-none focus:outline-none hover:bg-neutral-700/50"
          />
          <TaskContextMenu taskId={taskId} />
        </div>

        <div className="flex items-center p-4 space-x-4 rounded-lg bg-neutral-700/50">
          <span>Status</span>
          <StatusSelect status={task.status} onChange={handleStatusChange} />
        </div>

        <div className="flex flex-col p-4 space-y-4 rounded-lg bg-neutral-700/50">
          <span>Description</span>
          <textarea
            name="description"
            className="w-full bg-transparent rounded-lg cursor-auto resize-none focus:outline-none hover:bg-neutral-700/50"
            rows={5}
            value={formData.description}
            onChange={handleChange}
          />

          <div className="flex items-center space-x-2">
            <span className="flex-1 text-sm text-center">
              Last updated: {format(task.updatedAt, 'PPP')}
            </span>

            {isFormDirty && (
              <>
                <button
                  onClick={resetForm}
                  className="p-2 rounded-lg hover:bg-neutral-300/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  className="p-2 rounded-lg text-fuchsia-500 hover:bg-fuchsia-200"
                >
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default TaskEditModal;
