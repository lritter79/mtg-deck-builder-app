'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import ErrorText from './errors/ErrorText';
import { AuthApiError } from '@supabase/supabase-js';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<AuthApiError | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((value) => {
        if (value.error) throw value.error;
        if (value.data.session) router.refresh();
      })
      .catch((e: AuthApiError) => {
        setError(e);
      });
  };

  return (
    <div className="bg-gray-100 rounded-lg p-8 shadow-md">
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="email"
          className="text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          className="px-4 py-2 border rounded-md"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
        />

        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700"
        >
          Password
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
          onClick={handleSignIn}
        >
          Sign in
        </button>
        {error && <ErrorText message={error.message} />}
        <Link href={`/signin/password`}>Forgot Password?</Link>
      </div>
    </div>
  );
}
