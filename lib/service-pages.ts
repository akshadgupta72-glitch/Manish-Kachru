import { manishImage, serviceImage, videoFile } from "@/lib/media";

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  videoSrc: string;
  videoLabel: string;
  detailEyebrow: string;
  detailTitle: string;
  detailIntroTitle: string;
  detailIntro: string;
  details: {
    label: string;
    value: string;
  }[];
  learnItems?: string[];
  looksVideos: string[];
  showLooksTicker?: boolean;
  looksEyebrow: string;
  looksTitle: string;
  bookingEyebrow: string;
  bookingTitle: string;
  bookingDescription: string;
  functions: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

const bridalVideos = [
  videoFile("Bridal looks by manish optimised", "what you get.mp4"),
  videoFile("Bridal looks by manish optimised", "SaveClip.App_AQPrWB-9zSnf-ZPXzDCuStMeH--l7661cwCZWG9zxxvNZWnNt9zDJ4GW0qlXZyV7fgv8fAOYw_BcNHgHhiRhrl58fD8atK9609d0vew.mp4"),
  videoFile("Bridal looks by manish optimised", "Video-129.mp4"),
  videoFile("Bridal looks by manish optimised", "Video-166.mp4"),
  videoFile("Bridal looks by manish optimised", "Video-24.mp4"),
  videoFile("Bridal looks by manish optimised", "Video-726.mp4"),
  videoFile("Bridal looks by manish optimised", "Video-960.mp4")
];

const editorialPartyVideos = [
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_0174.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_1083.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_1103.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_3992.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_5253.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_6481.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_6657.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_8068.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_9368.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_9496.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "IMG_9511.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "SaveClip.App_AQNWpSTEZtJGruPS1EXnVtDs6P1uPmCp_SaNHt9L2wCFG_uz2aZPxix7o3vlRFFrgx4a9n8eVCufKMQDeDlMlPc951wLcAwwMrj9K4c.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "SaveClip.App_AQO1v4sQGxlHfjUW9I04g94ARyBuUN_UFohs0PgHSRRfHgAuT6lpj2HCmQ69VgK76bsi3pp2a-KCjuVo7z5M_uu0dYMcMnYNG5t7eB8.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "SaveClip.App_AQOOloN5UwtIikHAgqrZFLCRL7xua4MhzoYPSyqMPxzY-3SEMmMLc-37lMHi0xlwYE5osLIvbvu9FZ6dIm5TiZDTF-FqN9YKoJBR5dM.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "SaveClip.App_AQPrWB-9zSnf-ZPXzDCuStMeH--l7661cwCZWG9zxxvNZWnNt9zDJ4GW0qlXZyV7fgv8fAOYw_BcNHgHhiRhrl58fD8atK9609d0vew.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "Video-184.mp4"),
  videoFile("Editorial and party looks by manish kachru optimised.", "Video-892.mp4")
];

