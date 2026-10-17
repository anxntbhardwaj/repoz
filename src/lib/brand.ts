export const BRAND = {
  name: "Altitude Climber",
  tagline: "Hidden Trails, Bigger Stories",
  slogan: "Trekking — Beyond Limits",
  owner: "Rakesh Kumar",
  googleReviews: "https://g.page/r/CbthFu0w1xz4EBM/review",
  whatsapp: "918894097718",
  phonePrimary: "+91 88940 97718",
  email: "altitudeclimber.team@gmail.com",
  address: "Village Kalont, P.O. Jaon, Tehsil Nirmand, District Kullu, Himachal Pradesh 172002",
  hours: "Monday – Sunday, 9:00 AM – 6:00 PM",
  since: 2025,
  instagram: "https://www.instagram.com/altitude_climber_69",
  facebook: "https://www.facebook.com/share/18hkNTNvpL/",
  logoDay: "https://file.garden/aeySfh58aX0K8a6A/day-altitude",
  logoNight: "https://file.garden/aeySfh58aX0K8a6A/night-altitude",
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${BRAND.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
