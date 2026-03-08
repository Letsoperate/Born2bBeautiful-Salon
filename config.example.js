// ── Local development ──
// Copy this file to config.js and fill in your credentials.
// config.js is gitignored and will NOT be committed.
//
// ── Vercel deployment ──
// Set these as Environment Variables in Vercel Dashboard:
//   Settings → Environment Variables
//   - SUPABASE_URL
//   - SUPABASE_ANON_KEY
//   - GEMINI_API_KEY
// The build script (generate-config.js) will create config.js automatically.

window.B2B_CONFIG = {
  SUPABASE_URL: 'https://YOUR_PROJECT.supabase.co',
  SUPABASE_ANON_KEY: 'YOUR_ANON_KEY_HERE',
  GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
}
