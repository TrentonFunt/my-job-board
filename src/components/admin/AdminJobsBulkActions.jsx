
import Button from "../ui/Button";

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
    <div className="bg-slate-700 rounded-lg p-4 mb-4 border border-slate-600">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-wrap gap-2">
          <Button className="btn-error btn-sm" type="button" onClick={onDeleteSelected}>
            Delete Selected
          </Button>
          <Button className="btn-success btn-sm" type="button" onClick={onFeatureSelected}>
            Mark as Featured
          </Button>
          <Button className="btn-warning btn-sm" type="button" onClick={onUnfeatureSelected}>
            Unmark as Featured
          </Button>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-slate-300 bg-slate-600 px-3 py-1 rounded-full">
            {selectedJobIds.length} selected
          </span>
        </div>
      </div>
    </div>
  );
}
