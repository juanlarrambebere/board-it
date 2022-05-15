import { selector } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';
import tasksFilterTextAtom from 'recoil/atoms/tasksFilterTextAtom';
import taskIdsAtom from '../atoms/taskIdsAtom';

const filteredTaskIdsSelectorFamily = selector<number[] | undefined>({
  key: 'filteredTaskIdsSelectorFamily',
  get: ({ get }) => {
    const taskIds = get(taskIdsAtom);
    if (!taskIds) return undefined;

    const filterText = get(tasksFilterTextAtom);
    if (!filterText) return taskIds;

    return taskIds.filter((taskId) => {
      const task = get(taskAtomFamily(taskId));
      if (!task) return false;

      const lowerCaseFilter = filterText.toLowerCase();
      return (
        task.name.toLowerCase().match(lowerCaseFilter) ||
        task.description?.toLowerCase().match(lowerCaseFilter) ||
        task.status.toLowerCase().match(lowerCaseFilter)
      );
    });
  },
});

export default filteredTaskIdsSelectorFamily;
