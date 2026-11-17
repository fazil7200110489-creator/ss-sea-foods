"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ContactModalItem } from "./ContactOrderModal";
import { CheckCircle2, ArrowUpRight, Sparkles, Anchor } from "lucide-react";
import { FishHookLine } from "./FishHookLine";
import { useLanguage } from "@/context/LanguageContext";

interface SectionSeafoodDetailsProps {
  onContactOrder: (item: ContactModalItem) => void;
}

interface SeafoodDetailItem {
  id: string;
  sectionNumber: string;
  nameEn: string;
  nameTa: string;
  englishAlt: string;
  tamilName: string;
  categoryEn: string;
  categoryTa: string;
  image: string;
  typicalSizesEn: string;
  typicalSizesTa: string;
  availabilityEn: string;
  availabilityTa: string;
  descriptionEn: string;
  descriptionTa: string;
  culinaryNoteEn: string;
  culinaryNoteTa: string;
  specListEn: string[];
  specListTa: string[];
  badgeEn: string;
  badgeTa: string;
}

const SEAFOOD_VARIETIES_DETAILS: SeafoodDetailItem[] = [
  // SECTION 1: Vanjaram
  {
    id: "vanjaram",
    sectionNumber: "01",
    nameEn: "Vanjaram",
    nameTa: "வஞ்சிரம்",
    englishAlt: "King Seer Fish",
    tamilName: "வஞ்சிரம் / நெய்மீன்",
    categoryEn: "Signature Harvest",
    categoryTa: "முதன்மையான சிறப்பு வகை",
    image: "/fish/vanjaram_ice_platter.jpg",
    typicalSizesEn: "1 kg to 8+ kg Giants",
    typicalSizesTa: "1 கிலோ முதல் 8+ கிலோ வரை",
    availabilityEn: "Live Hooked Daily",
    availabilityTa: "தினசரி அதிகாலை தூண்டில் மீன்",
    descriptionEn:
      "Our core specialty. Specialised in all sizes—from medium table cuts to 6kg+ giant King Seer fish. 100% live hooked with pristine, firm white flesh and unbroken bloodlines.",
    descriptionTa:
      "எங்களின் பிரதான சிறப்பு வகை. 1 கிலோ குடும்ப மீன் முதல் 8+ கிலோ பிரம்மாண்ட கிங் வஞ்சிரம் வரை அனைத்து அளவுகளும் கிடைக்கும். 100% ஒற்றைத் தூண்டிலில் பிடிக்கப்பட்ட உறுதியான வெண் தசை.",
    culinaryNoteEn: "Thick tawa fry center steaks, royal fish biryani & banquet cuts",
    culinaryNoteTa: "தடிமனான தவா வறுவல், மீன் பிரியாணி மற்றும் விருந்து குழம்பு",
    specListEn: [
      "100% Live-Hooked single handline (Zero net pressure trauma)",
      "Specialised in all sizes from 1kg table fish to 8kg+ banquet giants",
      "Custom sliced on demand: Center-cut steaks, fillets, or whole dressed",
      "Chilled in -1.5°C sterile maritime ice slurry for maximum sweetness",
    ],
    specListTa: [
      "100% நேரடி தூண்டில் மீன் (வலை அழுத்தமற்ற தூய தசை)",
      "1 கிலோ முதல் 8+ கிலோ வரை அனைத்து அளவுகளும் தயார்",
      "உங்கள் விருப்பத்திற்கேற்ப துண்டுகளாகவோ அல்லது முழு மீனாகவோ வெட்டித் தருதல்",
      "-1.5°C தூய கடல் பனிக்கூழ் மூலம் சுவை குறையாமல் பாதுகாப்பு",
    ],
    badgeEn: "Harbour Signature Specialty",
    badgeTa: "துறைமுக முதன்மை சிறப்பு",
  },
  // SECTION 2: Sankara
  {
    id: "sankara",
    sectionNumber: "02",
    nameEn: "Sankara",
    nameTa: "சங்கரா மீன்",
    englishAlt: "Coral Red Snapper",
    tamilName: "சங்கரா மீன்",
    categoryEn: "Reef Hook Catch",
    categoryTa: "பவளப்பாறை தூண்டில் மீன்",
    image: "/fish/sankara.png",
    typicalSizesEn: "500g to 2.5 kg sizes",
    typicalSizesTa: "500 கிராம் முதல் 2.5 கிலோ வரை",
    availabilityEn: "Daily Fresh Catch",
    availabilityTa: "அன்றாட புதிய வரத்து",
    descriptionEn:
      "Vibrant coral-red reef catch reeled from deep rocky drop-offs. Flavour-rich skin and moist, tender flakes prized by seafood restaurants for fiery tawa roasts.",
    descriptionTa:
      "ஆழ்கடல் பவளப்பாறைப் பகுதிகளில் தூண்டில் மூலம் பிடிக்கப்படும் சிகப்பு சங்கரா மீன். சுவைமிக்க தோலும், மென்மையான சதையும் கொண்டது; செட்டிநாடு வறுவலுக்கு மிகவும் ஏற்றது.",
    culinaryNoteEn: "Whole fish roasts, grilled fillets & coastal chettinad gravies",
    culinaryNoteTa: "முழு மீன் வறுவல், கிரில் ஃபில்லட் மற்றும் காரசாரமான செட்டிநாடு மீன் குழம்பு",
    specListEn: [
      "Reef handline reeled from rocky drop-offs",
      "Pristine natural coral-red skin with glossy convex eyes",
      "Sweet succulent white flakes with rich natural moisture",
      "Graded by weight for commercial stalls & fine dining kitchens",
    ],
    specListTa: [
      "பாறைப் பகுதிகளில் ஒற்றைத் தூண்டிலில் பிடிக்கப்பட்டது",
      "பளபளப்பான செந்நிறத் தோலும், ஒளிமிக்க விழிகளும்",
      "இயற்கையான கடல் இனிப்பும் ஈரப்பதமும் கொண்ட சதை",
      "உணவகங்கள் மற்றும் குடும்பங்களுக்கான தரமான எடைப் பிரிப்பு",
    ],
    badgeEn: "Reef Handline Reeled",
    badgeTa: "பாறை தூண்டில் மீன்",
  },
  // SECTION 3: Kadalvaral
  {
    id: "kadalvaral",
    sectionNumber: "03",
    nameEn: "Kadalvaral",
    nameTa: "கடவரால் மீன்",
    englishAlt: "Rock Cod / Grouper",
    tamilName: "கடவரால் மீன்",
    categoryEn: "Prized Deep Catch",
    categoryTa: "விலைமதிப்பற்ற ஆழ்கடல் மீன்",
    image: "/fish/boat_landing_catch.jpg",
    typicalSizesEn: "1 kg to 5 kg sizes",
    typicalSizesTa: "1 கிலோ முதல் 5 கிலோ வரை",
    availabilityEn: "Live Hooked Daily",
    availabilityTa: "தினசரி தூண்டில் வரத்து",
    descriptionEn:
      "Prized deep sea predator fish with dense, succulent meat. Outstanding gelatinous texture for traditional coastal meen kuzhambu and heavy restaurant curries.",
    descriptionTa:
      "ஆழ்கடலின் கம்பீரமான கடவரால் மீன். அடர்த்தியான சதையும், குழம்பிற்கு அதிக சுவையூட்டும் தன்மையும் கொண்டது. பாரம்பரிய மீன் குழம்புகளுக்கு மிகச் சிறந்தது.",
    culinaryNoteEn: "Traditional slow-simmered fish curries & head gravies",
    culinaryNoteTa: "பாரம்பரிய மண்பானை மீன் குழம்பு மற்றும் தலை குழம்பு",
    specListEn: [
      "Deep water oceanic predator with firm meat density",
      "Rich natural gelatin in skin and bones for deep flavor extraction",
      "Unmatched flavor retention in spicy tamarind coastal gravies",
      "Day-boat harvest inspected at first light",
    ],
    specListTa: [
      "உறுதியான சதை அமைப்பைக் கொண்ட ஆழ்கடல் மீன்",
      "தோல் மற்றும் எலும்பில் உள்ள இயற்கை சுவை குழம்பிற்கு தனி ருசி தரும்",
      "புளிக்குழம்பு மற்றும் காரக் குழம்புகளில் சுவை குறையாமல் இருக்கும்",
      "அதிகாலைப் படகுகளில் வந்திறங்கிய உடனே தரம் சரிபார்க்கப்பட்டது",
    ],
    badgeEn: "Deep Water Catch",
    badgeTa: "ஆழ்கடல் தூண்டில் வகை",
  },
  // SECTION 4: Soora
  {
    id: "soora",
    sectionNumber: "04",
    nameEn: "Soora",
    nameTa: "சூரை மீன்",
    englishAlt: "Yellowfin Tuna",
    tamilName: "சூரை மீன்",
    categoryEn: "Deep Sea Pelagic",
    categoryTa: "ஆழ்கடல் சூரை மீன்",
    image: "/fish/fresh_steaks_ice.jpg",
    typicalSizesEn: "2 kg to 15 kg Loins",
    typicalSizesTa: "2 கிலோ முதல் 15 கிலோ வரை",
    availabilityEn: "Dawn Daily Catch",
    availabilityTa: "அதிகாலை புதிய வரத்து",
    descriptionEn:
      "Deep sea pelagic tuna harvested at sea dawn. Packed with natural omega oils and pure dark-red protein loins with zero trawler net bruising.",
    descriptionTa:
      "அதிகாலை ஆழ்கடலில் பிடிக்கப்படும் புதிய சூரை மீன் (Tuna). இயற்கை ஒமேகா-3 சத்தும் அடர் சிவப்பு புரோட்டீன் சதையும் கொண்டது; கட்லெட் மற்றும் வறுவலுக்கு உகந்தது.",
    culinaryNoteEn: "Steak searing, tawa fry, fish cutlets & curry chunks",
    culinaryNoteTa: "தவா வறுவல், மீன் கட்லெட், சுக்கா மற்றும் காரக் குழம்பு துண்டுகள்",
    specListEn: [
      "Pelagic day-boat hooked at sea dawn off Kasimedu",
      "Dense, ruby-red lean muscle with rich natural omega-3 oils",
      "Pristine center loin cuts with zero compression bruising",
      "Sub-zero cold chain maintains peak oceanic freshness",
    ],
    specListTa: [
      "காசிமேடு ஆழ்கடலில் அதிகாலை தூண்டிலில் பிடிக்கப்பட்டது",
      "ஒமேகா சத்து நிறைந்த தூய சிவப்பு தசை",
      "வலை நெரிசல் இல்லாத தூய லாயின் துண்டுகள்",
      "குளிர்சங்கிலி மூலம் தரம் பாதுகாக்கப்பட்டு விநியோகம்",
    ],
    badgeEn: "Dawn Pelagic Hooked",
    badgeTa: "அதிகாலை சூரை வரத்து",
  },
  // SECTION 5: Prawns
  {
    id: "prawns",
    sectionNumber: "05",
    nameEn: "Prawns",
    nameTa: "கடல் இறால்",
    englishAlt: "Wild Sea Prawns",
    tamilName: "கடல் இறால்",
    categoryEn: "Wild Shellfish",
    categoryTa: "இயற்கை கடல் வகை",
    image: "/fish/seafood_ice_display.jpg",
    typicalSizesEn: "Medium, Jumbo & Extra-Jumbo Counts",
    typicalSizesTa: "நடுத்தரம், பெரியது மற்றும் ஜம்போ அளவுகள்",
    availabilityEn: "Daily Fresh Catch",
    availabilityTa: "அன்றாட கடல் வரத்து",
    descriptionEn:
      "Wild sea-harvested prawns with firm, snappy bite and oceanic sweetness. Supplied head-on or tail-on for food stalls, biryani houses, and grills.",
    descriptionTa:
      "பண்ணை இறால் அல்லாத, 100% இயற்கை ஆழ்கடலில் பிடிக்கப்படும் கடல் இறால். மொறுமொறுப்பான சுவையும், இனிப்பும் நிறைந்தது; பிரியாணி மற்றும் தொக்குகளுக்கு உகந்தது.",
    culinaryNoteEn: "Prawn thokku, butter garlic sauté, biryani portions & tandoori grills",
    culinaryNoteTa: "இறால் தொக்கு, பட்டர் கார்லிக் ரோஸ்ட், இறால் பிரியாணி மற்றும் தவா வறுவல்",
    specListEn: [
      "100% Wild sea-harvested (Never farmed)",
      "Crunchy, firm snappy bite with natural marine sweetness",
      "Graded by piece count: Medium, Jumbo & Extra-Jumbo",
      "Cleaned head-on or tail-on for food stalls & grills",
    ],
    specListTa: [
      "100% இயற்கைக் கடல் இறால் (பண்ணை இறால் அல்ல)",
      "இனிமையான கடல் சுவையும் நறுக் தன்மையும் கொண்டது",
      "எண்ணிக்கை அடிப்படையில் சரியான தரம் பிரித்தல்",
      "தலை நீக்கியோ அல்லது முழு இறாலாகவோ சுத்தம் செய்து தருதல்",
    ],
    badgeEn: "Wild Saline Snap",
    badgeTa: "இயற்கை கடல் இறால்",
  },
  // SECTION 6: Squid
  {
    id: "squid",
    sectionNumber: "06",
    nameEn: "Squid",
    nameTa: "கணவா மீன்",
    englishAlt: "Fresh Calamari",
    tamilName: "கணவா மீன்",
    categoryEn: "Cephalopod Favorite",
    categoryTa: "சுவையான கணவா வகை",
    image: "/fish/seafood_ice_display.jpg",
    typicalSizesEn: "Whole Tubes & Rings",
    typicalSizesTa: "முழு கணவா மற்றும் ரிங் துண்டுகள்",
    availabilityEn: "Daily Fresh Catch",
    availabilityTa: "தினசரி புதிய வரத்து",
    descriptionEn:
      "Clean, translucent fresh sea calamari. Tender and succulent when flash-fried or butter-tossed; zero rubbery firmness when cooked fresh from ice slurry.",
    descriptionTa:
      "பனிக்கூழில் பாதுகாக்கப்பட்டு வரும் ஒளி ஊடுருவும் புதிய கணவா மீன். சரியான முறையில் சமைத்தால் மென்மையாகவும் சுவையாகவும் இருக்கும்; ரப்பர் போன்ற கடினத்தன்மை இருக்காது.",
    culinaryNoteEn: "Crispy calamari rings, pepper fry, masala roast & butter garlic sauté",
    culinaryNoteTa: "மொறுமொறுப்பான கணவா ரிங்ஸ், மிளகு வறுவல், மசாலா ரோஸ்ட்",
    specListEn: [
      "Clean, translucent white bodies with fresh sea scent",
      "Flash-tender texture without rubbery toughness",
      "Chilled instantly in maritime brine slurry to preserve tenderness",
      "Available as whole tubes, sliced rings, or tentacles",
    ],
    specListTa: [
      "வெண்மையான நிறமும் கடலின் நறுமணமும் கொண்ட தூய கணவா",
      "மென்மையான சுவை, சமைக்கும் போது விரைவாக வேகும் தன்மை",
      "பனிக்கூழ் மூலம் புத்துணர்ச்சியுடன் பதப்படுத்தப்பட்டது",
      "முழுதாகவோ அல்லது ரிங் துண்டுகளாகவோ வெட்டித் தருதல்",
    ],
    badgeEn: "Restaurant Grade A",
    badgeTa: "உயர் தர கணவா",
  },
  // SECTION 7: Kelithee
  {
    id: "kelithee",
    sectionNumber: "07",
    nameEn: "Kelithee",
    nameTa: "கெளுத்தி மீன்",
    englishAlt: "Sea Catfish",
    tamilName: "கெளுத்தி மீன்",
    categoryEn: "Deep Water Coastal",
    categoryTa: "ஆழ்கடல் கெளுத்தி வகை",
    image: "/fish/ocean_handline.jpg",
    typicalSizesEn: "800g to 3 kg sizes",
    typicalSizesTa: "800 கிராம் முதல் 3 கிலோ வரை",
    availabilityEn: "Daily Fresh Catch",
    availabilityTa: "அன்றாட புதிய வரத்து",
    descriptionEn:
      "Deep water coastal catfish known for exceptional rich taste and smooth texture. Cleaned with precision, highly sought-after for village-style spicy tamarind curries.",
    descriptionTa:
      "ஆழ்கடல் கெளுத்தி மீன். தனித்துவமான சுவையும், காரசாரமான கிராமத்து மீன் குழம்புகளுக்கு மிகவும் புகழ்பெற்றது. நன்கு சுத்தம் செய்யப்பட்டு வழங்கப்படுகிறது.",
    culinaryNoteEn: "Village-style tamarind meen kuzhambu & spicy tawa masala",
    culinaryNoteTa: "கிராமத்து புளிக் குழம்பு மற்றும் காரசாரமான தவா மசாலா",
    specListEn: [
      "Deep coastal water habitat with dense rich flake",
      "Cleaned with precision by expert harbor fishmongers",
      "Absorbs heavy coastal spices and tamarind gravies beautifully",
      "Direct dawn harbor supply for dining stalls & homes",
    ],
    specListTa: [
      "ஆழ்கடலில் வாழும் சுவையான கெளுத்தி வகை",
      "துறைமுக வல்லுநர்களால் முறையாக சுத்தம் செய்யப்படுகிறது",
      "மசாலா மற்றும் புளிக் குழம்பின் சுவையை முழுமையாக கிரகிக்கும்",
      "வீடுகள் மற்றும் உணவகங்களுக்கு அன்றாட நேரடி விநியோகம்",
    ],
    badgeEn: "Rich Flavor Density",
    badgeTa: "சுவைமிகு மீன் வகை",
  },
  // SECTION 8: Nethili
  {
    id: "nethili",
    sectionNumber: "08",
    nameEn: "Nethili",
    nameTa: "நெத்திலி மீன்",
    englishAlt: "White Silver Anchovies",
    tamilName: "நெத்திலி மீன்",
    categoryEn: "Shore Sweep Silvers",
    categoryTa: "வெள்ளி நெத்திலி வகை",
    image: "/reference/fresh_silver_tray.png",
    typicalSizesEn: "Uniform Fresh Catch Counts",
    typicalSizesTa: "சீரான அளவிலான நெத்திலி",
    availabilityEn: "Day-Boat Dawn Catch",
    availabilityTa: "அதிகாலை படகு வரத்து",
    descriptionEn:
      "Gleaming pristine silver coastal anchovies reeled in shore dawn sweeps. Firm bodies with crystal clear eyes, perfect for crispy deep fry and traditional thokku.",
    descriptionTa:
      "வெள்ளி நிறத்தில் மின்னும் புத்தம் புதிய நெத்திலி மீன்கள். தெளிவான கண்களும், மொறுமொறுப்பான வறுவலுக்கும் நெத்திலி தொக்கிற்கும் மிகவும் சுவையானது.",
    culinaryNoteEn: "Fiery nethili 65 fry, spicy tomato thokku & crisp appetizer",
    culinaryNoteTa: "நெத்திலி 65 வறுவல், காரசாரமான தக்காளி தொக்கு",
    specListEn: [
      "100% Day-boat shore sweep reeled at morning dawn",
      "Crystal clear eyes with intact shimmering silver coats",
      "Delivered super-chilled for crispy fried texture",
      "Uniform size counts preferred by seafood dining stalls",
    ],
    specListTa: [
      "அதிகாலை படகுகளில் உடனுக்குடன் கொண்டுவரப்பட்டது",
      "ஒளிரும் வெள்ளித் தோலும் உறுதியான சதை அமைப்பும்",
      "வறுவலுக்கு உகந்த பனிக்கூழ் பாதுகாப்பு",
      "உணவகங்களுக்கு விருப்பமான சீரான அளவுகள்",
    ],
    badgeEn: "100% Day-Boat Fresh",
    badgeTa: "அதிகாலை படகு வரத்து",
  },
  // SECTION 9: Ayila
  {
    id: "ayila",
    sectionNumber: "09",
    nameEn: "Ayila",
    nameTa: "அயிலை மீன்",
    englishAlt: "Indian Mackerel",
    tamilName: "அயிலை / அயிலா",
    categoryEn: "Coastal Pelagic",
    categoryTa: "கடல் அயிலை வகை",
    image: "/fish/mathi.png",
    typicalSizesEn: "150g to 300g per fish",
    typicalSizesTa: "150 கிராம் முதல் 300 கிராம் வரை",
    availabilityEn: "Daily Fresh Catch",
    availabilityTa: "அன்றாட புதிய வரத்து",
    descriptionEn:
      "Naturally oily, flavor-dense Indian mackerel. Distinct ocean savoriness, firm meat, and rich healthy fats that make it a cornerstone for everyday dining stalls.",
    descriptionTa:
      "இயற்கையான நல்ல கொழுப்பு மற்றும் ஒமேகா-3 நிறைந்த அயிலை மீன். தனித்துவமான கடல் சுவையும் உறுதியான சதையும் கொண்டது; அன்றாட சமையலுக்கு மிகச் சிறந்தது.",
    culinaryNoteEn: "Spicy meen kuzhambu, rustic coconut curry & crispy shallow fry",
    culinaryNoteTa: "காரசாரமான மீன் குழம்பு, தேங்காய் மீன் குழம்பு மற்றும் பொரித்த மீன்",
    specListEn: [
      "High natural omega-3 oil content and deep oceanic flavor",
      "Firm silvery skin with firm flesh texture",
      "Cornerstone fish for coastal seafood stalls and family dining",
      "Inspected and sorted daily at Kasimedu harbor",
    ],
    specListTa: [
      "உயர் ஒமேகா-3 சத்தும் ஆழ்கடல் சுவையும் கொண்டது",
      "பளபளப்பான வெள்ளித் தோலும் நல்ல சதை அமைப்பும்",
      "மீன் கடைகளுக்கும் குடும்பங்களுக்கும் மிகவும் உகந்தது",
      "காசிமேடு துறைமுகத்தில் நாள்தோறும் தரம் பிரிக்கப்படுகிறது",
    ],
    badgeEn: "Omega-Rich Coastal",
    badgeTa: "ஒமேகா சத்து நிறைந்தது",
  },
  // SECTION 10: Vaala Karuvadu
  {
    id: "vaala-karuvadu",
    sectionNumber: "10",
    nameEn: "Vaala Karuvadu",
    nameTa: "வாலாக் கருவாடு",
    englishAlt: "Sun-Cured Ribbon Fish",
    tamilName: "வாலாக் கருவாடு",
    categoryEn: "Artisanal Sun-Cured",
    categoryTa: "பாரம்பரிய உலர் கருவாடு",
    image: "/reference/sun_cured_trays.png",
    typicalSizesEn: "Whole Strips / Cut Portions",
    typicalSizesTa: "முழு துண்டுகள் மற்றும் நறுக்கிய துண்டுகள்",
    availabilityEn: "Cured & Ready",
    availabilityTa: "எப்போதும் தயார்",
    descriptionEn:
      "Artisanal sun-cured ribbon fish cured using heritage coastal methods. Rubbed with clean sea crystals, dried on raised sea-breeze racks, 100% grit-free and preservative-free.",
    descriptionTa:
      "தூய கடல் உப்பில் ஊறவைத்து, உயர்த்தப்பட்ட வலைகளில் கடல் காற்றில் இயற்கையாக உலர்த்தப்பட்ட வாலாக் கருவாடு. 100% மணல் மற்றும் ரசாயனம் இல்லாதது.",
    culinaryNoteEn: "Karuvadu thokku, brinjal karuvadu kuzhambu & rustic dry fry",
    culinaryNoteTa: "கருவாட்டு தொக்கு, கத்திரிக்காய் கருவாட்டுக் குழம்பு, வறுவல்",
    specListEn: [
      "Cured on raised coconut mesh beds under natural sea breeze",
      "Rubbed with unrefined Tuticorin salt crystals",
      "100% Free of sand grit, zero chemical bleaching",
      "Vacuum-sealed moisture-barrier aroma pouches",
    ],
    specListTa: [
      "உயர்த்தப்பட்ட வலைகளில் சுத்தமான முறையில் உலர்த்தப்பட்டது",
      "தூத்துக்குடி தூய கல் உப்பில் பதப்படுத்தப்பட்டது",
      "100% மணல் அற்றது, எந்தவித ரசாயனமும் சேர்க்கப்படாதது",
      "மணமும் தரமும் மாறாத நவீன காற்றுப்புகா பேக்கிங்",
    ],
    badgeEn: "Artisanal Raised Mesh",
    badgeTa: "சுத்தமான உலர் முறை",
  },
  // SECTION 11: Lobster
  {
    id: "lobster",
    sectionNumber: "11",
    nameEn: "Lobster",
    nameTa: "சிங்க இறால் (லாப்ஸ்டர்)",
    englishAlt: "Spiny Rock Lobster",
    tamilName: "சிங்க இறால் / லாப்ஸ்டர்",
    categoryEn: "Luxury Banquet Grade",
    categoryTa: "உயர் விருந்து தரம்",
    image: "/fish/seafood_ice_display.jpg",
    typicalSizesEn: "400g to 1.8 kg sizes",
    typicalSizesTa: "400 கிராம் முதல் 1.8 கிலோ வரை",
    availabilityEn: "Live Hooked / Blast Chilled",
    availabilityTa: "உயிருடன் / பனிக்கூழ் குளிரூட்டல்",
    descriptionEn:
      "Premium deep-sea spiny rock lobsters. Plump, sweet claw and tail meat with firm springy bite, supplied live or blast-chilled for luxury banquets and specialty restaurants.",
    descriptionTa:
      "ஆழ்கடல் பாறை இடுக்குகளில் பிடிக்கப்படும் அரிய வகை சிங்க இறால் (Lobster). அதிக இனிப்பு சுவையும், பஞ்சு போன்ற தசை அமைப்பும் கொண்டது; சிறப்பு விருந்துகளுக்கு முதன்மையானது.",
    culinaryNoteEn: "Butter garlic poached lobster, grilled thermidor & tandoori roast",
    culinaryNoteTa: "பட்டர் கார்லிக் ரோஸ்ட், கிரில் தெர்மிடார் மற்றும் தந்தூரி வகை",
    specListEn: [
      "Reeled live from deep rocky oceanic drop-offs",
      "Plump, springy tail meat with natural sea-sweet flavor",
      "Supplied live or blast-chilled in insulated containers",
      "Luxury hospitality grade for banquets and fine dining",
    ],
    specListTa: [
      "பாறை ஆழ்கடலில் உயிருடன் பிடிக்கப்பட்டது",
      "இயற்கை இனிப்பும் நறுக் தன்மையும் கொண்ட வால் தசை",
      "உயிருடனோ அல்லது சிறப்பு பனிக்கூழ் பெட்டிகளிலோ விநியோகம்",
      "நட்சத்திர உணவகங்கள் மற்றும் விருந்துகளுக்கான முதல் தரம்",
    ],
    badgeEn: "Luxury Banquet Grade",
    badgeTa: "நட்சத்திர விருந்து தரம்",
  },
];

