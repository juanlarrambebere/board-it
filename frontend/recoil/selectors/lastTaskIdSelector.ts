import { selector } from 'recoil';
import taskIdsAtom from '../atoms/taskIdsAtom';

const lastTaskIdSelector = selector<number | undefined>({
  key: 'lastTaskIdSelector',
  get: ({ get }) => {
    const taskIds = get(taskIdsAtom);
    return taskIds?.[taskIds?.length - 1];
  },
});

export default lastTaskIdSelector;
