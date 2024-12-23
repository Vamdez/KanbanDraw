import { useDebounce } from '@/hooks/UseDebounce';
import { useCallback } from 'react';

interface PropsTextField {
  defaultValue?: string;
  style?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({
  defaultValue = '',
  style,
  inputProps,
  handleChange,
}: PropsTextField) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (handleChange) {
        handleChange(e);
      }
    },
    [handleChange],
  );

  const debouncedHandleChange = useDebounce(onChange, 1000);
  return (
    <div className={`w-full ${style}`}>
      <input
        type="text"
        defaultValue={defaultValue}
        className="h-10 px-3 py-2 focus:outline-none"
        onChange={debouncedHandleChange}
        {...inputProps}
      />
    </div>
  );
};

export default TextField;
