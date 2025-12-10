
// export function getGuestId(): string | null {
//     const KEY = "guest_id";

//     const existing = localStorage.getItem(KEY);
//     if (existing) return existing;

//     const newId = crypto.randomUUID();
//     localStorage.setItem(KEY, newId);

//     return newId;
// }


export function getGuestId(): string {
    const KEY = "guest_id";

    // 1. Read cookie
    const existing = document.cookie
        .split("; ")
        .find((c) => c.startsWith(KEY + "="));

    if (existing) {
        const token = existing.split("=")[1];
        if (token) return token;
    }

    // 2. Create new UUID
    const newId = crypto.randomUUID();

    // 3. Expire in 1 year
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    // 4. Set cookie (works for HTTP + HTTPS)
    document.cookie = `${KEY}=${newId}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    return newId;
}
