import type { PlanInput, PlanResult } from "./planner";
import type { Tour } from "./tours";

const TERMS: Record<string, string[]> = {
  Pilgrimage: ["sacred", "darshan", "shivling", "pilgrimage"],
  "High summits": ["summit", "altitude", "peak"],
  Camping: ["camp", "tents", "stargazing"],
  "Culture & villages": ["village", "monastery", "homestay", "shimla"],
  Photography: ["views", "panoramic", "spiti", "pangong", "chandratal"],
  "Road trips": ["tour", "transport", "transfers"],
  "Lakes & deserts": ["pangong", "moriri", "chandratal", "spiti"],
  Paragliding: ["paragliding", "tandem"],
};

export function matchTrip(input: PlanInput, tours: readonly Tour[]): PlanResult | null {
  const candidates = tours.filter(
    (t) =>
      t.region !== "Expeditions" ||
      input.fitness === "Experienced trekker" ||
      (input.fitness === "Fit" && t.id !== "shrikhand-mahadev"),
  );
  const ranked = candidates
    .map((tour) => {
      const text = [tour.title, tour.summary, ...tour.highlights, ...tour.stops.map((s) => s.title)]
        .join(" ")
        .toLowerCase();
      const matched = input.interests.filter((interest) =>
        TERMS[interest]?.some((term) => text.includes(term)),
      );
      const noteWords = input.notes
        .toLowerCase()
        .split(/\W+/)
        .filter((word) => word.length > 3);
      const score =
        matched.reduce((sum, interest) => sum + (interest === "Paragliding" ? 8 : 3), 0) +
        noteWords.filter((word) => text.includes(word)).length;
      return { tour, matched, score };
    })
    .sort((a, b) => b.score - a.score);
  const best = ranked[0];
  if (!best) return null;
  const { tour, matched } = best;
  const tips = [
    `Your dates: ${input.dates}. Our team will confirm availability and seasonal access.`,
    `For ${input.group} traveller${input.group === 1 ? "" : "s"}, with a requested budget of ₹${input.budget.toLocaleString("en-IN")} per person. Prices are not published; ask our team for a quote before booking.`,
  ];
  if (tour.region === "Expeditions")
    tips.push(
      `${tour.difficulty}. Guide approval, preparation and acclimatisation are essential; weather can change the route.`,
    );
  else if (tour.region === "Spiti Valley" || tour.region === "Leh Ladakh")
    tips.push(
      "High-altitude road travel still requires acclimatisation. Our team will confirm weather, road access and suitability.",
    );
  else if (tour.id === "shrikhand-camping")
    tips.push(
      "Ask our guides for a campsite and walking route suited to your fitness. High-meadow access is subject to guide approval.",
    );
  else if (tour.id === "kullu-paragliding")
    tips.push(
      "Flights depend on weather and pilot approval. Confirm individual health and safety requirements with our team.",
    );
  return {
    tourId: tour.id,
    headline: tour.title,
    why: matched.length
      ? `A match for your interest in ${matched.join(", ").toLowerCase()}, selected from our own journeys. ${tour.summary}`
      : `A journey from our catalogue to start the conversation. ${tour.summary}`,
    itinerary: tour.stops.map((stop) => ({
      day: stop.day,
      title: stop.title,
      detail: stop.detail,
    })),
    tips,
  };
}
