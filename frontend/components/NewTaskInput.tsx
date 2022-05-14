import useCreateTask from 'hooks/useCreateTask';
import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  KeyboardEventHandler,
  useCallback,
  useState,
} from 'react';
import { Status } from 'types/status';

type Props = {
  status: Status;
  onCancelled: () => void;
  onCreated?: () => void;
  onError?: (error: unknown) => void;
};

const NewTaskInput: FC<Props> = ({
  status,
  onCancelled,
  onCreated,
  onError,
}: Props) => {
  const [taskName, setTaskName] = useState<string>();

  const createTask = useCreateTask();

  const handleSubmit = useCallback(async () => {
    if (!taskName || !taskName.trim()) {
      onCancelled?.();
      return;
    }

    try {
      await createTask(taskName, status);
      setTaskName(undefined);
      onCreated?.();
    } catch (error) {
      onError?.(error);
    }
  }, [createTask, onCancelled, onCreated, onError, status, taskName]);

  const handleKeyDow: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
        e.preventDefault();
      }
    },
    [handleSubmit]
  );

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setTaskName(e.target.value),
    []
  );

  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = handleSubmit;

  return (
    <textarea
      value={taskName}
      onKeyDown={handleKeyDow}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="New task name"
      className="p-1 placeholder-opacity-50 border border-none rounded-lg resize-none placeholder-neutral-300 bg-neutral-800 focus:outline-none w-60"
    />
  );
};

export default NewTaskInput;
