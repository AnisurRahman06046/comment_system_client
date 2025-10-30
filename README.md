# Comment System Frontend

A modern, real-time comment system built with React, TypeScript, and Tailwind CSS. Features include authentication, nested replies, reactions (like/dislike), sorting, pagination, and live WebSocket updates.

## Livesite link : https://comment-system-demo.netlify.app

## Features

### Core Features

- ✅ **User Authentication** - JWT-based login/register with protected routes
- ✅ **Comment CRUD** - Create, read, update, and delete comments
- ✅ **Nested Replies** - Reply to comments (1 level deep)
- ✅ **Reactions** - Like/Dislike comments (one reaction per user with visual indicators)
- ✅ **Sorting** - Sort by newest, most liked, or most disliked
- ✅ **Pagination** - Cursor-based pagination with "Load More"
- ✅ **Real-time Updates** - WebSocket integration for live updates across all users
- ✅ **Toast Notifications** - User feedback for all actions

### Technical Features

- ✅ **TypeScript** - Full type safety
- ✅ **Context API** - State management for auth, comments, and socket
- ✅ **React Hook Form + Zod** - Form validation
- ✅ **Tailwind CSS** - Modern, responsive UI
- ✅ **React Router** - Client-side routing with protected routes
- ✅ **Socket.io Client** - Real-time WebSocket connection
- ✅ **Modular Architecture** - Clean separation of concerns

## Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4
- **State Management:** React Context API
- **Routing:** React Router DOM v7
- **Forms:** React Hook Form + Zod
- **Real-time:** Socket.io Client v4.8
- **HTTP Client:** Fetch API
- **Notifications:** React Hot Toast

## Prerequisites

- Node.js 20.18+ or 22.12+
- npm (v10+)
- Running backend server on `http://localhost:5000` (see backend README)

## Installation

