export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-8 mt-12 border-t border-base-300">
      <div className="container mx-auto flex flex-col items-center gap-3">
        <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} <span className="font-bold text-accent">JobBoard</span>. All rights reserved.</p>
        <div className="flex gap-6 text-sm">
          <a href="#" className="link link-hover text-base-content/70 hover:text-accent">Privacy Policy</a>
          <a href="#" className="link link-hover text-base-content/70 hover:text-accent">Terms of Service</a>
          <a href="#" className="link link-hover text-base-content/70 hover:text-accent">Contact</a>
        </div>
      </div>
    </footer>
  );
}
