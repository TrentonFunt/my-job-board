# AGENTS.md - Role Rocket Project Guidelines

> **CRITICAL**: This file defines how all future AI agents must behave when working in this repository.
> Do NOT modify this file unless explicitly instructed by the project owner.

---

## 1. Project Overview

**Role Rocket** is a modern, full-featured job board web application that serves both job seekers and employers. It provides comprehensive job search/filtering, user authentication, employer dashboards for posting and managing jobs, an admin panel for site management, and integrated blog features.

### Core Concept

A multi-user platform where:
- **Job Seekers**: Browse, filter, search jobs; save favorites; track applications; manage profiles
- **Employers**: Post jobs, manage applications, view analytics, track hiring pipeline
- **Admins**: Moderate content, manage users, view platform analytics, manage featured jobs

### Architecture

- **Frontend Framework**: React 19 with Vite 7 for fast development and optimized builds
- **Styling**: Tailwind CSS v4 with DaisyUI v5 for pre-built, accessible components
- **Routing**: React Router 7 with client-side navigation and protected routes
- **State Management**: React Context API (AuthContext, ThemeContext) - no Redux
- **Backend**: Firebase (Firestore for database, Firebase Auth for authentication)
- **Animations**: Framer Motion 12+ for micro-interactions and page transitions
- **UI Components**: Custom components built on shadcn/ui patterns + DaisyUI
- **Data Fetching**: Axios for external APIs (job aggregation from Arbeitnow), Firebase SDK for internal data
- **Toast Notifications**: React Hot Toast for user feedback
- **Icons**: Heroicons (v24) for consistent iconography

### Design Philosophy

**"Forgiving & Discoverable"** – Every interaction feels intuitive with accessible features for all user types.

#### Good UX Patterns (DO THIS):
- Progressive disclosure (show complex options only when needed)
- Consistent feedback (toast notifications, loading states, error messages)
- Micro-interactions (button hover states, smooth transitions, loading spinners)
- Mobile-first responsive design with proper touch targets
- Keyboard navigation throughout (Tab, Enter, Escape, arrow keys)
- Proper ARIA labels and semantic HTML

#### Bad UX (AVOID):
- Breaking changes to established user flows
- Unexplained state changes (always show feedback)
- Animations >300ms on interactive elements
- Color-only information conveyance (always pair with icons/text)
- Layout shifts during loading states
- Broken mobile experience

#### Core Features:
- `/` → Landing page with features overview
- `/jobs` → Main job search with filters
- `/job/:slug` → Job details and application
- `/account` → User profile, saved jobs, applications (protected)
- `/employer-dashboard` → Employer job management (protected)
- `/admin` → Admin controls (protected, admin role only)
- `/blog` → Blog with featured articles
- `/auth` & `/signup` → Authentication pages

#### Performance Rules (MANDATORY):
- **No layout shifts**: Use `transform` and `opacity` only for animations
- **Lazy load below fold**: `loading="lazy"` for images, dynamic imports for heavy components
- **Respect reduced motion**: Wrap animations in `@media (prefers-reduced-motion: no-preference)`
- **Firebase queries**: Use proper indexing, limit results, cache where appropriate
- **Bundle optimization**: Code-split routes, lazy load admin/employer features

#### Accessibility Non-Negotiables:
- Keyboard navigation works for everything (Tab, Enter, Space, Escape)
- Visible focus states (DaisyUI provides default, enhance if needed)
- Color contrast passes WCAG AA (DaisyUI ensures this)
- Screen readers announce state changes (use ARIA live regions)
- Form labels always present (never placeholder-only)
- Error messages clear and specific

### Implementation Phases

**Phase 1: Foundation** ✅ (Current - Deployed)
- Functional skeleton with all core features
- Authentication and protected routes working
- Job aggregation and search functional
- Employer dashboard and admin panel functional
- Blog feature implemented
- Light/dark mode working with DaisyUI

