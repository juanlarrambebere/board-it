import { Listbox, Transition } from '@headlessui/react';
import ChevronDown from 'assets/icons/chevron-down.svg';
import classNames from 'classnames';
import { Fragment } from 'react';

type Option = {
  name: string;
  activeClassName?: string;
};

type Props<T> = {
  options: T[];
  selectedOption?: T;
  disabled?: boolean;
  onChange: (option: T) => void;
};

const Select = function <T extends Option>({
  options,
  selectedOption,
  onChange,
}: Props<T>) {
  return (
    <div className="w-52">
      <Listbox value={selectedOption} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button className="flex items-center justify-between w-full p-2 rounded-lg bg-neutral-800">
            <span className="block truncate ">{selectedOption?.name}</span>
            <ChevronDown className="w-4 h-4" />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full mt-1 overflow-auto rounded-md shadow-lg bg-neutral-800 max-h-60 focus:outline-none">
              {options.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-default select-none p-2 text-neutral-300',
                      {
                        'bg-neutral-300 text-neutral-800': active,
                        [option.activeClassName ??
                        'bg-neutral-300 text-neutral-800']:
                          option.name === selectedOption?.name,
                      }
                    )
                  }
                  value={option}
                >
                  {() => (
                    <>
                      <span className="block truncate">{option.name}</span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
