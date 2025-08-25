export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-8 mt-12 border-t border-base-300">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
        {/* About Section */}
        <div className="flex flex-col items-center sm:items-start gap-3">
          <span className="text-xl font-bold text-accent tracking-tight">JobBoard</span>
          <p className="text-sm opacity-80 max-w-xs text-center sm:text-left">
            JobBoard helps you find your next opportunity with curated listings, smart filters, and a modern, user-friendly experience.
          </p>
          {/* Social Links */}
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Twitter" className="btn btn-sm btn-ghost rounded-full">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20c7.547 0 11.675-6.155 11.675-11.49 0-.175 0-.349-.012-.522A8.18 8.18 0 0022 5.92a8.19 8.19 0 01-2.357.637A4.118 4.118 0 0021.448 4.1a8.224 8.224 0 01-2.605.98A4.107 4.107 0 0016.616 3c-2.266 0-4.104 1.823-4.104 4.07 0 .32.036.634.106.934C8.728 7.87 5.8 6.1 3.67 3.149a4.025 4.025 0 00-.555 2.048c0 1.413.724 2.662 1.825 3.393A4.093 4.093 0 012.8 7.15v.051c0 1.974 1.41 3.624 3.292 4.001a4.1 4.1 0 01-1.085.144c-.265 0-.522-.026-.772-.075.523 1.623 2.037 2.805 3.833 2.836A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="btn btn-sm btn-ghost rounded-full">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.002 3.601 4.604v5.592z"/></svg>
            </a>
            <a href="#" aria-label="Email" className="btn btn-sm btn-ghost rounded-full">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14h23.98v-14l-11.99 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z"/></svg>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-base-content/80 mb-2">Quick Links</span>
          <a href="/" className="link link-hover text-base-content/70 hover:text-accent">Home</a>
          <a href="/account" className="link link-hover text-base-content/70 hover:text-accent">Account</a>
          <a href="/signup" className="link link-hover text-base-content/70 hover:text-accent">Sign Up</a>
        </div>
        {/* Legal & Contact */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-base-content/80 mb-2">Legal & Contact</span>
          <a href="#" className="link link-hover text-base-content/70 hover:text-accent">Privacy Policy</a>
          <a href="#" className="link link-hover text-base-content/70 hover:text-accent">Terms of Service</a>
          <a href="#" className="link link-hover text-base-content/70 hover:text-accent">Contact</a>
        </div>
      </div>
      <div className="container mx-auto text-center mt-8 text-xs opacity-70">
        &copy; {new Date().getFullYear()} <span className="font-bold text-accent">JobBoard</span>. All rights reserved.
      </div>
    </footer>
  );
}
