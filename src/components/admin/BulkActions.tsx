import React from 'react';

interface BulkActionsProps {
  selectedCount: number;
  onBulkUpdate: () => void;
  onBulkDelete: () => void;
  onBulkUpload: () => void;
}

export default function BulkActions({ selectedCount, onBulkUpdate, onBulkDelete, onBulkUpload }: BulkActionsProps) {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto">
      <button
        type="button"
        onClick={onBulkUpload}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
      >
        Bulk Upload
      </button>
      <button
        type="button"
        onClick={onBulkUpdate}
        className="flex items-center px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 cursor-pointer"
      >
        Bulk Update
      </button>
      <button
        type="button"
        onClick={onBulkDelete}
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"
      >
        Bulk Delete
      </button>
    </div>
  );
}
