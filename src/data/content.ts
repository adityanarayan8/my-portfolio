export const SITE_URL = "https://anarayan.dev";

export type Link = {
  label: string;
  href: string;
  display: string;
};

export type Experience = {
  id: string;
  org: string;
  orgNote?: string;
  role?: string;
  location: string;
  period: string;
  summary: string;
  tags: string[];
};

export type Work = {
  id: string;
  name: string;
  affiliation: string;
  period: string;
  headline: string;
  description: string;
  outcomes: { value: string; label: string }[];
  stack: string[];
  visual: "graph" | "mesh" | "rotor" | "wave";
};

export type Person = {
  name: string;
  first: string;
  last: string;
  initials: string;
  discipline: string;
  positioning: string;
  motto: string;
  statement: string;
  location: string;
};

export const person: Person = {
  name: "Aditya Narayan",
  first: "Aditya",
  last: "Narayan",
  initials: "AN",
  discipline: "EECS @ UC Berkeley",
  positioning: "Backend · Machine Learning · Systems",
  motto: "Deus ex machina.",
  statement:
    "EECS at Berkeley, building the layer between a measurement and a decision.",
  location: "Berkeley, CA",
};

export const links: Record<"email" | "linkedin" | "github", Link> = {
  email: {
    label: "Email",
    href: "mailto:aditya_narayan@berkeley.edu",
    display: "aditya_narayan@berkeley.edu",
  },
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adityanarayan8/",
    display: "adityanarayan8",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/adityanarayan8",
    display: "adityanarayan8",
  },
};

export const github = {
  contributions: 37,
  contributionsWindow: "1yr",
};

export const berkeley = {
  cheer: "Go Bears! 🐻",
  institution: "University of California, Berkeley",
  degree: "B.S. Electrical Engineering and Computer Science",
  graduation: "Expected May 2028",
  gpa: "3.96 / 4.00",
  honors: ["Dean's List", "Honors"],
  badges: [
    { label: "Major", note: "Electrical Engineering &\nComputer Science" },
    { label: "College of Engineering", note: "Dean's List · Honors · 3.96 GPA" },
    { label: "ML Focus", note: "Learning systems, applied" },
    { label: "Lots of White Mocha", note: "Iced, always" },
  ],
  courses: [
    { code: "CS 61A", title: "Structure and Interpretation of Computer Programs" },
    { code: "CS 61B", title: "Data Structures" },
    {
      code: "EECS 16A",
      title: "Signals, Dynamical Systems, and Information Processing",
    },
    { code: "EECS 126", title: "Probability and Random Processes" },
    { code: "EECS 127", title: "Optimization Models in Engineering" },
    { code: "CS 70", title: "Discrete Mathematics and Probability Theory" },
  ],
};

