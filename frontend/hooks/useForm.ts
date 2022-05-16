import { ChangeEvent, useCallback, useState } from 'react';

type Props<T> = {
  initialState: T;
};

type ReturnType<T> = {
  formData: T;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  setFormValue: (name: string, value: string) => void;
  resetForm: () => void;
};

const useForm = function <T>({ initialState }: Props<T>): ReturnType<T> {
  const [formData, setFormData] = useState(initialState);

  const setFormValue = useCallback((name: string, value: string) => {
    setFormData((data) => ({ ...data, [name]: value }));
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValue(e.target.name, e.target.value);
    },
    [setFormValue]
  );

  const resetForm = useCallback(
    () => setFormData(initialState),
    [initialState]
  );

  return { formData, handleChange, setFormValue, resetForm };
};

export default useForm;
