import { atom } from 'recoil';

const tasksFilterTextAtom = atom<string | undefined>({
  key: 'tasksFilterTextAtom',
  default: undefined,
});

export default tasksFilterTextAtom;
