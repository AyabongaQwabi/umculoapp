export const CONTACT_EMAIL = "aya@qwabi.co.za";
export const PHONE_NUMBER = "+27603116777";
export const WHATSAPP_NUMBER = "27603116777";

export const WHATSAPP_MESSAGE =
  "Hi! I'd like to enquire about an Umculo artist website.";

export function buildWhatsAppLink(
  message = WHATSAPP_MESSAGE,
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const MAILTO_LINK = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Umculo Website Enquiry")}`;
export const TEL_LINK = `tel:${PHONE_NUMBER.replace(/\s/g, "")}`;
