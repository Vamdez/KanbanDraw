import { on } from "events";

interface PropsTextField {
  defaultValue?: string;
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ defaultValue = "", style, inputProps, handleChange }: PropsTextField) => {
  return (
    <div className="w-full" style={style}>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full h-10 px-3 py-2 focus:outline-none"
        onChange={handleChange}
        {...inputProps}
      />
    </div>
  );
};

export default TextField;