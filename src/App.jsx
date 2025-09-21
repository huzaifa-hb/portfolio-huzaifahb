import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Separator } from "./components/ui/separator";
import {
  Mail,
  MapPin,
  Phone,
  Search,
  Share2,
  Sun,
  Moon,
  Link as LinkIcon,
  MessageSquare,
  Download,
} from "lucide-react";

// Live links
const LINKS = {
  linkedin: "https://www.linkedin.com/in/huzaifahb/",
  portfolio:
    "https://drive.google.com/drive/folders/1Hbc_Qp8chfqgR_FVbXJVMpFpXLXpkyoU?usp=sharing",
};

const CONTACT = {
  name: "Huzaifa Binyameen",
  title: "Performance Marketer, Certified Customer Acquisition Specialist",
  location: "Lahore, Punjab, Pakistan",
  phone: "+923056686900",
  email: "meet@huzaifahb.com",
};

const SKILLS = [
  "Meta Ads",
  "Google Ads",
  "LinkedIn Ads",
  "Display",
  "Email Marketing",
  "SEO",
  "Social Marketing",
  "Google Analytics",
  "Looker Studio",
  "PPC Cost Optimization",
  "Attribution",
  "A/B Testing",
  "Account Based Marketing",
  "Salesforce",
  "HubSpot",
  "Automation, Zapier",
  "Automation, Make",
  "Automation, n8n",
  "Team Management",
  "Team Leadership",
  "Coaching & Mentoring",
];

const EXPERIENCE = [
  {
    company: "TFC Marketing",
    role: "Senior Media Buyer",
    type: "Full-Time",
    start: "2025-06-01",
    end: null,
    summary:
      "Lead media buying and strategy for multiple clients, drive scale with rigorous testing, creative iteration and compliance in regulated niches.",
    bullets: [
      "Mentor a pod of buyers on planning, execution and post-click quality.",
      "Own performance optimization and revenue scale for priority accounts.",
    ],
    tags: ["Meta Ads", "Leadership", "Experimentation", "Compliance"],
  },
  {
    company: "TFC Marketing",
    role: "Meta Ads Coordinator",
    type: "Full-Time",
    start: "2025-04-01",
    end: "2025-06-30",
    summary:
      "Managed clients in regulated and hard to advertise industries. Focused on creative testing and compliance safe account structures.",
    bullets: ["Drove growth with creative optimization and audience refinement."],
    tags: ["Meta Ads", "Regulated", "Creative Testing"],
  },
  {
    company: "EaseCloud",
    role: "PPC Consultant",
    type: "Part-Time",
    start: "2025-03-01",
    end: "2025-07-31",
    summary:
      "Owned Google Ads strategy for lead generation and pipeline quality.",
    bullets: [
      "Iterated audiences, ads and landing pages against ROI targets.",
    ],
    tags: ["Google Ads", "B2B", "Lead Gen"],
  },
  {
    company: "Connection Marketing, Inc.",
    role: "Digital Marketing Specialist",
    type: "Full-Time",
    start: "2024-05-01",
    end: "2025-04-30",
    summary:
      "Enterprise lead gen across manufacturing, financial services, SaaS, CPG and venues with omni channel performance marketing.",
    bullets: ["Applied ABM signals to build qualified account pipelines."],
    tags: ["ABM", "Enterprise B2B", "Analytics"],
  },
  {
    company: "Gold-Stellar Advertising",
    role: "Paid Advertising Manager",
    type: "Full-Time",
    start: "2023-05-01",
    end: "2025-03-31",
    summary:
      "Built and optimized full funnel campaigns for services, real estate, education and eCommerce.",
    bullets: [
      "Matched messaging to funnel stage and segment to improve CVR.",
    ],
    tags: ["Full Funnel", "Segmentation", "Optimization"],
  },
  {
    company: "Blockliz",
    role: "Digital Marketing Specialist",
    type: "Full-Time",
    start: "2023-08-01",
    end: "2024-05-31",
    summary:
      "Improved ROI and reduced CPA with structured testing across search and social.",
    bullets: ["Worked hands on in ad platforms and content execution."],
    tags: ["CPA", "ROI", "Search"],
  },
  {
    company: "Palm City Lahore",
    role: "Growth Marketing Associate",
    type: "Full-Time",
    start: "2022-08-01",
    end: "2023-07-31",
    summary:
      "Supported lead gen across email, content, social and paid. Coordinated sales handoff.",
    bullets: [
      "Created content for blogs, social and newsletters. Maintained tone and consistency.",
    ],
    tags: ["Lead Gen", "Content", "Email"],
  },
  {
    company: "Saut-ul-Quran Academy",
    role: "Digital Business Manager",
    type: "Full-Time",
    start: "2021-04-01",
    end: "2022-01-31",
    summary:
      "Grew to 2000 plus leads and about 400 enrollments through an integrated digital plan.",
    bullets: [
      "Launched brand website and automated acquisition flows. Led a small cross functional team.",
    ],
    tags: ["Strategy", "Automation", "Team Lead"],
  },
];