1. **Clone the repository and navigate to frontend:**

   ```bash
   cd mern-comments-system/frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory:

   ```env
   VITE_API_URL=http://localhost:5000/api/v1
   VITE_SOCKET_URL=http://localhost:5000
   ```

## Development

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Access the application:**

   ```
   http://localhost:5174
   ```

   (Vite will use port 5174 if 5173 is occupied)

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Preview production build:**

   ```bash
   npm run preview
   ```

5. **Lint code:**
   ```bash
   npm run lint
   ```

## Project Structure

```
src/
├── components/
│   ├── comments/          # Comment-related components
│   │   ├── AddCommentForm.tsx      # Form to create comments
│   │   ├── CommentItem.tsx         # Individual comment display
│   │   ├── CommentList.tsx         # List of comments with loading states
│   │   ├── LoadMoreButton.tsx      # Pagination button
│   │   ├── RepliesList.tsx         # Nested replies display
│   │   ├── ReplyForm.tsx           # Form to reply to comments
│   │   └── SortDropdown.tsx        # Sort options dropdown
│   ├── common/            # Reusable UI components
│   │   ├── ConnectionStatus.tsx    # WebSocket status indicator
│   │   ├── ProtectedRoute.tsx      # Auth guard for routes
│   │   └── ToastProvider.tsx       # Toast notification setup
│   └── layout/            # Layout components
│       ├── Header.tsx              # App header with user info
│       └── Layout.tsx              # Page layout wrapper
├── contexts/              # React Context providers
│   ├── AuthContext.tsx             # Authentication state & actions
│   ├── CommentContext.tsx          # Comments state & CRUD operations
│   └── SocketContext.tsx           # WebSocket connection management
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts                  # Auth context hook
│   ├── useComments.ts              # Comments context hook
│   ├── useFetch.ts                 # Generic async hook
│   └── useSocket.ts                # Socket context hook
├── pages/                 # Page components
│   ├── CommentsPage.tsx            # Main comments page
│   ├── LoginPage.tsx               # Login page
│   ├── RegisterPage.tsx            # Registration page
│   └── NotFoundPage.tsx            # 404 page
├── routes/                # Route configuration
│   └── index.tsx                   # All app routes
├── services/              # API services layer
│   ├── api.ts                      # Fetch wrapper with auth
│   ├── authService.ts              # Auth API calls
│   └── commentService.ts           # Comment API calls
├── types/                 # TypeScript type definitions
│   └── index.ts                    # All app types
├── utils/                 # Utility functions
│   ├── constants.ts                # App constants & endpoints
│   ├── helpers.ts                  # Helper functions
│   ├── toast.ts                    # Toast notification helpers
│   └── validators.ts               # Zod validation schemas
├── App.tsx                         # Main app component
├── main.tsx                        # Entry point
└── index.css                       # Tailwind CSS imports
```

## Key Features Explained

### 1. Authentication System

- **JWT-based authentication** with token stored in localStorage
- **Protected routes** redirect to login if not authenticated
- **Auto-login** on page refresh if valid token exists
- **Auto-logout** on 401 responses or manual logout
- **User profile display** in header with avatar (initials)

### 2. Real-time Updates (WebSocket)

- **Automatic connection** on login with JWT authentication
- **Auto-reconnection** on disconnect (5 attempts, 1s delay)
- **Real-time updates** for:
  - ✅ New comments appear instantly
  - ✅ Comment edits update live
  - ✅ Comment deletes remove instantly
  - ✅ Reaction counts (like/dislike) update in real-time
  - ✅ New replies show up automatically
  - ✅ Reply reactions update live
- **Connection status indicator** in header (🟢 green = live, 🔴 red = disconnected)
- **Optimistic updates** - Your own actions appear instantly

### 3. Comments System

#### Create Comments

- Textarea with validation (1-1000 characters)
- Character counter
- Submit button with loading state
- Success/error toast notifications

#### Edit Comments

- Inline editing (only for comment author)
- Save/Cancel buttons
- Character counter
- Real-time sync across users

#### Delete Comments

- Confirmation modal before delete
- Only comment author can delete
- Real-time removal for all users

#### Reply to Comments

- Click "Reply" button on any top-level comment
- Inline reply form with "Replying to [Name]"
- Replies are indented with visual hierarchy
- Show/Hide replies toggle
- Pagination for replies (Load more)

#### Reactions (Like/Dislike)

- One reaction per user per comment
- Visual indicators:
  - 🔵 **Blue** when you've liked (filled icon)
  - 🔴 **Red** when you've disliked (filled icon)
  - ⚪ **Gray** when no reaction (outline icon)
- Toggle reaction (click again to remove)
- Switch reactions (like → dislike)
- Real-time count updates

### 4. Sorting & Pagination

#### Sorting

- **Newest First** - Sort by creation date (default)
- **Most Liked** - Sort by like count
- **Most Disliked** - Sort by dislike count
- Automatically refetches with new sort

#### Pagination

- **Cursor-based pagination** for efficient loading
- "Load More" button when more comments available
- Appends new comments without replacing existing
- Separate pagination for replies
- Loading states and skeleton screens

### 5. Form Validation

All forms use **React Hook Form + Zod** for validation:

**Login:**

- Email: Required, valid format
- Password: Required, min 6 characters

**Register:**

- First Name: Required, 2-50 characters
- Last Name: Required, 2-50 characters
- Email: Required, valid format, unique
- Password: Required, 6-100 chars, must have uppercase, lowercase, number

**Comments:**

- Content: Required, 1-1000 characters

## User Flow

### Registration Flow

1. Navigate to `/register`
2. Fill in: First Name, Last Name, Email, Password
3. Submit → Auto-login → Fetch user data → Redirect to `/comments`
4. See success toast: "Account created successfully!"

### Login Flow

1. Navigate to `/login`
2. Enter: Email, Password
3. Submit → Get token → Fetch user data → Redirect to `/comments`
4. See success toast: "Login successful! Welcome back."

### Comment Workflow

1. **View Comments:** Auto-fetched on page load, sorted by newest
2. **Add Comment:** Type in form → Submit → Appears at top → Toast notification
3. **Edit Comment:** Click "Edit" → Modify text → Save → Toast notification
4. **Delete Comment:** Click "Delete" → Confirm in modal → Removed → Toast notification
5. **React:** Click Like/Dislike → Color changes → Count updates (no toast for better UX)
6. **Reply:** Click "Reply" → Type → Submit → Shows in replies section
7. **View Replies:** Click "Show Replies (X)" → Expands nested replies
8. **Sort:** Change dropdown → Comments refetch with new order
9. **Load More:** Click button → Fetches next page → Appends to list

## Environment Variables

| Variable          | Description                                   | Default                        | Required |
| ----------------- | --------------------------------------------- | ------------------------------ | -------- |
| `VITE_API_URL`    | Backend REST API base URL                     | `http://localhost:5000/api/v1` | Yes      |
| `VITE_SOCKET_URL` | Socket.io server URL (use http://, not ws://) | `http://localhost:5000`        | Yes      |

**Note:** Socket.io uses HTTP URLs and automatically upgrades to WebSocket protocol (`ws://`). Don't use `ws://` directly.

## Available Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start development server (http://localhost:5174) |
| `npm run build`   | Build for production (outputs to `dist/`)        |
| `npm run preview` | Preview production build locally                 |
| `npm run lint`    | Run ESLint on TypeScript files                   |

## Authentication Requirements

### Password Requirements (Backend Validation)

- Minimum 6 characters
- Must contain at least one uppercase letter
- Must contain at least one lowercase letter
- Must contain at least one number

Example valid passwords: `Test1234`, `MyPass123`, `Hello123`

### Email Requirements

- Valid email format
- Must be unique (checked by backend)

## API Integration

### Service Architecture

All API calls are handled through service layers for clean separation:

**AuthService** (`services/authService.ts`):

- `login(credentials)` - Authenticate user
- `register(userData)` - Create new account
- `logout()` - Clear session
- `getCurrentUser()` - Get user from localStorage
- `isAuthenticated()` - Check auth status
- `fetchCurrentUser()` - Refresh user from API

**CommentService** (`services/commentService.ts`):

- `getComments(cursor, limit, sortBy)` - Fetch comments
- `createComment(data)` - Create new comment
- `updateComment(id, data)` - Update comment
- `deleteComment(id)` - Delete comment
- `getReplies(commentId, cursor, limit)` - Fetch replies
- `toggleReaction(commentId, type)` - Like/Dislike

**API Wrapper** (`services/api.ts`):

- Centralized fetch wrapper with:
  - ✅ Auto JWT token injection
  - ✅ Error handling with custom APIError class
  - ✅ 401 auto-logout
  - ✅ Type-safe responses
  - ✅ CORS credentials support

## Real-time Events

The app listens to these Socket.io events:

| Event              | Payload                        | Description                   |
| ------------------ | ------------------------------ | ----------------------------- |
| `comment:new`      | `{ comment }`                  | New top-level comment created |
| `comment:update`   | `{ comment }`                  | Comment content edited        |
| `comment:delete`   | `{ commentId }`                | Comment soft-deleted          |
| `comment:reaction` | `{ comment }`                  | Like/Dislike added or removed |
| `comment:reply`    | `{ comment, parentCommentId }` | New reply to a comment        |

### Socket Connection

- **Authentication:** JWT token sent in auth handshake
- **Auto-connect:** On user login
- **Auto-disconnect:** On user logout or unmount
- **Reconnection:** Automatic with 5 attempts, 1s delay
- **Status Indicator:** Visual feedback in header

## Component Hierarchy

```
App
├── Router
│   ├── AuthProvider
│   │   ├── SocketProvider
│   │   │   ├── CommentProvider
│   │   │   │   ├── Routes
│   │   │   │   │   ├── LoginPage (public)
│   │   │   │   │   ├── RegisterPage (public)
│   │   │   │   │   ├── CommentsPage (protected)
│   │   │   │   │   │   ├── Layout
│   │   │   │   │   │   │   ├── Header
│   │   │   │   │   │   │   │   └── ConnectionStatus
│   │   │   │   │   │   │   └── CommentsPage Content
│   │   │   │   │   │   │       ├── AddCommentForm
│   │   │   │   │   │   │       ├── SortDropdown
│   │   │   │   │   │   │       ├── CommentList
│   │   │   │   │   │   │       │   └── CommentItem (for each comment)
│   │   │   │   │   │   │       │       ├── ReplyForm (when replying)
│   │   │   │   │   │   │       │       └── RepliesList
│   │   │   │   │   │   │       │           └── CommentItem (for each reply)
│   │   │   │   │   │   │       └── LoadMoreButton
│   │   │   │   │   └── NotFoundPage
│   │   │   │   └── ToastProvider
```

## State Management

### AuthContext

- **State:** `user`, `isAuthenticated`, `loading`
- **Actions:** `login()`, `register()`, `logout()`
- **Storage:** localStorage for token and user data

### CommentContext

- **State:** `comments[]`, `loading`, `error`, `hasMore`, `nextCursor`, `sortBy`
- **Actions:**
  - `fetchComments()` - Load comments with pagination
  - `addComment()` - Create comment or reply
  - `editComment()` - Update comment content
  - `removeComment()` - Delete comment
  - `reactToComment()` - Like/Dislike
  - `setSortBy()` - Change sort order
  - `loadMore()` - Load next page
- **Real-time:** Listens to socket events and updates state

### SocketContext

- **State:** `socket`, `connected`
- **Actions:** Auto-connect/disconnect based on auth
- **Features:** JWT auth, reconnection logic

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (responsive design)

## Responsive Design

- **Desktop:** Full layout with side-by-side elements
- **Tablet:** Adjusted spacing and font sizes
- **Mobile:** Stacked layout, hidden user details in header
- **Breakpoints:** Tailwind's default (sm: 640px, md: 768px, lg: 1024px)

## Accessibility

- Semantic HTML elements
- ARIA labels on form inputs
- Keyboard navigation support
- Focus states on interactive elements
- Alt text for icons (via SVG titles)

## Error Handling

### Network Errors

- Fetch failures show toast: "Network error. Please check your connection."
- Auto-retry for socket reconnection

### API Errors

- 401 Unauthorized → Auto-logout → Redirect to login
- 403 Forbidden → Toast notification
- 404 Not Found → Toast notification
- 400 Validation → Error messages under form fields

### User Feedback

- ✅ Toast notifications for all major actions
- ✅ Loading spinners during async operations
- ✅ Error messages inline on forms
- ✅ Empty states when no data
- ✅ Skeleton loaders while fetching

## Performance Optimizations

- ✅ **Lazy loading:** Code splitting ready
- ✅ **Memoization:** Prevents unnecessary re-renders
- ✅ **Debouncing:** For search/filter (ready for implementation)
- ✅ **Cursor pagination:** Efficient data loading
- ✅ **Optimistic updates:** Instant UI feedback
- ✅ **WebSocket:** Reduces polling, saves bandwidth

## Security Features

- ✅ JWT token authentication
- ✅ Protected routes (redirect if not authenticated)
- ✅ Auto-logout on token expiration
- ✅ CORS credentials included
- ✅ XSS prevention (React auto-escapes)
- ✅ CSRF protection via SameSite cookies (backend)

## Testing the Application

### Manual Testing Checklist

**Authentication:**

- [ ] Register new user → Success toast → Redirect to comments
- [ ] Login with valid credentials → Success toast → Redirect
- [ ] Login with invalid credentials → Error toast
- [ ] Logout → Redirect to login
- [ ] Try accessing /comments without login → Redirect to login
- [ ] Refresh page while logged in → Stay logged in

**Comments:**

- [ ] Create comment → Appears at top → Toast notification
- [ ] Edit own comment → Updates → Toast
- [ ] Try to edit other's comment → No edit button visible
- [ ] Delete own comment → Confirmation modal → Removed → Toast
- [ ] Like comment → Blue color → Count increases
- [ ] Unlike (click again) → Gray color → Count decreases
- [ ] Switch like to dislike → Colors switch → Counts update
- [ ] Sort by most liked → Comments reorder
- [ ] Load more → Appends comments

**Replies:**

- [ ] Click Reply on comment → Form appears
- [ ] Submit reply → Appears in replies → Form closes
- [ ] Show/Hide replies → Expands/collapses
- [ ] Reply reactions work same as comments
- [ ] Edit/Delete replies (if author)

**Real-time (Use 2 browsers):**

- [ ] User A creates comment → User B sees instantly
- [ ] User A edits comment → User B sees update
- [ ] User A deletes comment → User B sees removal
- [ ] User A likes comment → User B sees count increase
- [ ] User A replies → User B sees reply (if expanded)
- [ ] Connection indicator shows green on both

## Troubleshooting

### Issue: Comments not loading

- **Check:** Backend server is running on http://localhost:5000
- **Check:** CORS_ORIGIN in backend .env includes http://localhost:5174
- **Fix:** Restart backend server

### Issue: Socket not connecting

- **Check:** Green "Live" indicator in header
- **Check:** Browser console for connection errors
- **Fix:** Verify VITE_SOCKET_URL in .env
- **Fix:** Check backend socket.io CORS configuration

### Issue: Toast notifications not showing

- **Check:** ToastProvider is in App.tsx
- **Fix:** Hard refresh browser (Ctrl+Shift+R)

### Issue: Login fails with network error

- **Check:** Backend is running
- **Check:** API URL is correct in .env
- **Fix:** Clear browser cache and localStorage

## Environment Setup

### Development

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

**Important:** Use `http://` for VITE_SOCKET_URL, NOT `ws://`. Socket.io automatically upgrades to WebSocket.

### Production (Example)

```env
VITE_API_URL=https://api.yourdomain.com/api/v1
VITE_SOCKET_URL=https://api.yourdomain.com
```

**Important:** For production, use `https://` (not `wss://`). Socket.io auto-upgrades to `wss://` (secure WebSocket).

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables (Production)

Don't forget to set:

- `VITE_API_URL` - Your production backend URL
- `VITE_SOCKET_URL` - Your production socket URL

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Infinite scroll option
- [ ] Image/GIF uploads in comments
- [ ] Mention system (@username autocomplete)
- [ ] Rich text editor (Markdown support)

## License

ISC

**Built with ❤️ as part of MERN Stack Comment System Assessment**