export const servicePages: Record<string, ServicePage> = {
  bridals: {
    slug: "bridals",
    eyebrow: "Bridal Makeup",
    title: "Bridal Signature Experience",
    description:
      "Complete bridal day transformation with premium products, refined skin work, and camera-ready elegance for every ceremony.",
    heroImage: serviceImage("Bridal.JPG"),
    videoSrc: videoFile("Bridal looks by manish optimised", "what you get.mp4"),
    videoLabel: "Bridal preview",
    detailEyebrow: "Included",
    detailTitle: "What You Get",
    detailIntroTitle: "Bridal Signature",
    detailIntro:
      "A complete bridal transformation designed for ceremonies, camera, jewellery, outfit, and long wedding hours.",
    details: [
      { label: "Session Fee", value: "Custom quote" },
      { label: "Duration", value: "2.5 to 3.5 hours" },
      { label: "Available", value: "By appointment" }
    ],
    learnItems: ["Skin prep", "HD bridal base", "Ceremony-ready finish"],
    looksVideos: bridalVideos,
    looksEyebrow: "Bridal Makeups",
    looksTitle: "Bridal Looks by Manish Kachru",
    bookingEyebrow: "Book Now",
    bookingTitle: "Request Bridal Booking",
    bookingDescription:
      "Tell us your wedding date, city, and functions. The team will confirm availability and next steps.",
    functions: ["Bridal", "Mehendi", "Haldi", "Sangeet", "Reception"],
    faqs: [
      {
        question: "Skin preparation and base architecture",
        answer:
          "The skin is prepared according to texture, weather, and event timing before building a refined HD base that photographs cleanly and still feels comfortable in person."
      },
      {
        question: "Bridal eye detailing and feature balance",
        answer:
          "Eyes, brows, lashes, liner, lip tone, and face structure are balanced around your jewellery, outfit color, face shape, and the mood of the ceremony."
      },
      {
        question: "Ceremony-wise look direction",
        answer:
          "Bridal, mehendi, haldi, sangeet, and reception looks can be planned as one visual story so every function feels different but still belongs to you."
      },
      {
        question: "Long-wear setting and camera finish",
        answer:
          "The makeup is layered, set, and finished for long hours, emotional moments, photography, videography, and changing indoor or outdoor lighting."
      },
      {
        question: "Draping, jewellery, and final polish guidance",
        answer:
          "The final look is checked with the dupatta, neckline, jewellery, hair direction, and camera framing so the bride looks complete from every angle."
      },
      {
        question: "Destination and multi-function support",
        answer:
          "Destination weddings and multi-day events can be planned with call times, travel, touch-up needs, and a calm schedule for the wedding day."
      }
    ]
  },
  "party-hd-makeups": {
    slug: "party-hd-makeups",
    eyebrow: "HD Event Glam",
    title: "Party HD Makeup",
    description:
      "Flawless high-definition makeup for celebrations, cocktail nights, birthdays, receptions, and camera-heavy events.",
    heroImage: serviceImage("Party.jpg"),
    videoSrc: videoFile("Editorial and party looks by manish kachru optimised.", "what you get party.mp4"),
    videoLabel: "Party HD preview",
    detailEyebrow: "Included",
    detailTitle: "What You Get",
    detailIntroTitle: "Party HD Makeup",
    detailIntro:
      "Polished HD glam designed around your outfit, lighting, event mood, and how you want to feel when you walk in.",
    details: [
      { label: "Session Fee", value: "From ₹3,500" },
      { label: "Duration", value: "90 minutes" },
      { label: "Available", value: "12 PM - 8 PM" }
    ],
    learnItems: ["HD skin finish", "Event glam", "Long-wear setting"],
    looksVideos: editorialPartyVideos,
    looksEyebrow: "HD Makeups",
    looksTitle: "Party Looks by Manish Kachru",
    bookingEyebrow: "Book Now",
    bookingTitle: "Request Party Makeup",
    bookingDescription:
      "Share the event mood, outfit tone, and timing so we can design a polished look around your occasion.",
    functions: ["Cocktail", "Birthday", "Reception", "Engagement", "Red Carpet"],
    faqs: [
      {
        question: "HD base for real life and camera",
        answer:
          "Skin prep, complexion correction, HD base, concealing, setting, and finishing are done so the makeup looks smooth in photos without feeling heavy."
      },
      {
        question: "Soft glam, full glam, or statement glam",
        answer:
          "The look can be minimal, glossy, sculpted, smoky, matte, colorful, or red-carpet inspired depending on your outfit and occasion."
      },
      {
        question: "Eye, lash, lip, and sculpting detail",
        answer:
          "Eye makeup, liner, lashes where needed, contour, blush, highlight, and lip color are selected to flatter your features and event lighting."
      },
      {
        question: "Outfit and jewellery coordination",
        answer:
          "The makeup direction is matched with your outfit color, neckline, jewellery, hairstyle, and whether the event is day, evening, indoor, or outdoor."
      },
      {
        question: "Long-wear party finish",
        answer:
          "The final look is set for dancing, photos, greetings, and long event hours, with guidance on what to carry for touch-ups."
      }
    ]
  },
  "editorial-film-direction": {
    slug: "editorial-film-direction",
    eyebrow: "Editorial Beauty",
    title: "Editorial & Film Direction",
    description:
      "Creative makeup direction for campaigns, fashion stories, films, music videos, and visual productions.",
    heroImage: serviceImage("Editorial & Film Direction.JPG"),
    videoSrc: videoFile("Editorial and party looks by manish kachru optimised.", "what you get editorial.mp4"),
    videoLabel: "Editorial preview",
    detailEyebrow: "Included",
    detailTitle: "What You Get",
    detailIntroTitle: "Editorial Direction",
    detailIntro:
      "Creative look direction for campaigns, shoots, film, and visual projects where the makeup has to support the story.",
    details: [
      { label: "Artist Fee", value: "Per project" },
      { label: "Looks", value: "Per brief" },
      { label: "Available", value: "Shoot schedule" }
    ],
    learnItems: ["Look design", "On-set finish", "Visual continuity"],
    looksVideos: editorialPartyVideos,
    looksEyebrow: "Editorial Films",
    looksTitle: "Beauty Direction by Manish Kachru",
    bookingEyebrow: "Project Enquiry",
    bookingTitle: "Request Creative Direction",
    bookingDescription:
      "Share the concept, shoot date, references, team size, and number of looks required for the production.",
    functions: ["Campaign", "Film", "Music Video", "Fashion", "Advertising"],
    faqs: [
      {
        question: "Moodboard and visual direction",
        answer:
          "Manish studies the campaign, script, styling, lighting, and references to design makeup that supports the creative world instead of looking random."
      },
      {
        question: "Character, fashion, and beauty look design",
        answer:
          "Looks can be clean, cinematic, experimental, glamorous, period-inspired, high-fashion, or product-focused depending on the brief."
      },
      {
        question: "On-set makeup execution",
        answer:
          "Makeup is built for the camera, with attention to shine, texture, continuity, close-ups, lighting shifts, and monitor checks."
      },
      {
        question: "Multiple looks and continuity",
        answer:
          "For long shoot days, multiple looks can be planned with changeover timing, continuity notes, and product organization."
      },
      {
        question: "Creative collaboration with the team",
        answer:
          "The makeup direction is aligned with photographers, directors, stylists, hair artists, models, and brand teams so the final visual feels intentional."
      }
    ]
  },
  "beauty-consultation": {
    slug: "beauty-consultation",
    eyebrow: "Personal Beauty Edit",
    title: "Beauty Consultation",
    description:
      "A focused one-on-one session to refine your everyday face, product choices, skin prep, and signature beauty direction.",
    heroImage: serviceImage("Consultation .png"),
    videoSrc: videoFile("Beauty consultation optimised", "FacetuneEAE98DF0-0F13-46AA-827E-1DF380C36DBB copy.mp4"),
    videoLabel: "Consultation preview",
    detailEyebrow: "Included",
    detailTitle: "What to Expect",
    detailIntroTitle: "Consultation",
    detailIntro:
      "Think of it like a beauty diagnosis. Manish studies your event, outfit, features, skin, current routine, and makeup goals, then recommends the look, products, prep, and styling direction that will suit you best.",
    details: [
      { label: "Session Fee", value: "₹500" },
      { label: "Duration", value: "30 minutes" },
      { label: "Available", value: "12 PM - 6 PM" }
    ],
    looksVideos: [videoFile("Beauty consultation optimised", "FacetuneEAE98DF0-0F13-46AA-827E-1DF380C36DBB copy.mp4")],
    showLooksTicker: false,
    looksEyebrow: "Beauty Notes",
    looksTitle: "Signature Looks by Manish Kachru",
    bookingEyebrow: "Consultation",
    bookingTitle: "Beauty Consultation",
    bookingDescription:
      "Pay the consultation fee to reserve your session. Manish will analyse your event, outfit, face, routine, and goals, then guide you with the right makeup direction.",
    functions: ["Online", "In Studio", "Product Edit", "Skin Prep", "Routine"],
    faqs: [
      {
        question: "What happens in the consultation?",
        answer:
          "Manish first understands your event, outfit, skin, features, references, and current makeup routine, then recommends the right beauty direction."
      },
      {
        question: "What will Manish suggest?",
        answer:
          "You will receive guidance on what makeup will suit you, what products to use, how to prep your skin, and how to coordinate your look with the event."
      },
      {
        question: "Is this like a doctor consultation?",
        answer:
          "Yes, in spirit. First the problem is analysed, then the right beauty solution is suggested for your face, occasion, outfit, and lifestyle."
      },
      {
        question: "Can this help before my wedding, party, or shoot?",
        answer:
          "Yes. It is useful before weddings, parties, shoots, important events, or whenever you need clarity before booking makeup or buying products."
      },
      {
        question: "What is the consultation fee?",
        answer:
          "The consultation fee is ₹500."
      }
    ]
  },
  "weekly-masterclasses": {
    slug: "weekly-masterclasses",
    eyebrow: "Learn Luxury Makeup",
    title: "Weekly Masterclasses",
    description:
      "Live beauty sessions for artists and makeup lovers who want refined technique, product intelligence, and editorial polish.",
    heroImage: manishImage("Cta.png"),
    videoSrc: videoFile("Weekly master class optimised", "FacetuneEAE98DF0-0F13-46AA-827E-1DF380C36DBB copy.mp4"),
    videoLabel: "Masterclass preview",
    detailEyebrow: "Included",
    detailTitle: "Class Details",
    detailIntroTitle: "Weekly Masterclass",
    detailIntro:
      "A practical learning experience where Manish teaches technique, product understanding, live application, client handling, and the mindset required to grow as a makeup artist.",
    details: [
      { label: "Day", value: "Every Sunday" },
      { label: "Time", value: "12 PM - 2 PM IST" },
      { label: "Fee", value: "₹500 per session" },
      { label: "Seats", value: "Limited" }
    ],
    learnItems: [
      "Professional skin preparation and base building",
      "How to perform makeup on different people and face types",
      "Bridal, party, editorial, and camera-ready looks",
      "Product selection, brush technique, layering, and finishing",
      "How to communicate with clients and understand references",
      "How to build your career and earn as a makeup artist"
    ],
    looksVideos: [videoFile("Weekly master class optimised", "FacetuneEAE98DF0-0F13-46AA-827E-1DF380C36DBB copy.mp4")],
    showLooksTicker: false,
    looksEyebrow: "Student Work",
    looksTitle: "Techniques from the Masterclass",
    bookingEyebrow: "Enroll",
    bookingTitle: "Masterclass Enrollment",
    bookingDescription:
      "Share your details and choose a class access option. Pricing is shown clearly below; the checkout button will open Razorpay securely.",
    functions: ["Beginner", "Artist", "Online", "Offline", "Monthly Access"],
    faqs: [
      {
        question: "Who can join the weekly masterclass?",
        answer:
          "Beginners, working artists, and beauty enthusiasts can join. The session is designed to be practical, polished, and easy to follow."
      },
      {
        question: "What will I learn?",
        answer:
          "You will learn skin prep, complexion building, eye detailing, product selection, makeup on different faces, look creation, and how to grow as a makeup artist."
      },
      {
        question: "Will I learn how to perform makeup on people?",
        answer:
          "Yes. The class focuses on real application logic: analysing a face, choosing products, placing makeup correctly, and finishing the look for real clients."
      },
      {
        question: "Will career guidance be included?",
        answer:
          "Yes. Manish will guide learners on building confidence, serving clients, improving their portfolio, and earning from makeup as an artist."
      },
      {
        question: "Do I need a makeup kit?",
        answer:
          "A basic kit is helpful. The team can share a simple product checklist before the session."
      }
    ]
  }
};

export const serviceSlugs = Object.keys(servicePages);