const EDUCATION = [
  {
    school: "University of Engineering and Technology, Lahore",
    degree: "B.E., Mechanical Engineering",
    start: "2018-10-01",
    end: "2023-05-31",
    details: ["CGPA 3.01"],
  },
];

const CERTS = [
  {
    name: "Make the Sale, Build Launch and Manage E-commerce Stores",
    org: "Google, Coursera",
    year: 2023,
  },
  { name: "Digital Psychology and Behavioural Design Training", org: "CXL", year: 2024 },
  { name: "Cognitive Biases", org: "CXL", year: 2024 },
  {
    name: "Assess for Success, Marketing Analytics and Measurement",
    org: "Google",
    year: 2023,
  },
  {
    name: "Satisfaction Guaranteed, Develop Customer Loyalty Online",
    org: "Google",
    year: 2023,
  },
  {
    name: "Customer Acquisition Specialist, Paid Advertisement",
    org: "DigitalMarketer.com",
    year: 2023,
  },
  {
    name: "Certified Ecommerce Marketing Specialist",
    org: "DigitalMarketer.com",
    year: 2023,
  },
  { name: "Account Based Marketing", org: "CXL Institute", year: 2024 },
  { name: "Advanced AI for Marketers", org: "CXL Institute", year: 2024 },
];

const ACHIEVEMENTS = [
  "30 plus national and international debating tournaments",
  "Winner and fifth best speaker, International Utrecht Debating Championship",
  "Winner, Bol Debating Championship 2022",
  "Multiple best speaker awards at national tournaments",
];

function useLocalTheme() {
  const [dark, setDark] = useState(false);
  
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const saved = localStorage.getItem("hb-theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    setDark(shouldBeDark);
  }, []);
   
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("hb-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("hb-theme", "light");
    }
  }, [dark]);
   
  return { dark, setDark };
}

function formatDate(iso) {
  if (!iso) return "Present";
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}
function byDateDesc(a, b) {
  const ae = a.end ? new Date(a.end).getTime() : Date.now();
  const be = b.end ? new Date(b.end).getTime() : Date.now();
  if (be !== ae) return be - ae;
  const as = new Date(a.start).getTime();
  const bs = new Date(b.start).getTime();
  return bs - as;
}

