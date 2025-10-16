What changed

- Switched authentication token transport from localStorage bearer tokens to httpOnly cookies named `token`.
- Backend now sets the `token` cookie at `/login` and clears it at `/logout`.
- Backend accepts credentials from allowed origins and reads the token from the `Authorization` header (if present) or the `token` cookie.
- Frontend and Dashboard should send requests with credentials so the browser will include cookies automatically.

Frontend changes (what you must do)

- In login requests, the frontend uses axios.post(..., { withCredentials: true }) so the httpOnly cookie sent by the server is stored by the browser.
- Remove direct usage of `localStorage` for storing the JWT. Only non-sensitive user info may be stored in localStorage if desired.
- All API calls that require authentication must include { withCredentials: true } in axios request options (or set axios.defaults.withCredentials = true globally).

Security notes and recommendations

- The token cookie is set with httpOnly so it is not accessible from JS. This improves security against XSS attacks.
- In production enable `secure: true` on cookies to restrict cookies to HTTPS connections.
- Consider setting `SameSite` to `Strict` or `Lax` depending on your cross-site needs. Currently set to `lax` for compatibility with redirects.
- Refresh tokens / rotation: consider implementing refresh token flows if you need long sessions or silent re-auth.

Testing steps

1. Start backend: npm start (already configured) and ensure it's running on port 3002.
2. Start frontend and dashboard dev servers (vite) on ports 5174 and 5173 respectively.
3. On the frontend login page, submit credentials. The backend will respond with a cookie (check browser devtools Application > Cookies).
4. After redirecting to dashboard, try placing an order — the cookie will be sent automatically and the backend will authorize the request.

Computed holdings

- The backend exposes `GET /computedHoldings` which aggregates the user's orders (buys and sells) to compute the current holdings: quantity, average cost and last traded price (derived from order prices). The dashboard calls this endpoint to show up-to-date holdings.

If something still fails: check browser devtools Network tab and ensure:
- The login response sets a `Set-Cookie` header.
- Subsequent API requests include the `cookie` header.
- If cookies are missing, confirm the request had `withCredentials: true` and that CORS origins are correct in backend.
