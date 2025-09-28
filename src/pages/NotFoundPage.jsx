export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="card bg-base-100 shadow-xl border border-base-300 p-8 text-center">
        <h1 className="text-3xl font-bold text-error mb-2">Page Not Found</h1>
        <p className="text-base-content/70 mb-6">The page you are looking for doesn’t exist.</p>
        <a href="/" className="btn btn-accent">Go Home</a>
      </div>
    </div>
  );
}


