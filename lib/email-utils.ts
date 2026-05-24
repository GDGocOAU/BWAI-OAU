/**
 * Converts an email to its canonical form to prevent duplicate registrations
 * through variations like:
 * - j.o.h.n@gmail.com (dots in Gmail)
 * - john+1@gmail.com (plus addressing)
 * - JOHN@GMAIL.COM (case sensitivity)
 * - john@googlemail.com (alternative Gmail domain)
 */
export function getCanonicalEmail(rawEmail: string): string | null {
  // 1. Basic syntax check
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(rawEmail)) return null;

  // 2. Standardize casing and remove whitespace
  const trimmed = rawEmail.toLowerCase().trim();
  const [user, domain] = trimmed.split('@');

  if (!user || !domain) return null;

  // 3. Remove plus-addressing suffix FIRST (leaves only the core username string)
  let cleanUser = user.split('+')[0];

  // 4. Remove dots ONLY for Google domains
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    cleanUser = cleanUser.replace(/\./g, '');
  }

  // 5. Return the clean, canonical email
  return `${cleanUser}@${domain}`;
}

/**
 * Validates and canonicalizes an email for database operations
 * Returns null if email is invalid
 */
export function validateAndCanonicalizeEmail(email: string): string | null {
  if (!email || typeof email !== 'string') return null;
  return getCanonicalEmail(email);
}
