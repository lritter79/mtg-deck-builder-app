'use client';
import ErrorText from '@/app/components/errors/ErrorText';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <ErrorText message={error.message} />
    </div>
  );
}
