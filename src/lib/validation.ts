export const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export function validateEmail(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required.";
  if (trimmed.length > 255) return "Email must be less than 255 characters.";
  if (!emailPattern.test(trimmed)) return "Enter a valid email address.";
  return undefined;
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return undefined;
}

export function validateFullName(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Full name is required.";
  if (trimmed.length < 2) return "Enter your full name.";
  if (trimmed.length > 100) return "Full name must be less than 100 characters.";
  return undefined;
}

export function validatePhone(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Phone number is required.";
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!/^\+?[\d\s()-]+$/.test(trimmed) || digits.length < 10 || digits.length > 15) {
    return "Enter a valid phone number (10–15 digits).";
  }
  return undefined;
}
