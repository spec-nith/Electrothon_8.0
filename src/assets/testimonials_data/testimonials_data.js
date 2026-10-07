/**
 * @typedef {Object} Testimony
 * @property {string} id - Unique identifier
 * @property {string} name - Participant name
 * @property {string} profilepic - Path to profile picture
 * @property {string} date - Relative time of post
 * @property {string} content - Testimony content
 * @property {string} postpic - Path to post image
 */

/** @type {Testimony[]} */
const Data = [
  {
    id: "1",
    name: "Archit",
    profilepic: "/testimonials/Archit/profile.webp",
    date: "1w",
    content:
      "Electrothon 8.0 has officially wrapped up, and what an incredible experience it has been 🚀 Grateful to be part of such an amazing hackathon where innovation, collaboration, and learning came together at one place. From brainstorming ideas to building solutions under pressure — every moment was worth it!",
    postpic: "/testimonials/Archit/1773811977891.webp",
  },
  {
    id: "2",
    name: "Ashish Gupta",
    profilepic: "/testimonials/default_pfp.svg",
    date: "1w",
    content:
      "“Electrothon 8.0 was an intense and rewarding experience filled with innovation, teamwork, and real-world problem-solving. Building MedConnect and being recognized with the Best Use of Gemini API award made the journey even more memorable. Huge thanks to SPEC NITH, the mentors, judges, sponsors, and teammates for making this experience truly inspiring!”",
    postpic: "/testimonials/Ashish Gupta/1774377013283.jpg",
  },
  {
    id: "3",
    name: "Kausheki Deb",
    profilepic: "/testimonials/default_pfp.svg",
    date: "1w",
    content:
      "Electrothon 8.0 at NIT Hamirpur was an incredible journey of rapid prototyping, coding, and collaborative problem-solving. The experience provided valuable technical learning, industry exposure, and lifelong memories. Special thanks to the organizers at NIT Hamirpur SPEC NITH, mentors, teammates, and SGT University for their immense support and encouragement throughout the hackathon.",
    postpic: "/testimonials/Kausheki Deb/1774840885787.jpg",
  },
  {
    id: "4",
    name: "Sayam Sharma",
    profilepic: "/testimonials/Sayam Sharma/profile.webp",
    date: "1w",
    content:
      "\"Still reflecting on how impactful Electrothon 8.0 - Labyrinnh of Eternum turned out to be. Really impressive work at Electrothon 8.0! The idea of using AI to turn simple prompts into functional applications is both innovative and practical. GenMobi.Studio is a truly impressive concept.\"",
    postpic: "/testimonials/Sayam Sharma/1774449952412.jpg",
  },
  {
    id: "5",
    name: "Tanisha Singh",
    profilepic: "/testimonials/default_pfp.svg",
    date: "1w",
    content:
      "What an incredible journey at Electrothon 8.0! GenMobi.Studio sounds like an amazing innovation, and the Best Use of Gemini API recognition is truly well deserved.",
    postpic: "/testimonials/Tanisha Singh/1774543019395.webp",
  },
  /*
  {
    id: "old-1",
    name: "Purva Uppal",
    profilepic: "/testimonials/pfp1.jpeg",
    date: "6mo",
    content:
      "✨ Thrilled to share this achievement! ✨ My team and I participated in Electrothon 7.0, organized by SPEC, NIT Hamirpur, in association with Major League Hacking (MLH), where we built DecentraVault, a decentralized file management system focused on security and decentralization...",
    postpic: "/testimonials/first.jpeg",
  },
  {
    id: "old-2",
    name: "Ms Vaani",
    profilepic: "/testimonials/pfp2.jpeg",
    date: "6mo",
    content:
      "⚡ Electrothon 7.0, The Colosseum of Code ⚡ Nestled in the serene yet electrifying aura of NIT Hamirpur, I embarked on an odyssey where logic met creativity, and caffeine fueled perseverance sculpted innovation...",
    postpic: "/testimonials/second.jpeg",
  },
  {
    id: "old-3",
    name: "Rohan Mishra",
    profilepic: "/testimonials/pfp3.jpeg",
    date: "5mo",
    content:
      "Thrilled to have participated in the electrifying Electrothon 7.0 organized by SPEC_NITH at our college! It was my first hackathon and the experience was exhilarating 🔥 We participated in this prestigious hackathon where sponsors posed diverse track challenges for participants...",
    postpic: "/testimonials/third.jpeg",
  },
  {
    id: "old-4",
    name: "ObsiHive",
    profilepic: "/testimonials/pfp4.jpeg",
    date: "6mo",
    content:
      "🚀 TheObsidian at Electrothon 7.0, NIT Hamirpur Hackathon! Our team, TheObsidian, had an incredible experience at Electrothon 7.0, the hackathon hosted by NIT Hamirpur! We built a project focused on web scraping, pushing our skills to the next level...",
    postpic: "/testimonials/fourth.jpeg",
  },
  {
    id: "old-5",
    name: "Aarya Jamwal",
    profilepic: "/testimonials/pfp5.jpeg",
    date: "6mo",
    content:
      "✨ Electrothon 7.0, A 36-Hour Journey of Innovation & Learning! ✨ This weekend, I had the incredible opportunity to participate in Electrothon 7.0 at NIT Hamirpur...",
    postpic: "/testimonials/fifth.jpeg",
  },
  {
    id: "old-6",
    name: "Tania Sathwara",
    profilepic: "/testimonials/pfp6.jpeg",
    date: "6mo",
    content:
      "💙 Proud to have built AnnSetu as our project for Electrothon 7.0, Colosseum Of Code at NIT Hamirpur...",
    postpic: "/testimonials/sixth.jpeg",
  },
  {
    id: "old-7",
    name: "Veer Vanshaj Wadehra",
    profilepic: "/testimonials/pfp7.jpeg",
    date: "6mo",
    content:
      "Thrilled to share an incredible achievement! 🏆 Track prizes winner at Electrothon 7.0 🏆 I had the amazing opportunity to participate in Electrothon 8.0, a national level hackathon organized by MLH and NIT Hamirpur...",
    postpic: "/testimonials/seventh.jpeg",
  },
  {
    id: "old-8",
    name: "Monish Solanki",
    profilepic: "/testimonials/pfp8.jpeg",
    date: "6mo",
    content:
      "Our team, La Casa De Code, which I had the privilege to lead, recently participated in Electrothon 7.0 ⚡ A National Level Hackathon hosted by NIT Hamirpur, with over 100 teams and 1,500+ participants from across the country...",
    postpic: "/testimonials/eighthh.jpeg",
  },
  {
    id: "old-9",
    name: "Trishna Garg",
    profilepic: "/testimonials/pfp9.jpeg",
    date: "6mo",
    content:
      "Dear readers, I am humbled to share that Team Innovation Station has won the MLH TRACK PRIZE for Best Build Using Streamlit at Electrothon 7.0, organized by NIT Hamirpur, while competing against 99 talented teams from across India...",
    postpic: "/testimonials/ninth.jpeg",
  },
  {
    id: "old-10",
    name: "Seerat Kaur",
    profilepic: "/testimonials/pfp10.jpeg",
    date: "6mo",
    content:
      "🏆 MLH Track Prize Winners at Electrothon 7.0! 🏆 A dream becomes reality through the magic of determination, hard work, and an incredible team...",
    postpic: "/testimonials/tenth.jpeg",
  },
  {
    id: "old-11",
    name: "Priya Goyal",
    profilepic: "/testimonials/pfp11.jpeg",
    date: "6mo",
    content:
      "At Electrothon 7.0, we dived into challenges headfirst ideating, building, and refining our solution in a race against time. Every bug fixed was a step closer to something bigger, and every roadblock was an opportunity to think differently...",
    postpic: "/testimonials/eleven.jpeg",
  },
  */
];

export default Data;
