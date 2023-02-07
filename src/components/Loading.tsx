import { useState } from 'react';

export function useLoading(initialState: boolean) {
  const [isLoading, setLoading] = useState(initialState);

  return [isLoading, setLoading] as const;
}
export function Loading() {
  return <div>Loading...</div>;
}
