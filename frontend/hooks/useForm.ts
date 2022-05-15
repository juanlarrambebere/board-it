import { ChangeEvent, useCallback, useState } from 'react';

type Props = {
  initialState: {
    [key: string]: string;
  };
};

type ReturnType = {
  formData: {
    [key: string]: string; // FIXME this type should be exactly the same as initialState. Currently it's not.
  };
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  resetForm: () => void;
};

const useForm = ({ initialState }: Props): ReturnType => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((data) => ({ ...data, [e.target.name]: e.target.value }));
    },
    []
  );

  const resetForm = useCallback(
    () => setFormData(initialState),
    [initialState]
  );

  return { formData, handleChange, resetForm };
};

export default useForm;
