import { atom } from 'recoil';

const taskIdsAtom = atom<number[] | undefined>({
  key: 'taskIdsAtom',
  default: undefined,
});

export default taskIdsAtom;
