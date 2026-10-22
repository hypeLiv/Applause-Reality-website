import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "@/components/Image";
import Link from "next/link";
import { notFound } from "next/navigation";
import VideoCard from "@/components/VideoCard";
import ClosingCta from "@/components/home/ClosingCta";
import { Reveal } from "@/components/home/motion";
import SmoothScroll from "@/components/home/SmoothScroll";
import { Arrow, Bezel, Icon, lux } from "@/components/home/ui";
import { ExpandLanding, ExpandLink } from "@/components/page/ExpandTransition";
import PageHero from "@/components/page/PageHero";
import ProjectGallery from "@/components/page/ProjectGallery";
import { Cta } from "@/components/sections";
import { projects, type Project } from "@/content/projects";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { pageMeta } from "@/lib/seo";
import { downloadHref } from "@/lib/download";
import { site } from "@/lib/site";
import { getProjects, getSiteMedia, type Img } from "@/sanity/media";

type Params = { params: Promise<{ key: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ key: p.key }));
}

const findProject = async (key: string) => (await getProjects()).find((p) => p.key === key);

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = await findProject((await params).key);
  if (!p) return {};
  return pageMeta({
    title: p.seoTitle ?? `${p.name}, ${p.location}`,
    description: p.metaDescription,
    path: `/projects/${p.key}`,
    images: [p.photo],
  });
}

/** Brochure size, e.g. "11.3 MB": from Sanity, or read from disk at build time. */
function fileSize(p: Project) {
  if (p.brochureBytes) return `${(p.brochureBytes / 1e6).toFixed(1)} MB`;
  const href = p.brochure;
  try {
    const bytes = fs.statSync(path.join(process.cwd(), "public", href)).size;
    return `${(bytes / 1e6).toFixed(1)} MB`;
  } catch {
    return null;
  }
}

const promises = ["Safe NCR growth", "Bank approved", "Corporate & HR schemes"];

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
/** "Four" for 4, so small counts read as words in display headings. */
const count = (n: number) => WORDS[n] ?? String(n);

