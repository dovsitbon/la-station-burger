// Fonction serverless Vercel : POST /api/contact
// Variables d'environnement requises : RESEND_API_KEY, CONTACT_TO, CONTACT_FROM (voir .env.example).
import { handleContact } from '../lib/contact-handler.js';

export function POST(request) {
  return handleContact(request);
}
