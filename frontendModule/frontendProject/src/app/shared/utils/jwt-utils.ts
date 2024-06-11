export class JwtUtils {
    /**
     * Function to decode Base64 encoded string
     * @param base64 - The Base64 encoded string
     * @returns The decoded string
     */
    private static base64Decode(base64: string): string {
        // Replace characters as per Base64 encoding standards
        base64 = base64.replace(/-/g, '+').replace(/_/g, '/');

        // Pad with '=' characters to make the string length a multiple of 4
        const pad = base64.length % 4;
        if (pad) {
            base64 += '='.repeat(4 - pad);
        }

        // Decode the Base64 string
        const base64Val = atob(base64);

        // Convert the decoded string to a regular string
        try {
            return decodeURIComponent(escape(base64Val));
        } catch (err) {
            console.error('Error decoding Base64 string:', err);
            return '';
        }
    }

    /**
     * Function to decode JWT token payload
     * @param token - The JWT token as a string
     * @returns The decoded payload as an object
     */
    public static decodeJwtPayload(token: string): object | null {
        try {
            // Split the token into its parts (header, payload, signature)
            const parts = token.split('.');

            if (parts.length !== 3) {
                throw new Error('Invalid token format');
            }

            // Decode the payload part
            const payload = JwtUtils.base64Decode(parts[1]);

            // Parse the payload as JSON
            return JSON.parse(payload);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }
}
