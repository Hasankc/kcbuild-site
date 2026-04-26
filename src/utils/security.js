// src/utils/security.js
// ─────────────────────────────────────────────────────────────────────────────
// OWASP Top 10 mitigations for KC Build frontend
// A03: Injection | A07: XSS | A04: Insecure Design | A09: Logging failures
// ─────────────────────────────────────────────────────────────────────────────

// ── A03 Injection + A07 XSS ──────────────────────────────────────────────────
// Strip all HTML tags and dangerous characters from user input
export function sanitizeInput(value) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[<>]/g, '')                        // strip < > (XSS tags)
    .replace(/javascript:/gi, '')                // strip JS protocol
    .replace(/on\w+\s*=/gi, '')                  // strip event handlers
    .replace(/data:/gi, '')                      // strip data URIs
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '') // strip control chars
    .trim()
}

// Sanitize an entire form object
export function sanitizeForm(formObj) {
  const clean = {}
  for (const [key, value] of Object.entries(formObj)) {
    clean[key] = sanitizeInput(value)
  }
  return clean
}

// ── A04 Insecure Design — Input Validation ────────────────────────────────────
export const validators = {
  name(value) {
    if (!value || value.trim().length < 2) return 'Name must be at least 2 characters'
    if (value.trim().length > 100) return 'Name is too long'
    if (!/^[\p{L}\p{M}\s'\-,.]+$/u.test(value)) return 'Name contains invalid characters'
    return null
  },

  email(value) {
    if (!value || !value.trim()) return 'Email is required'
    if (value.length > 254) return 'Email is too long'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email'
    // Block disposable email domains
    const blocked = ['mailinator.com', 'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email']
    const domain = value.split('@')[1]?.toLowerCase()
    if (blocked.includes(domain)) return 'Please use a real email address'
    return null
  },

  phone(value) {
    if (!value) return null // optional field
    const digits = value.replace(/[\s\-().+]/g, '')
    if (!/^\d{7,15}$/.test(digits)) return 'Please enter a valid phone number'
    return null
  },

  message(value) {
    if (!value || value.trim().length < 10) return 'Message must be at least 10 characters'
    if (value.trim().length > 2000) return 'Message is too long (max 2000 characters)'
    return null
  },
}

export function validateForm(form) {
  const errors = {}
  const nameErr = validators.name(form.name)
  const emailErr = validators.email(form.email)
  const phoneErr = validators.phone(form.phone)
  const messageErr = validators.message(form.message)
  if (nameErr) errors.name = nameErr
  if (emailErr) errors.email = emailErr
  if (phoneErr) errors.phone = phoneErr
  if (messageErr) errors.message = messageErr
  return errors
}

// ── A04 Insecure Design — Rate Limiting ──────────────────────────────────────
// Prevents spam submissions — max 3 attempts per 10 minutes per browser
const RATE_LIMIT_KEY = 'kc_form_attempts'
const MAX_ATTEMPTS = 3
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes

export function checkRateLimit() {
  try {
    const stored = sessionStorage.getItem(RATE_LIMIT_KEY)
    const data = stored ? JSON.parse(stored) : { attempts: 0, windowStart: Date.now() }

    // Reset window if expired
    if (Date.now() - data.windowStart > WINDOW_MS) {
      data.attempts = 0
      data.windowStart = Date.now()
    }

    if (data.attempts >= MAX_ATTEMPTS) {
      const remaining = Math.ceil((WINDOW_MS - (Date.now() - data.windowStart)) / 60000)
      return { allowed: false, remaining }
    }

    data.attempts += 1
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(data))
    return { allowed: true, remaining: MAX_ATTEMPTS - data.attempts }
  } catch {
    return { allowed: true, remaining: MAX_ATTEMPTS }
  }
}

// ── A09 Security Logging ──────────────────────────────────────────────────────
// Log security events (no sensitive data logged)
export function logSecurityEvent(event, details = {}) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[SECURITY] ${event}`, details)
  }
  // In production you would send this to a logging service
  // never log passwords, emails, or personal data
}

// ── A08 Software Integrity — Safe external link helper ───────────────────────
export function safeExternalUrl(url) {
  try {
    const parsed = new URL(url)
    const allowedProtocols = ['https:', 'mailto:']
    if (!allowedProtocols.includes(parsed.protocol)) {
      logSecurityEvent('BLOCKED_UNSAFE_URL', { protocol: parsed.protocol })
      return null
    }
    return url
  } catch {
    return null
  }
}

// ── Honeypot field helper — catches bots ──────────────────────────────────────
// Add a hidden field to your form; bots fill it in, humans don't
export function isHoneypotTriggered(honeypotValue) {
  return honeypotValue && honeypotValue.length > 0
}