export const experience: Experience[] = [
  {
    id: "gol",
    org: "UC Berkeley School of Information",
    orgNote: "Global Opportunity Lab · Dr. Joshua Blumenstock's research group",
    role: "Undergraduate Researcher",
    location: "Berkeley, CA",
    period: "Jan 2026 - Present",
    summary:
      "Predicting household poverty from phone metadata and mobile money logs across Togo and Malawi. Informing up to $10M in aid from the UN World Food Programme and GiveDirectly.",
    tags: [
      "Feature engineering",
      "Regression",
      "LASSO",
      "Random Forest",
      "Python",
      "Pandas",
      "NumPy",
    ],
  },
  {
    id: "bfr",
    org: "Berkeley Formula Racing",
    orgNote: "UC Berkeley's Formula SAE team",
    role: "Brakes & Driver Interface Engineer, Lead",
    location: "Berkeley, CA",
    period: "Oct 2025 - Present",
    summary:
      "Leading a team of eight engineers through end-to-end brakes and driver interface system development, from CAD to dynamometer to track. Top 10 finish at FSAE IC Michigan 2026.",
    tags: ["Vehicle design", "MATLAB", "SolidWorks", "DAQ"],
  },
  {
    id: "lgnova",
    org: "LG NOVA",
    orgNote: "LG Electronics North America Innovation Center",
    role: "Backend Engineer (Contract)",
    location: "Berkeley, CA",
    period: "Sep 2025 - Jan 2026",
    summary:
      "Designed and shipped Atlas, an internal AI dashboard, for LG's startup incubator. Containerized microservices and ETL pipelines pull scattered Monday.com project data into one queryable database, with RAG sitting on top.",
    tags: ["Python", "Docker", "REST APIs", "RAG"],
  },
  {
    id: "healthgraph",
    org: "HealthGraph",
    orgNote: "Cloud-based digital healthcare platform",
    role: "ML Research Intern",
    location: "Remote",
    period: "Jun 2024 - Sep 2024",
    summary:
      "Built and deployed a computer vision system to digitize auto-refractometer readings for on-the-spot refractive error screening, alongside a patient wait-time prediction model; both deployed across 25 rural clinics in India and Africa, serving 30,000+ patients.",
    tags: ["OpenCV", "Scikit-learn", "LightGBM", "Agile"],
  },
  {
    id: "un",
    org: "Speaker at United Nations Activate Impact Summit, NYC",
    orgNote: "ECOSOC Chambers",
    location: "New York, NY",
    period: "Nov 2023 - Dec 2023",
    summary:
      "Spoke in the ECOSOC Chambers on educational inequality in STEM across India, and on Project Yantrikta, the robotics NGO I founded that has mentored 3,000+ students in government schools.",
    tags: [
      "Interpersonal communication",
      "Public speaking",
      "STEM access",
      "Robotics",
    ],
  },
  {
    id: "needl",
    org: "Needl.ai",
    role: "AI Intern",
    location: "Remote",
    period: "Sep 2023 - Nov 2023",
    summary:
      "Launched a live podcast chatbot on a LangChain pipeline: 100+ episodes transcribed, embedded and searchable in conversation.",
    tags: ["Python", "LangChain", "Gradio"],
  },
];

export const work: Work[] = [
  {
    id: "engintel",
    name: "EngIntel",
    affiliation: "Independent",
    period: "2026",
    headline: "Semantic search across 22,559 NASA technical reports.",
    description:
      "A full-stack search platform running 384-dim sentence-transformer embeddings locally against PostgreSQL pgvector with HNSW indexing, served from three containerized services on Kubernetes that autoscale 1 to 6 replicas under load.",
    outcomes: [
      { value: "12 ms", label: "p50 end to end" },
      { value: "1.4 to 2.1×", label: "ingestion throughput" },
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "pgvector", "Drizzle", "Kubernetes"],
    visual: "wave",
  },
  {
    id: "deepfake",
    name: "Political Deepfake Detection",
    affiliation: "First author · Published in IEEE Xplore",
    period: "2023 to 2024",
    headline: "Catching hyperrealistic fakes by their compression seams.",
    description:
      "Error Level Analysis paired with a modified InceptionResNetV1 CNN to classify fake images and video frames. Double-blind peer reviewed, advised by Dr. Susan Fox at Macalester College, and presented at the 11th IEEE International UP Conference.",
    outcomes: [
      { value: "75%", label: "validation accuracy" },
      { value: "IEEE", label: "first-author paper" },
    ],
    stack: ["Python", "TensorFlow", "OpenCV", "Error Level Analysis"],
    visual: "mesh",
  },
];

export const skills: { title: string; note: string; items: string[] }[] = [
  {
    title: "Languages",
    note: "Day-to-day",
    items: ["Python", "Java", "JavaScript (Node.js)", "SQL", "MATLAB", "HTML/CSS"],
  },
  {
    title: "Systems & Infrastructure",
    note: "How it ships",
    items: [
      "Linux/Unix",
      "Docker",
      "Git",
      "CI/CD",
      "AWS",
      "REST APIs",
      "Networking (HTTP, TCP/IP)",
    ],
  },
  {
    title: "Machine Learning & Data",
    note: "How it learns",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "GeoPandas",
      "OpenCV",
      "Matplotlib",
      "LangChain",
    ],
  },
  {
    title: "Software Practice",
    note: "How it stays correct",
    items: [
      "Debugging",
      "Performance optimization",
      "Unit & integration testing (pytest)",
      "Documentation & system diagrams",
      "Requirements definition",
      "Agile development",
    ],
  },
];

export const sections = [
  { id: "berkeley", label: "Berkeley", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "work", label: "Projects", index: "03" },
  { id: "toolkit", label: "Toolkit", index: "04" },
  { id: "contact", label: "Contact", index: "05" },
] as const;
