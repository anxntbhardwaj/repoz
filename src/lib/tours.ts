import shrikhand from "@/assets/shrikhand.jpg";
import kinner from "@/assets/kinner.jpg";
import camping from "@/assets/camping.jpg";
import spiti from "@/assets/spiti.jpg";
import hero from "@/assets/hero.jpg";

export type Stop = {
  day?: number;
  title: string;
  detail: string;
  distance?: string;
  altitude?: string;
  stay?: string;
  meals?: string;
};

export type Tour = {
  id: string;
  title: string;
  region: "Expeditions" | "Himachal" | "Spiti Valley" | "Leh Ladakh" | "Adventure";
  duration: string;
  image: string;
  summary: string;
  altitude?: string;
  difficulty?: string;
  baseCamp?: string;
  distance?: string;
  stops: Stop[];
  highlights: string[];
  inclusions?: string[];
  exclusions?: string[];
  rules?: string[];
  packing?: string[];
  access?: string[];
  suggested?: boolean;
};

const PACKING = [
  "Sturdy high-ankle trekking shoes",
  "Rucksack, 40–50 litres",
  "Thermal inners and warm layers",
  "Quick-dry trek pants",
  "Fleece or sweater",
  "Down / insulated jacket",
  "Waterproof raincoat or poncho",
  "Winter gloves and thermal socks",
  "Water bottles or hydration bladder",
  "Trekking poles",
  "Headlamp or LED torch",
  "Power bank",
  "Sun cap and UV sunglasses",
];

const proposed = (id: string, title: string, region: Tour["region"], image: string, days: readonly (readonly [string, string])[], highlights: string[]): Tour => ({
  id, title, region, image, suggested: true,
  duration: `${days.length - 1} Nights / ${days.length} Days · suggested`,
  summary: `Explore ${title.replace(/ Tour| Trek/g, "")} with our local team. This suggested route is subject to weather, road access and your group's suitability; departure details and inclusions are confirmed with your quote.`,
  stops: days.map(([title, detail], i) => ({ day: i + 1, title, detail })), highlights,
  packing: ["Warm layers and waterproof jacket", "Comfortable walking shoes", "Sun protection and reusable water bottle", "Personal medication and identification"],
  rules: ["Suggested itinerary; final route and services require written confirmation.", "Weather, road closures and local permissions may change the schedule.", "Allow time for acclimatisation on high-altitude journeys.", "Leave No Trace and follow your guide's safety instructions."],
});

