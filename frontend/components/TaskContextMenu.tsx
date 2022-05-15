import { Menu } from '@headlessui/react';
import ElipsisIcon from 'assets/icons/elipsis.svg';
import TrashIcon from 'assets/icons/trash.svg';
import classNames from 'classnames';
import useDeleteTask from 'hooks/useDeleteTask';
import { FC, useCallback } from 'react';

type Props = {
  taskId: number;
};

const TaskContextMenu: FC<Props> = ({ taskId }: Props) => {
  const deleteTask = useDeleteTask();

  const handleDeleteClick = useCallback(async () => {
    try {
      await deleteTask(taskId);
    } catch (e) {
      // TODO give feedback to the user.
    }
  }, [deleteTask, taskId]);

  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <ElipsisIcon className="w-4 h-4" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 flex flex-col w-40 gap-2 mt-2 origin-top-right bg-white rounded-lg shadow-lg">
        <Menu.Item>
          <button
            onClick={handleDeleteClick}
            className={classNames(
              'flex gap-2 items-center text-red-500 hover:bg-red-200 p-2 rounded-lg'
            )}
          >
            <TrashIcon className="w-4 h-4" />
            Delete
          </button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default TaskContextMenu;
