"use client";
import ErrorText from "@/app/components/errors/ErrorText";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import React, { useState } from "react";

const ForgotPwForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<AuthError | null>(null);
  const [isSent, setIsSent] = useState(false);
  const supabase = createClientComponentClient();

  const handleClick = async () => {
    setError(null);
    setIsSent(false);
    let { data, error: submitError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `https://mtg-deck-builder-git-main-lritter79.vercel.app/auth/callback?next=/dashboard/reset`,
      });
    if (submitError) setError(submitError);
    setIsSent(data !== null);
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

        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md transition-colors hover:bg-blue-700"
          onClick={handleClick}
        >
          Submit{" "}
        </button>
        {error && <ErrorText message={error.message} />}
        {isSent && (
          <p>Sent!. Check your email for the password reset link</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPwForm;
