import React from 'react';
import { useLoading } from '../../context/LoadingContext';

export const ComponentLoading = () => {
  const { componentsLoading } = useLoading();

  if (!componentsLoading) return null;

  return (
    <div className="w-full h-full flex items-center justify-center py-[15%]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
    </div>
  );
};