const suggestedTours: Tour[] = [
  proposed("complete-himachal", "Himachal Tour", "Himachal", hero, [
    ["Chandigarh to Shimla", "Arrive in Chandigarh and travel to Shimla. Settle in and take a relaxed evening walk if time permits."],
    ["Shimla & Kufri", "Explore The Ridge and Mall Road, with a Kufri excursion subject to access."],
    ["Shimla to Manali", "Travel via the Kullu valley with rest stops along the way."],
    ["Manali", "Visit Hadimba Temple and Old Manali at a comfortable pace."],
    ["Solang Valley", "Spend the day in Solang Valley. Optional activities require separate confirmation and weather approval."],
    ["Manali to Dharamshala", "Scenic road journey to Dharamshala; arrive and rest."],
    ["McLeod Ganj", "Explore the monastery area and local markets, respecting visiting hours."],
    ["Dharamshala to Dalhousie", "Travel to Dalhousie for an unhurried evening."],
    ["Khajjiar", "Excursion to Khajjiar if roads are open, then return to Dalhousie."],
    ["Return to Chandigarh", "Return transfer with departure timing agreed before booking."],
  ], ["Shimla heritage walks", "Kullu & Manali valleys", "McLeod Ganj culture", "Dalhousie & Khajjiar"]),
  proposed("yulla-kanda", "Yulla Kanda Trek", "Expeditions", camping, [
    ["Arrive at Yulla village", "Meet your guide in Kinnaur, complete a gear and fitness check, and rest. Confirm local permissions and trail conditions."],
    ["Yulla to the meadows", "Guided ascent through forest to a suitable meadow campsite. Pace and camp location depend on conditions."],
    ["Yulla Kanda lake & return to camp", "Continue toward the lake and Krishna temple only with guide approval and safe weather; return to camp."],
    ["Descend to Yulla", "Return to the village and finish the trek. Onward travel and any buffer day are confirmed separately."],
  ], ["Kinnaur mountain scenery", "Forest and alpine meadows", "Yulla Kanda lake & Krishna temple", "Locally guided pilgrimage"]),
  proposed("shimla", "Shimla Tour", "Himachal", hero, [
    ["Arrive in Shimla", "Settle in and explore Mall Road and The Ridge at leisure."],
    ["Kufri & Shimla", "Visit Kufri subject to road conditions; return for Shimla sightseeing."],
    ["Departure", "Enjoy a relaxed morning before your pre-agreed departure transfer."],
  ], ["The Ridge & Mall Road", "Kufri views", "Shimla heritage streets"]),
  proposed("kullu-manali", "Kullu Manali Tour", "Himachal", hero, [
    ["Arrive in Manali", "Travel through the Kullu valley, check in and rest."],
    ["Manali local sights", "Explore Hadimba Temple, Old Manali and local markets."],
    ["Solang Valley", "Visit Solang Valley. Activities and high passes are optional and depend on weather and permits."],
    ["Kullu valley", "Take a relaxed Kullu excursion with riverside and village stops agreed with the team."],
    ["Departure", "Return transfer to your confirmed drop point."],
  ], ["Kullu valley scenery", "Old Manali & Hadimba Temple", "Solang Valley views"]),
  proposed("shimla-manali", "Shimla Manali Tour", "Himachal", hero, [
    ["Arrive in Shimla", "Settle in and enjoy an evening walk on Mall Road."],
    ["Shimla & Kufri", "Explore Shimla's heritage centre and visit Kufri if accessible."],
    ["Shimla to Manali", "Scenic drive via Kullu with breaks along the route."],
    ["Manali sightseeing", "Visit Hadimba Temple, Old Manali and local markets."],
    ["Solang Valley", "Visit Solang Valley, with time to enjoy the mountain scenery."],
    ["Departure", "Depart for your agreed drop point after breakfast."],
  ], ["Shimla & Kufri", "Kullu valley drive", "Manali culture", "Solang Valley"]),
  proposed("beautiful-spiti", "Spiti Tour", "Spiti Valley", spiti, [
    ["Arrive in Manali", "Rest in Manali and meet the team. Confirm seasonal pass access before departure."],
    ["Acclimatisation day", "Keep activities light and review road conditions with your guide."],
    ["Manali to Kaza", "Cross toward Spiti only if the seasonal road is open; take regular rest stops."],
    ["Kaza rest & local exploration", "A slower day to acclimatise, with gentle exploration if you feel well."],
    ["Key Monastery & Kibber", "Visit Key Monastery and Kibber, returning to Kaza."],
    ["Langza, Hikkim & Komic", "Explore high villages at a measured pace, subject to access and health."],
    ["Tabo & Dhankar", "Visit monastery sites on a day excursion; avoid strenuous walks if not acclimatised."],
    ["Chandratal", "Travel toward Chandratal only in the open season and with local permission; overnight location is confirmed by the team."],
    ["Return to Manali", "Return via the seasonal pass route, allowing for road delays."],
  ], ["Key & Tabo monasteries", "Kibber and high villages", "Spiti landscapes", "Seasonal Chandratal visit"]),
  proposed("kinnaur-spiti", "Kinnaur Spiti Tour", "Spiti Valley", spiti, [
    ["Arrive in Shimla", "Meet the team and rest before the mountain journey."],
    ["Shimla to Sangla", "Travel into Kinnaur with scenic stops and adequate breaks."],
    ["Chitkul & Kalpa", "Visit Chitkul if accessible, then continue to Kalpa."],
    ["Kalpa to Nako", "Travel to Nako and keep the evening gentle for acclimatisation."],
    ["Nako, Tabo & Kaza", "Visit Tabo en route to Kaza, subject to road and monastery access."],
    ["Kaza acclimatisation", "Rest and explore locally at an easy pace."],
    ["Key Monastery & Kibber", "Excursion to Key and Kibber with your local guide."],
    ["Kaza to Kalpa", "Retrace the route through Kinnaur with regular breaks."],
    ["Return to Shimla", "Finish in Shimla; onward transfer and any weather buffer are agreed separately."],
  ], ["Sangla & Chitkul", "Kalpa mountain views", "Nako & Tabo", "Key Monastery & Kibber"]),
];
const yulla = suggestedTours.find(t => t.id === "yulla-kanda");
if (yulla) { yulla.difficulty = "Challenging high-altitude trek; guide assessment required"; yulla.packing = PACKING; }

