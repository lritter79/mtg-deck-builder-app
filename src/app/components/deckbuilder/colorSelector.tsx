import { Color } from '@/types/supabase';
import React from 'react';

const ColorSelector: React.FC<{
  color: Color;
  selectedColors: number[];
  isDisabled: (color: Color) => boolean;
  handleColorChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}> = ({ color, selectedColors, isDisabled, handleColorChange }) => {
  return (
    <label key={color.id} className="inline-flex items-center mr-4">
      <input
        type="checkbox"
        value={color.id}
        checked={selectedColors.includes(color.id)}
        onChange={handleColorChange}
        className={`form-checkbox text-indigo-600 h-5 w-5 checkbox-${color.color!.toLowerCase()}`}
        disabled={isDisabled(color)}
      />
      <span
        className={`ml-2 ${
          isDisabled(color) ? 'text-gray-700' : 'text-gray-300'
        }`}
      >
        {color.color}
      </span>{' '}
    </label>
  );
};

export default ColorSelector;