// Single Detail Row Component with Apple-Style Frosted Glass Cards
function SingleSeafoodRow({
  item,
  onContactOrder,
}: {
  item: SeafoodDetailItem;
  onContactOrder: (c: ContactModalItem) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <section
      id={`detail-${item.id}`}
      ref={rowRef}
      className="relative w-full py-10 sm:py-16 px-4 sm:px-10 lg:px-20 border-t border-[#D2E4F0]/60 bg-transparent text-[#0F2537] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* LEFT SIDE: Fully Transparent Clean Card for Seafood Photograph */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start">
            <motion.div
              style={{ y: imageY }}
              className="relative max-w-lg w-full will-change-transform"
            >
              <div className="relative rounded-[32px] overflow-hidden bg-transparent backdrop-blur-md border border-white/30 p-3 sm:p-4 shadow-[0_20px_45px_rgba(7,21,36,0.1)] hover:shadow-[0_25px_55px_rgba(2,132,199,0.2)] transition-all duration-500">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-transparent">
                  <img
                    src={item.image}
                    alt={`${item.nameEn} (${item.englishAlt})`}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-transparent backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-mono text-[#0284C7] font-black flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#006A60]" />
                  <span>{language === "ta" ? item.badgeTa : item.badgeEn}</span>
                </div>

                {/* Number Strip */}
                <div className="mt-3 p-3.5 rounded-xl bg-transparent backdrop-blur-xs border border-white/25 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#071524] font-black">
                    {language === "ta" ? `பிரிவு ${item.sectionNumber} • ${item.typicalSizesTa}` : `SECTION ${item.sectionNumber} • ${item.typicalSizesEn}`}
                  </span>
                  <span className="text-[#006A60] font-black">
                    {language === "ta" ? item.availabilityTa : item.availabilityEn}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Fully Transparent Clean Information Card */}
          <div className="lg:col-span-5 flex items-start justify-between gap-4">
            <div className="p-6 sm:p-8 rounded-[32px] bg-transparent backdrop-blur-md border border-white/30 shadow-[0_20px_45px_rgba(7,21,36,0.1)] space-y-3.5 max-w-lg w-full">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-transparent border border-white/30 text-[10px] font-mono uppercase tracking-[0.2em] text-[#0284C7] font-black shadow-xs">
                <Anchor className="w-3.5 h-3.5 text-[#006A60]" />
                <span>
                  {language === "ta" ? item.categoryTa : item.categoryEn} • {item.sectionNumber}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="font-serif text-3xl sm:text-5xl font-black text-[#071524] tracking-tight leading-tight drop-shadow-sm">
                  {language === "ta" ? item.nameTa : item.nameEn}
                </h2>
                <div className="font-serif text-lg sm:text-xl font-extrabold text-[#0B1E32]">
                  ({item.englishAlt})
                </div>
                <div className="text-xs sm:text-sm font-mono text-[#006A60] font-black pt-0.5">
                  {item.tamilName}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-sans font-bold text-[#071524] leading-relaxed">
                {language === "ta" ? item.descriptionTa : item.descriptionEn}
              </p>

              {/* Specification Checklist */}
              <div className="space-y-2 pt-1 text-xs font-mono font-bold text-[#071524]">
                {(language === "ta" ? item.specListTa : item.specListEn).map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006A60] shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Culinary note */}
              <div className="p-3.5 rounded-2xl bg-transparent backdrop-blur-xs border border-white/25 text-xs font-mono text-[#071524] font-bold">
                <strong className="text-[#0284C7] font-black">{language === "ta" ? "சிறந்த சமையல் முறை:" : "Best Prepared:"}</strong>{" "}
                {language === "ta" ? item.culinaryNoteTa : item.culinaryNoteEn}
              </div>

              {/* Order / Enquiry Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    onContactOrder({
                      name: `${language === "ta" ? item.nameTa : item.nameEn} (${item.englishAlt})`,
                      category: language === "ta" ? item.categoryTa : item.categoryEn,
                      tamilName: item.tamilName,
                    })
                  }
                  className="px-6 py-2.5 rounded-full bg-[#071524] hover:bg-[#0284C7] text-white text-xs font-sans tracking-wider uppercase font-black transition-all active:scale-95 cursor-pointer shadow-[0_10px_25px_rgba(7,21,36,0.3)] flex items-center gap-2"
                >
                  <span>
                    {language === "ta" ? `${item.nameTa} ஆர்டர் செய்க` : `Order ${item.nameEn}`}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>

                <span className="text-[11px] font-mono text-[#071524] font-black">
                  {language === "ta" ? item.availabilityTa : item.availabilityEn}
                </span>
              </div>
            </div>

            {/* Vertical Hook Line Accent */}
            <div className="hidden sm:block ml-auto pt-2 shrink-0">
              <FishHookLine lineHeight="h-32 sm:h-48" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionSeafoodDetails({ onContactOrder }: SectionSeafoodDetailsProps) {
  return (
    <div id="seafood-details-catalog" className="w-full">
      {SEAFOOD_VARIETIES_DETAILS.map((item) => (
        <SingleSeafoodRow
          key={item.id}
          item={item}
          onContactOrder={onContactOrder}
        />
      ))}
    </div>
  );
}