**Phase 2: Polish** (In Progress)
- Component refactoring (break large components into smaller pieces)
- Code style standardization (named exports, consistent patterns)
- Performance optimization (code splitting, lazy loading)
- Enhanced animations and micro-interactions
- Improved error handling and edge cases

**Phase 3: Advanced Features** (Future)
- Advanced analytics dashboard (employer insights)
- Email notifications system
- Recommendation engine
- Video interview integration
- Advanced search with NLP
- Social features (job sharing, company pages)

**Phase 4: Scale** (Future)
- Multi-language support
- Regional job boards
- Mobile app (React Native)
- GraphQL API (consider for employer tools)
- Advanced caching and offline support

---

## 2. Tech Stack & Tools

**Required technologies** (use ONLY these unless explicitly approved):

- **React** 19+ with JSX (no TypeScript yet - migration planned)
- **Vite** 7+ for bundling and dev server
- **React Router** 7+ (modern API: `createBrowserRouter`, `RouterProvider`)
- **Tailwind CSS** 4+ with `@tailwindcss/vite` plugin
- **DaisyUI** 5+ for pre-built accessible components
- **Framer Motion** 12+ for animations
- **Firebase** 12+ (Auth + Firestore)
- **Axios** 1.11+ for HTTP requests
- **React Hot Toast** 2.6+ for notifications
- **Heroicons** 24+ for icons
- **Node.js** 18+ / npm 10+ or pnpm 8+

**Do NOT add**:
- Redux, Zustand, Jotai, or other state managers (Context is sufficient)
- Additional UI component libraries (DaisyUI + shadcn pattern is enough)
- CSS-in-JS solutions (Tailwind is sufficient)
- Additional animation libraries (stick with Framer Motion)
- Alternative build tools (Vite is the standard)
- TypeScript (not yet - future migration planned)

---

## 3. Code Style & Conventions

### File & Component Naming

