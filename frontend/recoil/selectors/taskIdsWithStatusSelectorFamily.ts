import { selectorFamily } from 'recoil';
import taskAtomFamily from 'recoil/atoms/taskAtomFamily';
import { Status } from 'types/status';
import filteredTaskIdsSelectorFamily from './filteredTaskIdsSelector';

const taskIdsWithStatusSelectorFamily = selectorFamily<
  number[] | undefined,
  Status
>({
  key: 'taskIdsWithStatusSelectorFamily',
  get:
    (status: Status) =>
    ({ get }) => {
      const taskIds = get(filteredTaskIdsSelectorFamily);
      if (!taskIds) return undefined;

      return taskIds.filter(
        (taskId) => get(taskAtomFamily(taskId))?.status === status
      );
    },
});

export default taskIdsWithStatusSelectorFamily;
