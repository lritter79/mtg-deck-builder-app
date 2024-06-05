import React from 'react';

type WinsAndLossesEditorProps = {
  label: string;
  value: number;
  onChange: (newWins: number) => void;
  loading: boolean;
};

const WinsAndLossesEditor: React.FC<WinsAndLossesEditorProps> = (
  props
) => {
  const { label, value, onChange, loading } = props;

  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    const newWins = Math.max(value - 1, 0);
    onChange(newWins);
  };

  return (
    <div className="w-1/2 pb-2">
      <div className="flex items-center flex-col">
        <div className="text-lg  font-semibold">{label}:</div>
        <div className="text-3xl  font-bold">{value}</div>
      </div>
      <div className="flex items-center justify-center	">
        <button
          disabled={loading}
          onClick={handleIncrement}
          className={`text-white bg-blue-500 rounded-md  mx-2 w-10 h-10 ${
            loading ? 'disabled:opacity-75' : ''
          }`}
        >
          +
        </button>
        <button
          disabled={loading}
          onClick={handleDecrement}
          className={`text-white bg-red-500 rounded-md  mx-2 w-10 h-10 ${
            loading ? 'disabled:opacity-75' : ''
          }`}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default WinsAndLossesEditor;
