// Standard Web Crypto API SHA-256 hashing

export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyFlag(submittedFlag: string, expectedHash: string): Promise<boolean> {
  const cleaned = submittedFlag.trim();
  const hash = await sha256(cleaned);
  return hash.toLowerCase() === expectedHash.toLowerCase();
}