export default function App() {
  const { dark, setDark } = useLocalTheme();
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [layout, setLayout] = useState("cards");

  const allTags = useMemo(() => {
    const t = new Set();
    EXPERIENCE.forEach((e) => e.tags?.forEach((x) => t.add(x)));
    return Array.from(t).sort();
  }, []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EXPERIENCE.filter((e) => {
      const inText = [
        e.company,
        e.role,
        e.type,
        e.summary,
        ...(e.bullets || []),
        ...(e.tags || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
      const tagOk =
        activeTags.length === 0 || activeTags.every((t) => e.tags?.includes(t));
      return inText && tagOk;
    }).sort(byDateDesc);
  }, [query, activeTags]);

  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }
  function clearFilters() {
    setQuery("");
    setActiveTags([]);
  }

  function downloadVCard() {
    try {
      const v = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${CONTACT.name}`,
        `N:${CONTACT.name};;;;`,
        `EMAIL;TYPE=INTERNET:${CONTACT.email}`,
        `TEL;TYPE=CELL:${CONTACT.phone}`,
        `ADR;TYPE=HOME:;;${CONTACT.location};;;;`,
        `URL:${LINKS.linkedin}`,
        "END:VCARD",
      ].join("\n");
      const blob = new Blob([v], { type: "text/vcard" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "Huzaifa-Binyameen.vcf";
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {}
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-slate-200 dark:bg-slate-800 grid place-items-center text-xl font-bold">
              HB
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {CONTACT.name}
              </h1>
              <p className="text-slate-700 dark:text-slate-300 mt-1">
                {CONTACT.title}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-700 dark:text-slate-300">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {CONTACT.location}
                </span>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="inline-flex items-center gap-1 underline decoration-slate-300 hover:decoration-slate-600"
                >
                  <Phone className="h-4 w-4" />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-1 underline decoration-slate-300 hover:decoration-slate-600"
                >
                  <Mail className="h-4 w-4" />
                  {CONTACT.email}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="underline inline-flex items-center gap-1 text-slate-800 dark:text-slate-200"
                >
                  <LinkIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={LINKS.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="underline inline-flex items-center gap-1 text-slate-800 dark:text-slate-200"
                >
                  <LinkIcon className="h-4 w-4" />
                  Portfolio
                </a>
                <a
                  href={LINKS.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="underline inline-flex items-center gap-1 text-slate-800 dark:text-slate-200"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setDark(!dark)}
              className="gap-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}{" "}
              {dark ? "Light" : "Dark"}
            </Button>
            <Button
              onClick={() => window.print()}
              className="gap-2 bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:border-slate-700"
            >
              <Download className="h-4 w-4" /> Print or Save PDF
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                  <Share2 className="h-4 w-4" /> Share
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    try {
                      const url = window.location.href;
                      if (navigator.share)
                        navigator.share({
                          title: CONTACT.name,
                          text: CONTACT.title,
                          url,
                        });
                      else navigator.clipboard.writeText(url);
                    } catch {}
                  }}
                >
                  Share or copy link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={downloadVCard}>
                  Download vCard
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies, roles, results, tags"
                className="pl-9 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 border border-slate-300 dark:border-slate-700"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button
              onClick={() => setLayout("cards")}
              className={`${
                layout === "cards"
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-slate-100 border border-slate-300"
              } ${
                layout === "cards"
                  ? "dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  : "dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 dark:border-slate-700"
              }`}
            >
              Cards
            </Button>
            <Button
              onClick={() => setLayout("timeline")}
              className={`${
                layout === "timeline"
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "bg-white text-slate-900 hover:bg-slate-100 border border-slate-300"
              } ${
                layout === "timeline"
                  ? "dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  : "dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 dark:border-slate-700"
              }`}
            >
              Timeline
            </Button>
          </div>
        </div>

        {/* Tag filters */}
        <div className="mt-4 flex flex-wrap gap-2">
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`px-3 py-1 rounded-full text-sm border transition ${
                activeTags.includes(t)
                  ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              }`}
            >
              {t}
            </button>
          ))}
          {activeTags.length > 0 && (
            <Button
              onClick={clearFilters}
              className="h-8 px-2 bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:border-slate-700"
            >
              Clear
            </Button>
          )}
        </div>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 print:grid-cols-1">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <Section title="Experience">
              {layout === "cards" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {filtered.map((job) => (
                      <motion.div
                        key={`${job.company}-${job.role}-${job.start}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Card */}
                        <Card className="h-full bg-white text-slate-900 border border-slate-200 shadow-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
                          <CardHeader>
                            <CardTitle className="text-lg leading-tight">
                              {job.role}
                            </CardTitle>
                            <div className="text-sm opacity-80">
                              {job.company} ({job.type})
                            </div>
                            <div className="text-xs opacity-70">
                              {formatDate(job.start)} to {formatDate(job.end)}
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-sm">{job.summary}</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {job.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">
                              {job.tags?.map((t) => (
                                <Badge
                                  key={t}
                                  className="border-slate-300 text-slate-800 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-900 cursor-pointer"
                                >
                                  {t}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                  <div className="space-y-6">
                    {filtered.map((job, idx) => (
                      <div key={idx} className="relative pl-10">
                        <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-slate-900 dark:bg-white" />
                        <div className="text-xs opacity-70">
                          {formatDate(job.start)} to {formatDate(job.end)}
                        </div>
                        <div className="font-medium">
                          {job.role} at {job.company}{" "}
                          <span className="text-xs opacity-70">
                            ({job.type})
                          </span>
                        </div>
                        <div className="text-sm mt-1">{job.summary}</div>
                        <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                          {job.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.tags?.map((t) => (
                            <Badge
                              key={t}
                              className="border-slate-300 text-slate-800 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-900 cursor-pointer"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Section>

            <Section title="Education">
              <div className="grid grid-cols-1 gap-4">
                {EDUCATION.map((ed, i) => (
                  <Card
                    key={i}
                    className="bg-white text-slate-900 border border-slate-200 shadow-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{ed.degree}</CardTitle>
                      <div className="text-sm opacity-80">{ed.school}</div>
                      <div className="text-xs opacity-70">
                        {formatDate(ed.start)} to {formatDate(ed.end)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {ed.details.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Section title="Quick Actions">
              <Card className="bg-white text-slate-900 border border-slate-200 shadow-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <a href={`mailto:${CONTACT.email}`} className="col-span-1">
                      <Button className="w-full justify-center gap-2 bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:border-slate-700">
                        <Mail className="h-4 w-4" /> Email
                      </Button>
                    </a>
                    <a href={`tel:${CONTACT.phone}`} className="col-span-1">
                      <Button className="w-full justify-center gap-2 bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:border-slate-700">
                        <Phone className="h-4 w-4" /> Call
                      </Button>
                    </a>
                    <a
                      href={LINKS.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="col-span-2"
                    >
                      <Button className="w-full justify-center bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                        Open LinkedIn
                      </Button>
                    </a>
                    <a
                      href={LINKS.portfolio}
                      target="_blank"
                      rel="noreferrer"
                      className="col-span-2"
                    >
                      <Button className="w-full justify-center bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:border-slate-700">
                        Open Portfolio
                      </Button>
                    </a>
                    <a
                      href={LINKS.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="col-span-2"
                    >
                      <Button className="w-full justify-center bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:border-slate-700">
                        WhatsApp Chat
                      </Button>
                    </a>
                    <a
                      href={LINKS.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="col-span-2 bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:border-slate-700"
                    >
                      <Button className="w-full justify-center bg-white text-slate-900 hover:bg-slate-100 border border-slate-300 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:border-slate-700">
                        Open LinkedIn Profile
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section title="Skills">
              <Card className="bg-white text-slate-900 border border-slate-200 shadow-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.map((s) => (
                      <Badge
                        key={s}
                        className="px-3 py-1 text-sm border-slate-300 text-slate-800 bg-white dark:border-slate-700 dark:text-slate-100 dark:bg-slate-900"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Section>

            <Section title="Certifications">
              <Card className="bg-white text-slate-900 border border-slate-200 shadow-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
                <CardContent className="p-4 space-y-3">
                  {CERTS.sort((a, b) => b.year - a.year).map((c, i) => (
                    <div key={i} className="text-sm flex items-center justify-between">
                      <div>
                        <div className="font-medium">{c.name}</div>
                        <div className="opacity-80">{c.org}</div>
                      </div>
                      <div className="opacity-80">{c.year}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Section>

            <Section title="Achievements">
              <Card className="bg-white text-slate-900 border border-slate-200 shadow-sm dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700">
                <CardContent className="p-4">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {ACHIEVEMENTS.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Section>
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-slate-600 dark:text-slate-400 print:hidden">
          Huzaifa Binyameen - Digital Marketing Specialist.
        </div>
      </div>

      {/* Global CSS guards for readable inputs, works in Vite */}
      <style>{`
        input, textarea { color: rgb(15 23 42); }
        .dark input, .dark textarea { color: rgb(241 245 249); }
        ::selection { background: rgba(148,163,184,0.35); }
        @media print {
          .print\\:grid-cols-1 { grid-template-columns: 1fr !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
