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
    detailTitle: "What to Expect",
    detailIntroTitle: "Bridal Signature",
    detailIntro:
      "A refined bridal experience with skin preparation, HD base, eye detailing, draping guidance, and a long-wear finish built for ceremonies and camera.",
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
        question: "How far in advance should I book my bridal makeup?",
        answer:
          "For peak wedding dates, booking 3 to 6 months in advance is ideal. If your date is close, send an enquiry and the team will confirm availability."
      },
      {
        question: "Do you offer trial sessions before the wedding day?",
        answer:
          "Yes. Trial sessions can be planned before the final booking so the bridal look, skin finish, and references are aligned."
      },
      {
        question: "What products do you use?",
        answer:
          "Professional luxury and HD-friendly products are selected according to skin type, weather, outfit, and the camera setup."
      },
      {
        question: "Will the makeup last throughout the entire event?",
        answer:
          "The look is built in refined layers with long-wear prep, setting, and touch-up guidance for a polished finish through the event."
      },
      {
        question: "Do you travel for destination weddings?",
        answer:
          "Yes. Destination bookings can be arranged with travel, stay, and function schedule details shared in advance."
      },
      {
        question: "What makes Looks by Manish Kachru different?",
        answer:
          "The approach is editorial but personal: skin-led beauty, balanced features, precise finish, and a calm luxury experience."
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
    detailTitle: "What to Expect",
    detailIntroTitle: "Party HD Makeup",
    detailIntro:
      "Polished HD glam designed around your outfit, lighting, and event mood with a clean base, sculpted features, and photo-ready detail.",
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
        question: "What is included in Party HD makeup?",
        answer:
          "Skin prep, HD base, eye look, lashes when required, lip finish, and final setting for a camera-ready result."
      },
      {
        question: "Can the look be soft glam instead of heavy glam?",
        answer:
          "Yes. The look can be soft, sculpted, glossy, matte, dramatic, or minimal depending on your outfit and preference."
      },
      {
        question: "How long does the appointment take?",
        answer:
          "Most party looks take around 90 minutes, with extra time recommended for hair, draping, or a more detailed eye look."
      },
      {
        question: "Can you match the makeup to my outfit?",
        answer:
          "Yes. Outfit color, jewellery, neckline, lighting, and event mood are used to balance the final beauty direction."
      },
      {
        question: "Is travel available for party bookings?",
        answer:
          "Travel can be arranged depending on the location, time slot, and booking schedule."
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
    detailTitle: "What to Expect",
    detailIntroTitle: "Editorial Direction",
    detailIntro:
      "Creative look direction for camera-led work, including face design, continuity, moodboard interpretation, and polished on-set execution.",
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
        question: "What does editorial and film direction include?",
        answer:
          "It includes beauty direction, look design, makeup execution, continuity notes, and creative alignment with the production mood."
      },
      {
        question: "Can you create multiple looks in one shoot day?",
        answer:
          "Yes. Multiple looks can be planned with a clear schedule, product setup, model prep, and transition time."
      },
      {
        question: "Do you work with photographers and stylists?",
        answer:
          "Yes. The beauty direction is built to support the full visual team, including styling, lighting, hair, and camera language."
      },
      {
        question: "Can you follow a brand moodboard?",
        answer:
          "Yes. Brand references, campaign goals, color stories, and product focus are used to shape the final makeup language."
      },
      {
        question: "How is pricing handled for productions?",
        answer:
          "Pricing depends on call time, number of looks, team needs, usage, location, and the scope of creative direction."
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
      "During this private Zoom session, Manish will help you design your signature look from product recommendations and skin prep to outfit and jewellery coordination.",
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
    bookingTitle: "Request Beauty Consultation",
    bookingDescription:
      "Tell us what you want to improve, your current routine, and whether you prefer an online or in-person session.",
    functions: ["Online", "In Studio", "Product Edit", "Skin Prep", "Routine"],
    faqs: [
      {
        question: "Who is a beauty consultation for?",
        answer:
          "It is for anyone who wants a cleaner makeup routine, better product choices, or a signature look that feels elevated but wearable."
      },
      {
        question: "Can I do the consultation online?",
        answer:
          "Yes. Online consultations can be done over video call with product review, face mapping, and routine guidance."
      },
      {
        question: "Will you recommend products?",
        answer:
          "Yes. Recommendations are based on your skin, budget, existing kit, finish preferences, and daily lifestyle."
      },
      {
        question: "Can you teach me how to recreate the look?",
        answer:
          "Yes. The session can include step-by-step application guidance, brush technique, and product placement."
      },
      {
        question: "Can this help before my wedding or shoot?",
        answer:
          "Yes. It is especially useful for brides, creators, and professionals who want clarity before important events."
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
      "A focused weekly beauty class covering HD bridal techniques, skin prep mastery, product breakdowns, and live application detail.",
    details: [
      { label: "Day", value: "Every Sunday" },
      { label: "Time", value: "12 PM - 2 PM IST" },
      { label: "Fee", value: "₹500 per session" },
      { label: "Seats", value: "Limited" }
    ],
    learnItems: ["HD Bridal Techniques", "Skin Prep Mastery", "Product Breakdown"],
    looksVideos: [videoFile("Weekly master class optimised", "FacetuneEAE98DF0-0F13-46AA-827E-1DF380C36DBB copy.mp4")],
    showLooksTicker: false,
    looksEyebrow: "Student Work",
    looksTitle: "Techniques from the Masterclass",
    bookingEyebrow: "Enroll",
    bookingTitle: "Request Masterclass Seat",
    bookingDescription:
      "Share your experience level and preferred format. We will send the upcoming class schedule and seat details.",
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
          "You will learn skin prep, complexion building, eye detailing, product selection, face balance, and finishing for camera."
      },
      {
        question: "Is the class live or recorded?",
        answer:
          "The main experience is live, with format details confirmed for each batch depending on the schedule."
      },
      {
        question: "Do I need a makeup kit?",
        answer:
          "A basic kit is helpful. The team can share a simple product checklist before the session."
      },
      {
        question: "Are seats limited?",
        answer:
          "Yes. Sessions are kept limited so questions, feedback, and technique corrections remain personal."
      }
    ]
  }
};

export const serviceSlugs = Object.keys(servicePages);
