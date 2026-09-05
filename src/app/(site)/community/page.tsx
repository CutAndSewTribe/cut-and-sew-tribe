import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  Heart,
  MessageCircle,
  Play,
  Scissors,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

import { Container, Section } from "@/components/ui";

const communityLinks = [
  {
    name: "WhatsApp",
    description:
      "The easiest place to start conversations, ask questions, share progress, and stay close to the Tribe.",
    href: "https://wa.me/message/2Y2LBLT47JAFD1",
    icon: FaWhatsapp,
    accent: "from-emerald-500/20 to-emerald-500/5",
    iconClass: "text-emerald-500",
    label: "Join the conversation",
    primary: true,
  },
  {
    name: "Instagram",
    description:
      "See what the community is creating, discover inspiration, and celebrate new student work.",
    href: "https://www.instagram.com/cutandsewtribelimited",
    icon: FaInstagram,
    accent: "from-pink-500/20 to-purple-500/5",
    iconClass: "text-pink-500",
    label: "Follow the Tribe",
    primary: false,
  },
  {
    name: "Facebook",
    description:
      "Keep up with announcements, student wins, fashion conversations, and community updates.",
    href: "https://www.facebook.com/divinebridal.babiesworld",
    icon: FaFacebook,
    accent: "from-blue-500/20 to-blue-500/5",
    iconClass: "text-blue-500",
    label: "Visit Facebook",
    primary: false,
  },
  {
    name: "YouTube",
    description:
      "Learn through practical tutorials, demonstrations, fashion lessons, and free educational content.",
    href: "https://youtube.com/@cutandsewtribe",
    icon: FaYoutube,
    accent: "from-red-500/20 to-red-500/5",
    iconClass: "text-red-500",
    label: "Watch & learn",
    primary: false,
  },
  {
    name: "TikTok",
    description:
      "Quick sewing ideas, fashion tips, behind-the-scenes moments, and short-form creative inspiration.",
    href: "https://www.tiktok.com/@cutandsewtribe",
    icon: FaTiktok,
    accent: "from-neutral-500/15 to-neutral-500/5",
    iconClass: "text-neutral-900",
    label: "Follow on TikTok",
    primary: false,
  },
];

const communityPillars = [
  {
    number: "01",
    icon: BookOpen,
    title: "Learn together",
    description:
      "Go beyond watching lessons. Ask questions, compare techniques, and learn from the experiences of other fashion creatives.",
  },
  {
    number: "02",
    icon: Scissors,
    title: "Make & share",
    description:
      "Show the garments, patterns, experiments, and ideas you are working on. Your progress can inspire somebody else.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Ask & get unstuck",
    description:
      "Fashion is full of moments where you get stuck. The Tribe gives you places to ask, discuss, and keep moving.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Grow your craft",
    description:
      "Build confidence through consistent practice, constructive feedback, new techniques, and exposure to other creators.",
  },
];

const startHere = [
  {
    icon: Play,
    eyebrow: "WATCH",
    title: "Start with free lessons",
    description:
      "Learn something practical today and discover the teaching style inside Cut & Sew Tribe.",
    href: "/videos",
    cta: "Explore videos",
  },
  {
    icon: Scissors,
    eyebrow: "PRACTICE",
    title: "Try a pattern",
    description:
      "Turn learning into making with practical pattern drafting resources and garment projects.",
    href: "/patterns",
    cta: "Explore patterns",
  },
  {
    icon: BookOpen,
    eyebrow: "GO DEEPER",
    title: "Join a structured course",
    description:
      "When you are ready for a complete learning path, move from individual lessons into structured training.",
    href: "/courses",
    cta: "Explore courses",
  },
];

export const metadata = {
  title: "Join the Cut & Sew Tribe | Fashion Community",
  description:
    "Connect with fashion creatives, share your work, learn together, ask questions, and grow your sewing and fashion skills with the Cut & Sew Tribe community.",
  alternates: {
    canonical: "/community",
  },
};

