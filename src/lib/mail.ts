import { BRAND } from "./brand";

/**
 * Relays a submission straight to the owner's inbox via FormSubmit — nothing is stored.
 * The very first submission triggers a one-time activation email to the owner.
 */
export async function sendToOwner(subject: string, fields: Record<string, string | number>) {
  const res = await fetch(`https://formsubmit.co/ajax/${BRAND.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ _subject: subject, _template: "table", _captcha: "false", ...fields }),
  });
  if (!res.ok) throw new Error("Mail relay failed");
  return res.json();
}
