import useDebounce from 'hooks/useDebounce';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import tasksFilterTextAtom from 'recoil/atoms/tasksFilterTextAtom';

const TasksFilter: FC = () => {
  // Filter has the global state.
  // When it changes, the list of tasks gets filtered.
  const [filter, setFilter] = useRecoilState(tasksFilterTextAtom);
  const resetFilterText = useResetRecoilState(tasksFilterTextAtom);

  // Since filtering on each keystroke is not ideal,
  // the user's input is stored in a local state variable
  // and the synchronization with the global filter is debounced.
  const [text, setText] = useState(filter);
  const debouncedText = useDebounce(text, 250);

  useEffect(() => {
    if (!debouncedText || !debouncedText.trim()) {
      resetFilterText();
      return;
    }

    setFilter(debouncedText);
  }, [debouncedText, resetFilterText, setFilter]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value),
    [setText]
  );

  return (
    <div className="flex w-full">
      <input value={text} onChange={handleChange}></input>
    </div>
  );
};

export default TasksFilter;
