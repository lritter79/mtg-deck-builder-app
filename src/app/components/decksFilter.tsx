import React, { useState } from 'react';

interface DecksFilterProps {
  onFilter: (filterText: string) => void;
}

const DecksFilter: React.FC<DecksFilterProps> = ({ onFilter }) => {
  const [filterText, setFilterText] = useState('');

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(event.target.value);
    onFilter(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search decks..."
        className="px-4 py-2 border border-gray-300 rounded-md w-full"
        value={filterText}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DecksFilter;
