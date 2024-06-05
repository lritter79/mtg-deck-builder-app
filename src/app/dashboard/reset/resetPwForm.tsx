'use client';
import ErrorText from '@/app/components/errors/ErrorText';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AuthError, User } from '@supabase/supabase-js';
import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ResetPwForm = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<AuthError | null>(null);
  const supabase = createClientComponentClient();
  const [showMessage, setShowMessage] = useState(false);
  const handleReset = async () => {
    const { data, error: updateError } =
      await supabase.auth.updateUser({ password: 'new-password' });
    if (updateError) setError(updateError);
    if (data.user !== null) setShowMessage(true);
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 shadow-md">
      <div className="flex flex-col space-y-4">
        {' '}
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700"
        >
          New Password
        </label>
        <input
          id="password"
          className="px-4 py-2 border rounded-md"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
        />
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md transition-colors hover:bg-blue-700"
          onClick={handleReset}
        >
          Submit{' '}
        </button>
        {error && <ErrorText message={error.message} />}
        {showMessage && <p>Password reset successfully</p>}
      </div>
    </div>
  );
};

export default ResetPwForm;
