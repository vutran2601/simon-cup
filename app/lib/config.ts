export const CONFIG = {
  AUTHORIZED_EMAILS: [
    "nguyenvutran2601@gmail.com"
  ]
};

export const isAuthorizedEmail = (email: string): boolean => {
  return CONFIG.AUTHORIZED_EMAILS.includes(email);
};