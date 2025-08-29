
/**
 * Bulk actions for admin jobs panel.
 * Props:
 * - selectedJobIds: array of selected job IDs
 * - onDeleteSelected: function to delete selected jobs
 * - onFeatureSelected: function to mark selected jobs as featured
 * - onUnfeatureSelected: function to unmark selected jobs as featured
 */
export default function AdminJobsBulkActions({ selectedJobIds, onDeleteSelected, onFeatureSelected, onUnfeatureSelected }) {
  if (selectedJobIds.length === 0) return null;

  return (
    <div className="flex gap-2 mb-4">
      <button className="btn btn-error btn-sm" type="button" onClick={onDeleteSelected}>
        Delete Selected
      </button>
      <button className="btn btn-success btn-sm" type="button" onClick={onFeatureSelected}>
        Mark as Featured
      </button>
      <button className="btn btn-warning btn-sm" type="button" onClick={onUnfeatureSelected}>
        Unmark as Featured
      </button>
      <span className="ml-2 text-sm">{selectedJobIds.length} selected</span>
    </div>
  );
}