- **Components**: PascalCase files, one component per file (e.g., `JobCard.jsx`, `AdminPanel.jsx`)
- **Pages**: PascalCase (e.g., `HomePage.jsx`, `AdminPage.jsx`)
- **Hooks**: camelCase starting with `use` (e.g., `useJobs.js`, `useAuth.js`)
- **Services/Utils**: camelCase (e.g., `jobs.js`, `auth.js`)
- **Routes/paths**: kebab-case URLs (e.g., `/job-details`, `/employer-dashboard`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_JOBS_PER_PAGE`, `DEFAULT_SORT_ORDER`)
- **CSS classes**: Use Tailwind defaults; no custom class names without approval

### Component Export Conventions

**STANDARD** - Use default exports for page components and main layout components:
```jsx
// ✓ GOOD - Pages and Layouts
export default function HomePage() { ... }
export default function JobDetailPage() { ... }
export default function AdminPanelLayout() { ... }
```

**STANDARD** - Use default exports for UI components built on DaisyUI:
```jsx
// ✓ GOOD - UI Components (DaisyUI-based)
export default function JobCard({ title, company, ...props }) { ... }
export default function Button({ children, variant, ...props }) { ... }
```

**ACCEPTABLE** - Named exports for utility functions and hooks:
```jsx
// ✓ ACCEPTABLE - Utilities and Hooks
export function getJobBySlug(slug) { ... }
export function useJobs() { ... }
export const API_BASE_URL = "https://..."
```

### Component Structure

```javascript
// ✓ GOOD - Standard component pattern
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

export default function JobCard({ title, company, slug }) {
  const [saved, setSaved] = useState(false)
  
  useEffect(() => {
    // Load saved status
  }, [slug])
  
  return (
    <motion.div>
      <h2>{title}</h2>
      <p>{company}</p>
      <Button onClick={() => setSaved(!saved)}>
        {saved ? 'Saved' : 'Save'}
      </Button>
    </motion.div>
  )
}
```

### Styling Rules (CRITICAL)

- **Use Tailwind classes exclusively** in JSX (no inline styles except CSS vars)
- **No magic numbers**: All spacing, sizes, colors from Tailwind scale (sm, md, lg, etc.)
- **Group related Tailwind classes**:
  ```jsx
  // ✓ GOOD - Logical grouping
  <div className="flex items-center gap-4 px-6 py-4 bg-base-100 rounded-lg border border-base-300">
  
  // ✗ AVOID - Random order
  <div className="gap-4 flex px-6 border bg-base-100 items-center py-4 rounded-lg border-base-300">
  ```
- **Responsive design**: Use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- **DaisyUI theme colors**: Use semantic classes (`bg-base-100`, `text-base-content`, `btn-primary`) not arbitrary colors
- **No custom CSS** without explicit approval (leverage DaisyUI instead)

### JavaScript/JSX Best Practices

- **Arrow functions** for components and callbacks
- **Destructure props** in function parameters
- **Use optional chaining** (`?.`) and nullish coalescing (`??`)
- **Keep component functions under ~200 lines** (extract logic/sub-components if larger)
- **No unused variables** (ESLint enforces this)
- **Handle loading and error states** in all async operations
- **Add JSDoc comments** for complex functions

```javascript
// ✓ GOOD - Clear, documented function
/**
 * Fetches all jobs for a given company
 * @param {string} companyId - The company's Firebase UID
 * @returns {Promise<Array>} Array of job objects
 */
export const fetchCompanyJobs = async (companyId) => {
  if (!companyId) throw new Error('companyId is required')
  // implementation
}
```

### Firebase Best Practices

- **Keep Firebase calls in services** (not directly in components)
- **Use proper collection structure**:
  ```
  users/{userId}
    - profile (basic user info)
    - savedJobs/{jobSlug} (saved jobs)
    - applications/{applicationId} (job applications)
  
  employers/{employerId}
    - profile
    - jobs/{jobId}
    - applications/{applicationId}
  
  jobs/{jobId} (public job listings)
  adminSettings/{settingId}
  ```
- **Query optimization**: Always use `.limit()`, proper indexes, and `.where()` filters
- **Error handling**: Wrap Firebase calls in try/catch, provide user feedback via toast
- **Real-time listeners**: Unsubscribe in useEffect cleanup functions
- **Batch operations**: Use `writeBatch` for multiple writes to same collection

### Context & State Management

- **AuthContext**: Global user auth state (user object, loading, role)
- **ThemeContext**: Global theme state (light/dark mode)
- **Component state**: Use `useState` for local UI state
- **Avoid prop drilling**: If passing props >3 levels deep, use Context
- **No Redux/Zustand** unless app grows significantly beyond current scope

### DRY & Component Composition

- **Extract repeated patterns** into reusable components
- **Create container components** for data fetching logic
- **Colocate animations** with the component they animate (Framer Motion at component level)
- **Use render props or custom hooks** for shared behavior
- **Keep the component tree shallow** (max 5-6 levels deep typically)

### Do NOT Over-Engineer

- Keep it simple until complexity is proven necessary
- One file structure, not multiple layers of abstraction
- Direct component composition > render props > Context (in order of preference)
- Avoid premature optimization (measure first with Lighthouse)

---

## 5. Commands & Build Steps

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Development

```bash
# Start dev server (runs on http://localhost:5173)
npm run dev
```

### Production Build

```bash
# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint to check for errors and warnings
npm run lint

# ESLint can auto-fix many issues
npm run lint -- --fix
```

---

## 4. Directory Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.jsx              # Main app layout with Outlet
│   │   ├── NavBar.jsx              # Header/navigation
│   │   └── Footer.jsx              # Footer
│   ├── auth/
│   │   └── ProtectedRoute.jsx       # Route protection wrapper
│   ├── admin/
│   │   ├── AdminPanelLayout.jsx     # Admin layout wrapper
│   │   ├── AdminJobsPanel.jsx       # Job management
│   │   ├── AdminUserManagement.jsx  # User management
│   │   ├── AdminNotifications.jsx   # Notification management
│   │   └── ...other admin components
│   ├── account/
│   │   ├── ProfileSection.jsx       # User profile form
│   │   ├── SavedJobsSection.jsx     # Saved jobs list
│   │   └── ...other account sections
│   ├── homepage/
│   │   ├── FeaturedJobs.jsx         # Featured jobs carousel
│   │   └── Testimonials.jsx         # User testimonials
│   ├── ui/
│   │   ├── JobCard.jsx              # Job listing card
│   │   ├── Button.jsx               # Custom button wrapper
│   │   ├── FilterSidebar.jsx        # Job filter controls
│   │   ├── SearchAndFilter.jsx      # Search + filters combo
│   │   └── ...other UI components
│   └── (no barrel exports - import components directly)
├── pages/
│   ├── HomePage.jsx                 # Main job board
│   ├── JobDetailPage.jsx            # Single job details
│   ├── AccountPage.jsx              # User account/profile
│   ├── AdminPage.jsx                # Admin dashboard
│   ├── EmployerDashboard.jsx        # Employer portal
│   ├── BlogPage.jsx                 # Blog listing
│   ├── BlogPostPage.jsx             # Blog post detail
│   ├── LandingPage.jsx              # Hero/intro page
│   ├── AuthPage.jsx                 # Login
│   ├── SignupPage.jsx               # Registration
│   └── ...other pages
├── routes/
│   └── index.jsx                    # Router configuration (createBrowserRouter)
├── context/
│   ├── AuthContext.jsx              # Auth provider
│   ├── AuthContextInstance.js       # Auth context singleton
│   ├── ThemeContext.jsx             # Theme provider
│   └── ThemeContextInstance.js      # Theme context singleton
├── hooks/
│   ├── useJobs.js                   # Hook for job data
│   ├── useAuth.js                   # Hook for auth state
│   ├── useTheme.js                  # Hook for theme
│   └── ...other custom hooks
├── services/
│   ├── jobs.js                      # Job API calls and Firestore queries
│   └── (future: user.js, auth.js, etc.)
├── lib/
│   └── (utilities, helpers - currently unused, reserve for utils)
├── firebase.js                      # Firebase config and initialization
├── main.jsx                         # React entry point
├── App.jsx                          # Root app wrapper
└── index.css                        # Global styles with Tailwind + DaisyUI
```

### Important Notes:
- **No barrel exports** (`index.js` files) in components/ - import components directly
- **Services contain business logic** - all Firebase queries, API calls go here
- **Contexts only for global state** - AuthContext, ThemeContext (no feature-specific contexts)
- **Pages are route-level components** - should be thin wrappers calling hooks and rendering layouts

---

## 7. Testing Guidelines

### Testing is NOT currently implemented

When tests are added in the future, follow these guidelines:

- **Location**: Colocate with source (e.g., `JobCard.test.jsx` next to `JobCard.jsx`)
- **Framework**: Vitest + React Testing Library (lightweight, Vite-native)
- **Focus**: Test user interactions and behavior, not implementation details
- **Coverage**: Aim for >80% on utilities, >60% on components
- **Firebase**: Mock Firebase SDK in tests using `jest.mock()` or `vi.mock()`

```javascript
// Example test (when tests are added)
import { render, screen, fireEvent } from '@testing-library/react'
import JobCard from './JobCard'

describe('JobCard', () => {
  it('displays job title and company', () => {
    render(<JobCard title="React Dev" company="TechCorp" />)
    expect(screen.getByText('React Dev')).toBeInTheDocument()
  })
  
  it('toggles saved state on button click', async () => {
    render(<JobCard title="React Dev" company="TechCorp" />)
    const saveBtn = screen.getByRole('button', { name: /save/i })
    fireEvent.click(saveBtn)
    expect(saveBtn).toHaveTextContent('Saved')
  })
})
```

---

## 7. Boundaries & Safety

### DO NOT MODIFY WITHOUT APPROVAL

- `.gitignore`, `package.json`, `vite.config.js`
- `firebase.json`, `firestore.rules`, `firestore.indexes.json`
- `AGENTS.md` (this file)
- Existing routing structure in `src/routes/index.jsx`
- Authentication/authorization logic in `ProtectedRoute.jsx`

### DO NOT COMMIT

- `.env` or `.env.local` (secrets management)
- `node_modules/`, `dist/`, `.vite/` build artifacts
- IDE-specific files (`.vscode/`, `.idea/`)
- `package-lock.json` or `pnpm-lock.yaml` (choose one per project)
- API keys, Firebase credentials, or any secrets

### When Making Changes

1. **Read existing code** first (understand the pattern, don't break conventions)
2. **Make related changes together** (don't split logically related work)
3. **Test locally** before marking complete (`npm run dev`, check for errors in console)
4. **Keep backwards compatibility** (don't break existing user flows)
5. **Avoid refactoring unrelated code** (stay focused on the task)

### Git Workflow

- **Commit messages**: `feat: add X`, `fix: resolve Y`, `refactor: improve Z`, `docs: update A`
- **Example commits**:
  - `feat: add employer job analytics dashboard`
  - `fix: resolve Firebase auth token refresh issue`
  - `refactor: extract JobCard into smaller components`
  - `docs: update README with new features`
- **Logical commits** over giant single commits
- **Reference issues** if applicable: `feat: add dark mode (closes #42)`

---

## 6. Common Patterns & Examples

### Adding a New Page

1. Create page component in `src/pages/NewPage.jsx`
2. Add route in `src/routes/index.jsx`:
   ```javascript
   {
     path: "new-page",
     element: <NewPage />
   }
   ```
3. Link from navigation: `<Link to="/new-page">Link</Link>`
4. Use `<Outlet />` in Layout for nested content

### Adding a New Feature Component

1. Create in `src/components/ui/FeatureName.jsx`
2. Use default export for consistency
3. Add PropTypes or JSDoc for props documentation
4. Keep under ~200 lines (extract sub-components if needed)
5. Handle loading/error states if async

```javascript
// Example: New UI component
import { motion } from 'framer-motion'
import Button from './Button'

export default function FeatureCard({ title, description, onAction }) {
  return (
    <motion.div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p>{description}</p>
        <Button onClick={onAction}>Action</Button>
      </div>
    </motion.div>
  )
}
```

### Adding Firebase Service Functions

1. Create/edit `src/services/jobs.js` (or create new service file)
2. Export named functions with JSDoc
3. Handle errors with try/catch
4. Always check authentication before data mutations
5. Return plain data (not Firebase objects)

```javascript
// Example: Service function with Firebase
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

/**
 * Fetch jobs by company ID with pagination
 * @param {string} companyId - Company Firebase UID
 * @param {number} pageSize - Results per page
 * @returns {Promise<Array>} Array of job objects
 */
export const fetchCompanyJobs = async (companyId, pageSize = 20) => {
  try {
    const q = query(
      collection(db, 'jobs'),
      where('companyId', '==', companyId),
      limit(pageSize)
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Failed to fetch company jobs:', error)
    throw new Error('Could not fetch jobs')
  }
}
```

### Using Framer Motion

```javascript
import { motion } from 'framer-motion'

export default function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="bg-base-100 rounded-lg p-4"
    >
      {children}
    </motion.div>
  )
}
```

### Using DaisyUI Components

```javascript
import Button from './Button'

export default function MyComponent() {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Title</h2>
        <p>Content</p>
        <div className="card-actions justify-end">
          <Button className="btn-primary">Primary</Button>
          <Button className="btn-ghost">Secondary</Button>
        </div>
      </div>
    </div>
  )
}
```

### Protected Route Component

```javascript
import { Navigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth()
  
  if (loading) return <Spinner />
  if (!user) return <Navigate to="/auth" />
  
  // Add role check if needed
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />
  }
  
  return children
}
```

---

## 8. Styling Best Practices (MANDATORY)

All styling decisions must follow these rules:

- **Tailwind ONLY**: Use utility classes, never inline styles or custom CSS
- **Theme colors**: Use DaisyUI semantic colors (`base-100`, `primary`, `success`, `error`, etc.)
- **Spacing**: Use Tailwind spacing scale only (`gap-2`, `p-4`, `m-6`, etc.)
- **No arbitrary values**: Do NOT use `mt-[37px]` or `text-[13px]` without explicit approval
- **Responsive**: Mobile-first approach with breakpoints (`sm:`, `md:`, `lg:`, `xl:`)
- **Components**: Leverage DaisyUI components instead of building from scratch
- **Animations**: Keep ≤300ms for interactions, use Framer Motion not CSS animations
- **Accessibility**: Ensure proper contrast (DaisyUI handles this), never color-only information

### Example - Good Styling:
```javascript
// ✓ GOOD
<div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
  <div className="card-body gap-4">
    <h2 className="card-title text-lg">Job Title</h2>
    <p className="text-sm text-base-content/70">Description</p>
    <div className="card-actions justify-between pt-4">
      <Badge className="badge-primary">Tag</Badge>
      <Button className="btn-sm">Action</Button>
    </div>
  </div>
</div>

// ✗ AVOID
<div style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
  <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Job Title</h2>
</div>
```

---

## 9. Function Best Practices

All functions must follow these rules:

- Functions should do ONE thing.
- Prefer small, composable functions.
- Avoid deeply nested conditionals.
- Name functions using verbs (`getProjectBySlug`, `formatDate`, `mapProjects`).
- Do NOT inline complex logic inside JSX.
- Memoization (`useMemo`, `useCallback`) should only be used when justified.
- Avoid premature optimization.

---

## 10. Naming Conventions (STRICT)

Use consistent naming everywhere:

- Components: PascalCase
  - `ProjectCard.tsx`
  - `SiteLayout.tsx`
- Hooks: camelCase, prefixed with `use`
  - `useProjects`
  - `useScrollReveal`
- Functions & variables: camelCase
- Constants: SCREAMING_SNAKE_CASE (only for true constants)
- Routes:
  - URL paths use kebab-case
  - Route components use PascalCase
- Files and folders:
  - components: PascalCase
  - utilities/lib files: camelCase
- Boolean variables should read clearly:
  - `isLoading`
  - `hasError`
  - `isActive`

---

## 11. React-Specific Best Practices

- Prefer functional components only.
- Avoid prop drilling beyond 2–3 levels.
- Prefer composition over configuration.
- Keep side effects isolated in hooks.
- Avoid unnecessary re-renders.
- Keep JSX readable:
  - extract complex UI blocks into subcomponents
  - avoid deeply nested JSX trees

---

## 9. Function Best Practices

All functions must follow these rules:

- Functions should do ONE thing.
- Prefer small, composable functions.
- Avoid deeply nested conditionals.
- Name functions using verbs (`getJobBySlug`, `formatDate`, `mapProjects`).
- Do NOT inline complex logic inside JSX.
- Memoization (`useMemo`, `useCallback`) should only be used when justified.
- Avoid premature optimization.

---

## 10. Naming Conventions (STRICT)

Use consistent naming everywhere:

- Components: PascalCase
  - `ProjectCard.jsx`
  - `JobCard.jsx`
- Hooks: camelCase, prefixed with `use`
  - `useProjects`
  - `useJobs`
- Functions & variables: camelCase
- Constants: SCREAMING_SNAKE_CASE (only for true constants)
- Routes:
  - URL paths use kebab-case
  - Route components use PascalCase
- Files and folders:
  - components: PascalCase
  - utilities/lib files: camelCase
- Boolean variables should read clearly:
  - `isLoading`
  - `hasError`
  - `isActive`

---

## 11. React-Specific Best Practices

- Prefer functional components only.
- Avoid prop drilling beyond 2–3 levels.
- Prefer composition over configuration.
- Keep side effects isolated in hooks.
- Avoid unnecessary re-renders.
- Keep JSX readable:
  - extract complex UI blocks into subcomponents
  - avoid deeply nested JSX trees

---

## 12. Accessibility & UX Rules

- All interactive elements must be keyboard accessible.
- Buttons must use `<button>` (not divs).
- Links must use `<a>` or React Router `<Link>`.
- Color contrast must be readable.
- Hover effects must not be the only way information is conveyed.

---

## 13. Mandatory Pre-Build Code Review (NON-NEGOTIABLE)

Before any build step, major change, refactor, or new feature implementation, a full review of the existing codebase is REQUIRED.

This review must include:
- A quick scan of the full folder structure
- A review of recent changes and their intent
- Identification of:
  - duplicated logic
  - unused components or files
  - inconsistent naming or styling
  - overly complex implementations
  - deviations from agents.md rules
- Confirmation that new work aligns with:
  - existing architecture
  - established patterns
  - project goals

Rules:
- Do NOT add new features without understanding the current implementation.
- Do NOT refactor unrelated code unless explicitly instructed.
- If issues or improvements are identified:
  - list them clearly
  - explain impact
  - propose fixes before implementing changes
- Every build should leave the codebase in a clearer, more consistent state than before.

Skipping this review is considered a violation of project rules.

---

**These rules are mandatory and must be followed by any AI agent or human contributor unless explicitly overridden.**

---

## 14. Project-Specific Patterns

### Job Fetching Pattern
```javascript
// Service: jobs.js
export const fetchAggregatedJobs = async (signal) => {
  // Fetch from Arbeitnow API + Firestore + cached jobs
}

// Hook: useJobs()
export const useJobs = () => {
  const [jobs, setJobs] = useState([])
  // Fetch on mount, handle loading/errors
  return { jobs, loading, error }
}

// Component usage:
const { jobs, loading } = useJobs()
```

### User Auth Pattern
```javascript
// Context: AuthContext
const { user, loading } = useAuth()

// Protected route wrapper:
<ProtectedRoute requiredRole="admin">
  <AdminPage />
</ProtectedRoute>

// Component check:
if (!user) return <Navigate to="/auth" />
```

### Saved Jobs Pattern
```javascript
// Firebase structure:
users/{userId}/savedJobs/{jobSlug}

// Component handles:
- Check if saved on mount
- Toggle save/unsave
- Show toast feedback
- Update UI optimistically
```

---

## 15. Summary Checklist for Agents

Before submitting changes:

- [ ] All exports follow convention (default for components/pages, named for utils)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Styling uses ONLY Tailwind (no inline styles or custom CSS)
- [ ] No magic numbers (all values from Tailwind scale)
- [ ] Component under ~200 lines (or extract sub-components)
- [ ] Props documented with JSDoc
- [ ] Firebase calls moved to services (not in components)
- [ ] Loading and error states handled
- [ ] Tested locally: `npm run dev` runs without console errors
- [ ] Mobile responsive (check mobile breakpoints)
- [ ] Accessibility considered (semantic HTML, keyboard nav, ARIA labels if needed)
- [ ] No secrets or API keys committed
- [ ] Git commit message follows convention

---

## 16. Migration Roadmap (Future)

Future improvements planned (NOT immediate):

1. **TypeScript Migration** - Gradual type safety adoption
2. **Component Library** - Extract reusable component patterns
3. **Testing Suite** - Add Vitest + React Testing Library
4. **Monorepo** - Separate API server if backend grows
5. **State Management** - Consider Redux only if needed
6. **GraphQL** - Consider for complex data needs

---

**Last Updated**: January 30, 2026  
**Version**: 1.0  
**Project**: Role Rocket - Job Board Platform