export default function CommunityPage() {
  return (
    <main className="bg-[#080609] text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(102,16,147,0.42),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(212,175,55,0.15),transparent_26%),linear-gradient(135deg,#09060b_0%,#170b1d_52%,#090609_100%)]" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#661093]/20 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <Container>
          <div className="relative flex min-h-[620px] items-center py-24 lg:min-h-[690px] lg:py-28">
            <div className="grid w-full items-center gap-16 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-2 text-sm font-medium text-white/80 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                  The Cut & Sew Tribe community
                </div>

                <h1 className="mt-7 max-w-4xl font-serif text-5xl font-bold leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  Don&apos;t learn fashion
                  <span className="block text-[#D4AF37]">
                    alone.
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
                  Learn, make, share, ask questions, celebrate your wins,
                  and grow alongside people who are building their fashion
                  skills just like you.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={communityLinks[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 py-4 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#e2c35a]"
                  >
                    Join the Tribe
                    <ArrowRight className="h-4 w-4" />
                  </a>

                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/6 px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Explore learning
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/50">
                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                    Learn at your pace
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                    Share your progress
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#D4AF37]" />
                    Grow with other creatives
                  </span>
                </div>
              </div>

              {/* HERO COMMUNITY PANEL */}
              <div className="relative hidden lg:block">
                <div className="relative mx-auto max-w-[480px]">
                  <div className="absolute -inset-5 rounded-[2.5rem] bg-[#661093]/20 blur-2xl" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.055] p-5 shadow-2xl backdrop-blur-xl">
                    <div className="rounded-[1.5rem] border border-white/10 bg-black/30 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                            Inside the Tribe
                          </p>

                          <h2 className="mt-2 text-2xl font-bold">
                            Learn. Make. Share.
                          </h2>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#661093]">
                          <Users className="h-5 w-5" />
                        </div>
                      </div>

                      <div className="mt-7 space-y-3">
                        {[
                          ["Ask a question", "Get unstuck with the community"],
                          ["Share your work", "Let your progress be seen"],
                          ["Find inspiration", "Discover what others are making"],
                          ["Celebrate a win", "Every finished garment counts"],
                        ].map(([title, description]) => (
                          <div
                            key={title}
                            className="rounded-2xl border border-white/8 bg-white/[0.045] p-4 transition hover:border-[#D4AF37]/30 hover:bg-white/[0.07]"
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                                <Check className="h-4 w-4" />
                              </div>

                              <div>
                                <p className="font-semibold text-white">
                                  {title}
                                </p>
                                <p className="mt-1 text-sm leading-5 text-white/45">
                                  {description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#661093]/15 px-4 py-3">
                        <Heart className="h-4 w-4 text-[#D4AF37]" />
                        <p className="text-sm text-white/65">
                          Your next great idea could start with a conversation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* POSITIONING */}
      <Section>
        <Container>
          <div className="border-y border-white/10 py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  More than a group chat
                </p>

                <h2 className="mt-4 max-w-xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                  A place to keep becoming better at your craft.
                </h2>
              </div>

              <p className="max-w-2xl text-lg leading-8 text-white/55">
                Great fashion education is not only about consuming lessons.
                It is about practice, feedback, experimentation, consistency,
                and being surrounded by people who understand the journey.
                That is what the Tribe is designed to encourage.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* COMMUNITY PILLARS */}
      <Section>
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              The Tribe experience
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
              Come for the lessons.
              <span className="block text-white/45">
                Stay for the growth.
              </span>
            </h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {communityPillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article
                  key={pillar.number}
                  className="group bg-[#0d0a10] p-7 transition hover:bg-[#130d17] sm:p-9"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 text-[#D4AF37]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <span className="font-mono text-xs text-white/20">
                      {pillar.number}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-bold">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 max-w-md leading-7 text-white/50">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* START HERE */}
      <section className="bg-[#f8f5fa] py-24 text-neutral-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#661093]">
                Not sure where to begin?
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Find your next move.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-neutral-600">
                Whether you are discovering sewing for the first time or
                already building garments professionally, there is a place
                for you here.
              </p>
            </div>

            <div className="grid gap-4">
              {startHere.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#661093]/30 hover:shadow-xl sm:flex-row sm:items-center sm:p-7"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#661093]/8 text-[#661093]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold tracking-[0.18em] text-[#661093]">
                        {item.eyebrow}
                      </p>

                      <h3 className="mt-1 text-xl font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                        {item.description}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#661093]">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* SOCIAL DESTINATIONS */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Choose your corner of the Tribe
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight sm:text-5xl">
                Connect where you naturally spend time.
              </h2>

              <p className="mt-4 leading-7 text-white/50">
                Each channel has a different rhythm. Pick one, follow along,
                participate when you can, and keep building.
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {communityLinks.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative overflow-hidden rounded-3xl border ${
                    item.primary
                      ? "border-[#D4AF37]/40"
                      : "border-white/10"
                  } bg-gradient-to-br ${item.accent} p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20`}
                >
                  <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-white/[0.025] blur-2xl transition group-hover:bg-white/[0.06]" />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20 ${item.iconClass}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      {item.primary && (
                        <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-black">
                          Start here
                        </span>
                      )}
                    </div>

                    <h3 className="mt-8 text-2xl font-bold">
                      {item.name}
                    </h3>

                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-white/50">
                      {item.description}
                    </p>

                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      {item.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* COMMUNITY CODE */}
      <section className="border-y border-white/10 bg-[#0d0a10]">
        <Container>
          <div className="grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                The Tribe code
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Make the community better because you are in it.
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                "Share what you are learning.",
                "Ask questions without fear.",
                "Give useful, respectful feedback.",
                "Celebrate other people's progress.",
                "Share knowledge when you can.",
                "Keep creating even when it gets difficult.",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex gap-4 border-b border-white/8 pb-5"
                >
                  <span className="font-mono text-xs text-[#D4AF37]">
                    0{index + 1}
                  </span>

                  <p className="text-sm leading-6 text-white/65">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#661093]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(212,175,55,0.28),transparent_28%),radial-gradient(circle_at_10%_90%,rgba(255,255,255,0.12),transparent_30%)]" />

        <Container>
          <div className="relative py-20 text-center sm:py-24">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Users className="h-6 w-6 text-[#D4AF37]" />
            </div>

            <p className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              Your seat is waiting
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your next garment could be the beginning of something bigger.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Learn something. Make something. Share it. Get better.
              Then help somebody else do the same.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={communityLinks[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 py-4 text-sm font-bold text-black transition hover:bg-[#e2c35a]"
              >
                Join the Tribe
                <ArrowRight className="h-4 w-4" />
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Cut & Sew Tribe
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
