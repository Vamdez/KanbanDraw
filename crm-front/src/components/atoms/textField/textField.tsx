
interface PropsTextField {
  defaultValue?: string;
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const TextField = ({ defaultValue = "", style, inputProps }: PropsTextField) => {
  return (
    <div className="w-full" style={style}>
      <input
        type="text"
        defaultValue={defaultValue}
        className="w-full h-10 px-3 py-2 focus:outline-none"
        {...inputProps} // Espalha propriedades adicionais no input
      />
    </div>
  );
};

export default TextField;