import { FC, useCallback } from 'react';
import { Status } from 'types/status';
import { STATUS_CONFIG } from 'utils/constants';
import Select from './Select';

type StatusOption = {
  id: Status;
  name: string;
  activeClassName: string;
};

const OPTIONS: StatusOption[] = [
  {
    id: 'TODO',
    name: STATUS_CONFIG['TODO'].name,
    activeClassName: 'bg-neutral-300 text-neutral-600',
  },
  {
    id: 'DOING',
    name: STATUS_CONFIG['DOING'].name,
    activeClassName: 'bg-orange-300 text-orange-600',
  },
  {
    id: 'IN_REVIEW',
    name: STATUS_CONFIG['IN_REVIEW'].name,
    activeClassName: 'bg-purple-300 text-purple-600',
  },
  {
    id: 'DONE',
    name: STATUS_CONFIG['DONE'].name,
    activeClassName: 'bg-green-300 text-green-600',
  },
];

type Props = {
  status: Status;
  onChange: (status: Status) => void;
};

const StatusSelect: FC<Props> = ({ status, onChange }: Props) => {
  const currentStatus = OPTIONS.find((s) => s.id === status);

  const handleChange = useCallback((opt) => onChange(opt.id), [onChange]);

  return (
    <Select
      options={OPTIONS}
      selectedOption={currentStatus}
      onChange={handleChange}
    />
  );
};

export default StatusSelect;
