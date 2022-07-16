import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

export const base64_urlencode = async (str: string) : Promise<string> => (
  sha256(str).toString(Base64)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
)