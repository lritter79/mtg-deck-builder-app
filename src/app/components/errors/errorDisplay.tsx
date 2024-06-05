import { PostgrestError } from '@supabase/supabase-js';
import React from 'react';

interface ErrorDisplayProps {
  error: PostgrestError;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error {error.code}</strong>
      <span className="block sm:inline"> - {error.message}</span>
      <p className="text-sm">{error.hint}</p>
      <p className="text-xs">{error.details}</p>
    </div>
  );
};

export default ErrorDisplay;