export const TOURS: Tour[] = [
  {
    id: "shrikhand-mahadev",
    title: "Shrikhand Mahadev Trek",
    region: "Expeditions",
    duration: "6 Nights / 7 Days",
    image: shrikhand,
    altitude: "18,500 ft",
    difficulty: "Extremely strenuous",
    baseCamp: "Jaon Village, Nirmand, Kullu",
    distance: "34 km one-way · ~68 km round trip",
    summary:
      "Counted among the Panch Kailash, Shrikhand Mahadev is one of the toughest high-altitude pilgrimages in India — a steep, relentless ascent that asks for strong physical and mental fitness.",
    stops: [
      { day: 1, title: "Chandigarh to Jaon", detail: "Cab drive to the Jaon base camp. Check in, rest and acclimatise.", stay: "Jaon homestay" },
      { day: 2, title: "Jaon to Thachadu", detail: "Early start on a moderate-to-steep trail through forest.", distance: "14 km", stay: "Thachadu campsite" },
      { day: 3, title: "Thachadu to Bhimdwari", detail: "Through Kali Ghati, Bhimtalai and Kunsha to the high meadows of Bhimdwari.", distance: "13 km", stay: "Bhimdwari campsite" },
      { day: 4, title: "Summit — Shrikhand Mahadev darshan", detail: "Summit day. Ascend to the sacred peak for darshan and return to Bhimdwari.", distance: "18 km", altitude: "18,500 ft", stay: "Bhimdwari campsite" },
      { day: 5, title: "Bhimdwari to Thachadu", detail: "Descend back to Thachadu for dinner and a night under canvas.", stay: "Thachadu campsite" },
      { day: 6, title: "Thachadu to Jaon", detail: "Final descent to the village. Rest and celebrate.", stay: "Jaon homestay" },
      { day: 7, title: "Jaon to Chandigarh", detail: "After breakfast, cab transfer back to Chandigarh with rest stops en route." },
    ],
    highlights: [
      "Darshan at the 18,500 ft Shrikhand Mahadev rock",
      "Kali Ghati ridge and the Bhimtalai glacial lakes",
      "Bhimdwari's alpine meadows and Parvati Bagh flowers",
      "Panoramic views of the Kullu and Kinnaur ranges",
    ],
    inclusions: [
      "Certified mountain guide",
      "All meals on trek — breakfast, lunch, dinner, tea, coffee, soups, local specialties",
      "Sharing tents on trail and village homestay in Jaon",
      "Porter support — one porter shared between two trekkers",
    ],
    exclusions: [
      "Personal expenses",
      "Meals during road transit",
      "Personal mules or private porters",
      "Emergency rescue and evacuation charges",
      "Anything not listed under inclusions",
    ],
    rules: [
      "Progress depends on mountain weather.",
      "No refund if a participant turns back midway.",
      "Weather buffer days are charged at ₹2,000 per person per day.",
      "Full package payment is due on Day 1, before departure.",
      "Dhoti, sari and non-trekking traditional wear are not allowed on trail.",
      "Leave No Trace — all wrappers and trash are packed out.",
    ],
    packing: PACKING,
  },
  {
    id: "kinner-kailash",
    title: "Kinnar Kailash Trek",
    region: "Expeditions",
    duration: "4 Nights / 5 Days",
    image: kinner,
    altitude: "~16,000 ft",
    difficulty: "Challenging",
    baseCamp: "Tangling Village, Kinnaur",
    summary:
      "A sacred trek to Parvati Kund and the 41-foot natural rock Shivling of Kinner Kailash, dedicated to Lord Shiva and Mata Parvati, high above the Sutlej.",
    access: [
      "Delhi ISBT Kashmiri Gate buses to Rampur / Reckong Peo — alight at Shongtong Bridge",
      "Chandigarh Sector 43 / Kalka HRTC buses to Rampur / Reckong Peo",
      "Private taxis from Chandigarh, Shimla or Rampur",
    ],
    stops: [
      { day: 1, title: "Arrive at Tangling", detail: "Check in at the homestay and acclimatise.", stay: "Tangling homestay", meals: "Welcome tea, Kinnauri dinner" },
      { day: 2, title: "Tangling to Ganesh Park", detail: "Uphill hike of 7–8 hours with the first view of the Shivling in clear weather.", distance: "10 km", altitude: "13,000 ft", stay: "Ganesh Park camp", meals: "Breakfast, trail lunch, pahadi dinner" },
      { day: 3, title: "Summit — Parvati Kund & Shivling", detail: "Start at 1:30 AM to Ganesh Gufa, on to Parvati Kund, then a steep moraine climb to the Shivling. Back to camp by evening.", distance: "~8 km round trip", altitude: "16,000 ft", stay: "Ganesh Park camp", meals: "Packed breakfast, dinner" },
      { day: 4, title: "Ganesh Park to Tangling", detail: "A 5–6 hour descent and an evening of rest at the homestay.", stay: "Tangling homestay", meals: "Breakfast, lunch, dinner" },
      { day: 5, title: "Departure", detail: "Morning checkout and drop at the National Highway.", meals: "Breakfast" },
    ],
    highlights: [
      "The 41 ft monolithic Kinner Kailash Shivling",
      "Sacred Parvati Kund and Ganesh Gufa",
      "Pre-dawn summit push under the stars",
      "Kinnauri homestay culture and cuisine",
    ],
    inclusions: [
      "4 nights — Tangling homestay and alpine camping at Ganesh Park",
      "Daily breakfast and designated trek meals",
      "Certified mountain guide / local trail lead",
      "Local transfers, driver allowance, fuel, tolls and state taxes",
    ],
    exclusions: [
      "Meals outside the set menu and personal items",
      "Gear rentals",
      "District or temple entry permits",
      "Travel or medical insurance",
    ],
    packing: PACKING,
  },
  ...suggestedTours,
];

export const REGIONS = ["Expeditions", "Himachal", "Spiti Valley"] as const;