export default async function ProjectPage({ params }: Params) {
  const { key } = await params;
  const [all, media] = await Promise.all([getProjects(), getSiteMedia()]);
  const p = all.find((o) => o.key === key);
  if (!p) notFound();
  const others = all.filter((o) => o.key !== p.key);
  const size = fileSize(p);

  return (
    <>
      <SmoothScroll />
      <ExpandLanding />
      <PageHero
        image={p.photo}
        alt={p.photoAlt}
        eyebrow={p.developer ? `${p.location} · By ${p.developer}` : p.location}
        title={p.name}
        lead={p.summary}
        actions={
          <>
            <a href={downloadHref(p.brochure)} download className={lux.dayPrimary}>
              <Icon name="download" className="h-5 w-5" /> Download brochure
            </a>
            <Cta href={site.whatsappProjects} className={lux.dayGlass}>
              Talk to an advisor
            </Cta>
          </>
        }
      >
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink-900/[0.08] ring-1 ring-ink-900/10 shadow-[0_24px_48px_-24px_rgba(11,23,51,0.3)] md:grid-cols-4">
          {p.facts.map((f) => (
            <div key={f.label} className="bg-white/85 px-5 py-4 backdrop-blur-md">
              <dd className="font-sans text-xl font-semibold tabular-nums text-ink-900 md:text-2xl">{f.value}</dd>
              <dt className="order-first font-text text-xs uppercase tracking-[0.14em] text-slate-ink">{f.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      <Overview project={p} banks={{ sbi: media.partners.sbi.logo, pnb: media.partners.pnb.logo }} />
      <Homes project={p} />
      <Inside project={p} />
      <Brochure project={p} size={size} />
      <OtherLaunches projects={others} />

      <ClosingCta
        label="Plan a visit"
        title={`See *${p.name}* in person.`}
        text="We arrange the site visit, walk you through the bank-approved paperwork and stay with you through possession and beyond."
        actionLabel="Book a site visit"
        footnote="Bank approved · Corporate & HR schemes"
      />
    </>
  );
}

function Overview({ project: p, banks }: { project: Project; banks: { sbi: Img; pnb: Img } }) {
  return (
    <section className="lux-scope lux-on-light bg-white px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
            { name: p.name, href: `/projects/${p.key}` },
          ]}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="lux-label text-royal">Overview</p>
            <h2 className="lux-display mt-6 text-[clamp(2.2rem,4vw,3.6rem)]">About {p.name}</h2>
            <span className="mt-8 inline-grid h-16 place-items-center rounded-2xl bg-white px-5 ring-1 ring-ink-900/10">
              <Image src={p.logo.src} alt={p.logo.alt} width={p.logo.w} height={p.logo.h} className="h-9 w-auto" />
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 font-text text-lg leading-relaxed text-slate-ink">
              {p.overview.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-2">
              {promises.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-4 py-2 font-text text-sm font-medium text-ink-900"
                >
                  <Icon name="check" className="h-4 w-4 text-royal" />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-ink-900/[0.08] pt-8">
              <p className="font-text text-xs font-semibold uppercase tracking-[0.18em] text-slate-ink">100% verified by</p>
              <div className="flex items-center gap-5">
                {[banks.sbi, banks.pnb].map((b) => (
                  <Image key={b.alt} src={b.src} alt={b.alt} width={b.width} height={b.height} className="h-9 w-auto" />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Unit plans, included specifications and amenity chips, for projects that list them. */
function Homes({ project: p }: { project: Project }) {
  const { unitPlans, specs, amenities } = p;
  if (!unitPlans?.length && !specs?.length && !amenities?.length) return null;
  return (
    <section className="lux-scope lux-on-light bg-ivory px-4 py-24 text-ink-900 sm:px-6 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="lux-label text-royal">Homes &amp; specifications</p>
          <h2 className="lux-display mt-6 max-w-[18ch] text-[clamp(2.2rem,4vw,3.6rem)]">
            {unitPlans?.length ? `${count(unitPlans.length)} plans, ` : ""}
            <em>{specs?.length ? `${count(specs.length).toLowerCase()} inclusions.` : "every detail considered."}</em>
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-12">
          {unitPlans?.length ? (
            <Reveal className="lg:col-span-7">
              <Bezel tone="light" coreClassName="bg-white p-5 sm:p-8">
                <table className="w-full border-collapse text-left font-text">
                  <caption className="sr-only">Unit plans</caption>
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.14em] text-slate-ink">
                      <th scope="col" className="pb-4 pr-3 font-semibold">Plan</th>
                      <th scope="col" className="pb-4 pr-3 font-semibold">Saleable area</th>
                      <th scope="col" className="hidden pb-4 font-semibold sm:table-cell">Towers</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unitPlans.map((u) => (
                      <tr key={u.plan} className="border-t border-ink-900/[0.08] align-top">
                        <th scope="row" className="py-4 pr-3 font-sans text-[15px] font-semibold sm:text-base">
                          {u.plan}
                          {/* Phones fold the towers column in under the plan name. */}
                          <span className="mt-1 block font-text text-sm font-normal text-slate-ink sm:hidden">
                            Towers {u.towers}
                          </span>
                        </th>
                        <td className="whitespace-nowrap py-4 pr-3 text-[15px] tabular-nums sm:text-base">{u.area}</td>
                        <td className="hidden py-4 text-[15px] text-slate-ink sm:table-cell sm:text-base">{u.towers}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {p.planNote && (
                  <p className="mt-6 border-t border-ink-900/[0.08] pt-5 font-text text-[15px] leading-relaxed text-slate-ink">
                    {p.planNote}
                  </p>
                )}
              </Bezel>
            </Reveal>
          ) : null}

          {specs?.length ? (
            <Reveal delay={0.08} className={unitPlans?.length ? "lg:col-span-5" : "lg:col-span-12"}>
              <Bezel tone="light" coreClassName="bg-white p-6 text-ink-900 sm:p-8">
                <p className="font-text text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                  Included in the price
                </p>
                <ol className="mt-5 space-y-4">
                  {specs.map((sp, i) => (
                    <li key={sp.title} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-ink-900/[0.08] pt-4 first:border-0 first:pt-0">
                      <span className="font-text text-xs font-semibold tabular-nums tracking-[0.16em] text-royal">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-sans text-[15px] font-semibold sm:text-base">{sp.title}</span>
                        {sp.detail && <span className="mt-0.5 block font-text text-sm text-slate-ink">{sp.detail}</span>}
                      </span>
                    </li>
                  ))}
                </ol>
              </Bezel>
            </Reveal>
          ) : null}
        </div>

        {amenities?.length ? (
          <Reveal delay={0.1}>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Amenity highlights">
              {amenities.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-text text-sm font-medium text-ink-900 ring-1 ring-ink-900/[0.08]"
                >
                  <Icon name="check" className="h-4 w-4 text-royal" />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

function Inside({ project: p }: { project: Project }) {
  const { film, highlights, gallery } = p;
  if (!film && !highlights && !gallery?.length) return null;
  return (
    <section className="lux-scope lux-on-light bg-mist px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="lux-label text-royal">Inside the project</p>
          <h2 className="lux-display mt-6 max-w-[18ch] text-[clamp(2.2rem,4vw,3.6rem)]">
            See it before you visit.
          </h2>
        </Reveal>

        {gallery?.length ? (
          <Reveal delay={0.1} className="mt-12 md:mt-14">
            <ProjectGallery images={gallery} />
          </Reveal>
        ) : null}

        <div
          className={`${film || highlights ? "mt-14" : "hidden"} grid items-start gap-6 md:gap-8 ${
            film ? (film.portrait ? "lg:grid-cols-[minmax(0,22rem)_1fr]" : "lg:grid-cols-2") : ""
          }`}
        >
          {film && (
            <Reveal>
              <VideoCard
                src={film.src}
                poster={film.poster}
                title={film.title}
                className={`w-full rounded-[24px] ring-1 ring-ink-900/10 ${
                  film.portrait ? "mx-auto aspect-[9/16] max-w-sm lg:max-w-none" : "aspect-video"
                }`}
              />
            </Reveal>
          )}

          {highlights && (
            <Reveal delay={0.1} className={film ? "" : "max-w-4xl"}>
              <figure>
                <a
                  href={highlights}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lux-focus group block overflow-hidden rounded-[24px] bg-white ring-1 ring-ink-900/10"
                >
                  <Image
                    src={highlights}
                    alt={`${p.name} project highlights`}
                    width={1535}
                    height={1024}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-auto w-full transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.02]"
                  />
                </a>
                <figcaption className="mt-4 flex items-center justify-between gap-4 font-text text-sm text-slate-ink">
                  <span>Project highlights</span>
                  <a href={highlights} target="_blank" rel="noopener noreferrer" className="lux-focus -my-2 py-2 font-semibold text-ink-900/80 hover:text-royal">
                    Open full size ↗
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function Brochure({ project: p, size }: { project: Project; size: string | null }) {
  return (
    <section id="brochure" className="lux-scope lux-on-light scroll-mt-24 bg-ivory px-4 sm:px-6 py-20 text-ink-900 md:px-10 md:py-28">
      <Reveal className="mx-auto max-w-[1320px]">
        <div className="grid items-center gap-8 rounded-[28px] bg-white p-7 ring-1 ring-ink-900/[0.06] md:grid-cols-[auto_1fr_auto] md:gap-10 md:p-10">
          <span className="relative grid h-24 w-20 place-items-center rounded-xl bg-royal text-white">
            <Icon name="document" className="h-8 w-8" />
            <span className="absolute bottom-2 font-text text-[10px] font-bold tracking-[0.18em]">PDF</span>
          </span>
          <div>
            <p className="lux-label text-royal">Project brochure</p>
            <h2 className="lux-display mt-4 text-[clamp(1.6rem,2.6vw,2.25rem)] leading-tight">
              {p.name} brochure
            </h2>
            <p className="mt-2 font-text text-[15px] text-slate-ink">
              The developer&rsquo;s full brochure for {p.name}{size ? <> · PDF, {size}</> : null}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={downloadHref(p.brochure)} download className={lux.primary}>
              <Icon name="download" className="h-4 w-4" /> Download
            </a>
            <a href={p.brochure} target="_blank" rel="noopener noreferrer" className={lux.ghostLight}>
              View online
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function OtherLaunches({ projects: list }: { projects: Project[] }) {
  return (
    <section className="lux-scope lux-on-light bg-white px-4 sm:px-6 py-24 text-ink-900 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="lux-label text-royal">More launches</p>
            <h2 className="lux-display mt-6 text-[clamp(2rem,3.6vw,3.2rem)]">Other projects we&rsquo;re guiding.</h2>
          </div>
          <Link href="/projects#launches" className={lux.ghostLight}>
            All launches <Arrow />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {list.map((o, i) => (
            <li key={o.key} data-expand-root>
              <Reveal delay={i * 0.06}>
                <ExpandLink href={`/projects/${o.key}`} className="lux-focus group block">
                  <span data-expand-source className="relative block aspect-[4/3] overflow-hidden rounded-[22px] bg-mist">
                    <Image
                      src={o.photo}
                      alt={o.photoAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="mt-5 flex items-start justify-between gap-4">
                    <span>
                      <span className="block font-sans text-xl font-semibold tracking-[-0.01em]">{o.name}</span>
                      <span className="mt-1 block font-text text-sm text-slate-ink">{o.location}</span>
                    </span>
                    <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink-900/15 transition-colors group-hover:border-royal group-hover:bg-royal group-hover:text-white">
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </span>
                </ExpandLink>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
