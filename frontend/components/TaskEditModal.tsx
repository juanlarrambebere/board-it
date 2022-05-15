import classNames from 'classnames';
import { format } from 'date-fns';
import useForm from 'hooks/useForm';
import useUpdateTask from 'hooks/useUpdateTask';
import { FC, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';
import Modal from './Modal';

type Props = {
  taskId: number;
  isOpen: boolean;
  onClose: () => void;
};

const TaskEditModal: FC<Props> = ({ isOpen, onClose, taskId }: Props) => {
  const task = useRecoilValue(taskAtomFamily(taskId));

  const [isEditMode, setIsEditMode] = useState(false);

  const { formData, handleChange, resetForm } = useForm({
    initialState: {
      name: task?.name ?? '',
      description: task?.description ?? '',
      status: task?.status ?? '',
    },
  });

  const updateTask = useUpdateTask();

  const handleEditClick = useCallback(() => setIsEditMode(true), []);

  const handleCancelClick = useCallback(() => {
    resetForm();
    setIsEditMode(false);
  }, [resetForm]);

  const handleSaveClick = useCallback(async () => {
    // TODO there is no need to mutate anything if the form isn't dirty.
    try {
      await updateTask(taskId, formData);
      setIsEditMode(false);
    } catch (e) {
      // TODO give feedback to the user.
    }
  }, [formData, taskId, updateTask]);

  const handleClose = useCallback(() => {
    onClose();
    resetForm();
  }, [onClose, resetForm]);

  return task ? (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="flex flex-col space-y-4">
        <div className="flex p-4 space-x-4 rounded-lg bg-neutral-700/50">
          <span>{taskId}</span>
          <textarea
            name="name"
            value={formData.name}
            readOnly={!isEditMode}
            onChange={handleChange}
            rows={2}
            className={classNames(
              'bg-transparent cursor-auto resize-none focus:outline-none w-full',
              { 'hover:bg-neutral-700/50 rounded-lg': isEditMode }
            )}
          />
        </div>

        <div className="flex items-center p-4 space-x-4 rounded-lg bg-neutral-700/50">
          <span>Status</span>
          {/* TODO dropdown */}
        </div>

        <div className="flex flex-col p-4 space-y-4 rounded-lg bg-neutral-700/50">
          <span>Description</span>
          <textarea
            name="description"
            className={classNames(
              'bg-transparent cursor-auto resize-none focus:outline-none w-full',
              { 'hover:bg-neutral-700/50 rounded-lg': isEditMode }
            )}
            rows={5}
            value={formData.description}
            onChange={handleChange}
            readOnly={!isEditMode}
          />

          <div className="flex items-center space-x-2">
            <span className="flex-1 text-sm text-center">
              Last updated: {format(task.updatedAt, 'PPP')}
            </span>

            {isEditMode ? (
              <>
                <button
                  onClick={handleCancelClick}
                  className="p-2 rounded-lg hover:bg-neutral-300/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClick}
                  className="p-2 rounded-lg hover:bg-neutral-300/10"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={handleEditClick}
                className="p-2 rounded-lg hover:bg-neutral-300/10"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default TaskEditModal;
