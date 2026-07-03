import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { clinics, getClinic } from "@/lib/data/clinics";
import { getDoctor } from "@/lib/data/doctors";
import { columnsByAuthor } from "@/lib/data/columns";
import { site } from "@/lib/site";
import type { Doctor } from "@/lib/types";
import { AdLabel, Eyebrow } from "@/components/ui";
import ScrollRow from "@/components/ScrollRow";
import DoctorCard from "@/components/DoctorCard";
import SectionHeading from "@/components/SectionHeading";
import CopyAddressButton from "@/components/clinics/CopyAddressButton";

export function generateStaticParams() {
  return clinics.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) return {};
  return {
    title: `${clinic.name} 진료 안내 (광고)`,
    description: `${clinic.intro} ${clinic.region} 위치·주소·진료시간·전화번호와 오시는 길을 안내합니다.`,
  };
}

/** "확인 필요" 값 순화 표기 */
function soften(value: string) {
  return value.replaceAll("확인 필요", "지점 확인 후 안내 예정");
}

/** 오시는 길 아이콘 — 텍스트에서 유형 추론 (지하철/버스/주차) */
function AccessIcon({ text }: { text: string }) {
  const type = text.includes("주차")
    ? "parking"
    : text.includes("버스")
      ? "bus"
      : "subway";
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
      {type === "subway" && (
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="3.5" y="1.8" width="9" height="9.7" rx="2" />
          <path d="M3.5 7.5h9" />
          <circle cx="6" cy="9.4" r="0.4" fill="currentColor" />
          <circle cx="10" cy="9.4" r="0.4" fill="currentColor" />
          <path d="M5.8 11.5l-1.6 2.7M10.2 11.5l1.6 2.7" />
        </svg>
      )}
      {type === "bus" && (
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <rect x="2.5" y="2.2" width="11" height="10" rx="1.8" />
          <path d="M2.5 7.8h11" />
          <circle cx="5.3" cy="10.2" r="0.4" fill="currentColor" />
          <circle cx="10.7" cy="10.2" r="0.4" fill="currentColor" />
          <path d="M4.5 12.2v1.6M11.5 12.2v1.6" />
        </svg>
      )}
      {type === "parking" && (
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M5.8 13.5V2.5h3.4a3.1 3.1 0 010 6.2H5.8" />
        </svg>
      )}
    </span>
  );
}

/** 새 탭 아웃링크 아이콘 */
function ExternalIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6.5 3.5H3.8A1.3 1.3 0 002.5 4.8v7.4a1.3 1.3 0 001.3 1.3h7.4a1.3 1.3 0 001.3-1.3V9.5" />
      <path d="M9.5 2.5h4v4M13.2 2.8L7.5 8.5" />
    </svg>
  );
}

/** CLI-01 지점 페이지 — 명시적 광고 영역 (레이아웃 순서: 상세기획서 B-5) */
export default async function ClinicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const clinic = getClinic(slug);
  if (!clinic) notFound();

  const clinicDoctors = clinic.doctorSlugs
    .map((s) => getDoctor(s))
    .filter((d): d is Doctor => Boolean(d));

  const closedText =
    clinic.closedNote === "확인 필요"
      ? "휴진일은 지점 확인 후 안내 예정입니다"
      : clinic.closedNote;

  const mapUrl = `https://map.naver.com/p/search/${encodeURIComponent(clinic.name)}`;

  /** MedicalClinic 구조화 데이터 — NAP은 지점 마스터 데이터 단일 원본 */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: clinic.name,
    url: `${site.url}/clinics/${clinic.slug}`,
    image: clinic.photos.map((p) => `${site.url}${p}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressCountry: "KR",
    },
    telephone: clinic.phone,
    medicalSpecialty: "Dermatology",
    physician: clinicDoctors.map((d) => ({
      "@type": "Physician",
      name: d.name,
      url: `${site.url}/doctors/${d.slug}`,
    })),
    sameAs: [clinic.homepage],
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. 광고 라벨 — 페이지 최상단 좌측 상시 노출 (Must) */}
      <AdLabel />

      {/* 2. 지점명 + 의료기관 기본 정보 */}
      <header className="mt-8 md:mt-10">
        <Eyebrow>{clinic.region}</Eyebrow>
        <h1 className="mt-3 font-serif text-[30px] font-bold leading-tight text-ink md:text-[42px]">
          {clinic.name}
        </h1>
        <p className="mt-3 text-[13.5px] text-ink-faint">
          개설 명칭 {clinic.officialName}
          <span className="mx-2" aria-hidden>
            ·
          </span>
          진료 과목 {clinic.subjects}
        </p>
      </header>

      {/* 3. 대표 사진 — peek 가로 스크롤 (첫 장 크게) */}
      <div className="mt-8 md:mt-10">
        <ScrollRow ariaLabel={`${clinic.name} 시설 사진`}>
          {clinic.photos.map((src, i) => (
            <div
              key={src}
              role="listitem"
              className={`relative h-[240px] shrink-0 snap-start overflow-hidden rounded-2xl bg-paper-warm md:h-[380px] ${
                i === 0
                  ? "w-[85%] sm:w-[440px] md:w-[570px]"
                  : "w-[65%] sm:w-[320px] md:w-[420px]"
              }`}
            >
              <Image
                src={src}
                alt={`${clinic.shortName} 시설 사진 ${i + 1}`}
                fill
                sizes="(max-width: 768px) 85vw, 570px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </ScrollRow>
      </div>

      {/* 4. 핵심 정보 블록 — 데스크탑 2단 (좌 정보 / 우 연락·예약) */}
      <section className="mt-10 grid gap-5 md:mt-14 md:grid-cols-[1.6fr_1fr] md:gap-6">
        <div className="space-y-5 md:space-y-6">
          {/* 주소 + 지도 링크 카드 */}
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-7">
            <Eyebrow>Address</Eyebrow>
            <h2 className="mt-1.5 font-serif text-[19px] font-bold text-ink">
              주소·지도
            </h2>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <p className="text-[15.5px] leading-relaxed text-ink">
                {clinic.address}
              </p>
              <CopyAddressButton address={clinic.address} />
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex items-center justify-between gap-4 rounded-xl border border-line bg-paper-warm px-5 py-4 transition-colors hover:border-accent"
            >
              <span className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                  <svg
                    viewBox="0 0 16 16"
                    className="h-4.5 w-4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M13 6.7c0 3.5-5 7.8-5 7.8S3 10.2 3 6.7a5 5 0 0110 0z" />
                    <circle cx="8" cy="6.7" r="1.8" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[14.5px] font-semibold text-ink transition-colors group-hover:text-accent">
                    네이버 지도에서 보기
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-ink-faint">
                    지도 앱에서 위치와 길찾기를 확인할 수 있어요
                  </span>
                </span>
              </span>
              <ExternalIcon className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
            </a>
          </div>

          {/* 진료시간 표 */}
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-7">
            <Eyebrow>Hours</Eyebrow>
            <h2 className="mt-1.5 font-serif text-[19px] font-bold text-ink">
              진료시간
            </h2>
            <table className="mt-4 w-full border-collapse text-[14.5px]">
              <tbody>
                {clinic.hours.map((h, i) => (
                  <tr
                    key={`${h.day}-${i}`}
                    className="border-b border-line last:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-[92px] py-3 pr-4 text-left align-top font-semibold text-ink"
                    >
                      {h.day}
                    </th>
                    <td className="py-3 align-top text-ink-soft">
                      {soften(h.time)}
                      {h.note && (
                        <span className="mt-0.5 block text-[12.5px] text-ink-faint">
                          {soften(h.note)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 space-y-1.5 border-t border-line-strong pt-4 text-[13.5px] leading-relaxed text-ink-faint">
              {clinic.lunch && <p>점심시간 {soften(clinic.lunch)}</p>}
              {closedText && <p>{closedText}</p>}
            </div>
          </div>
        </div>

        {/* 우측: 전화 + 예약 아웃링크 */}
        <div className="space-y-5 md:space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-card md:p-7">
            <Eyebrow>Tel</Eyebrow>
            <h2 className="mt-1.5 font-serif text-[19px] font-bold text-ink">
              전화 문의
            </h2>
            <p className="mt-3 font-serif text-[26px] font-bold tracking-tight text-ink">
              {clinic.phone}
            </p>
            <a
              href={`tel:${clinic.phone.replaceAll("-", "")}`}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-ink px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <svg
                viewBox="0 0 16 16"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M14 11.3v1.9a1.3 1.3 0 01-1.4 1.3A12.7 12.7 0 011.5 3.4 1.3 1.3 0 012.8 2h1.9a1.3 1.3 0 011.3 1.1c.1.7.3 1.4.5 2a1.3 1.3 0 01-.3 1.4l-.8.8a10.4 10.4 0 003.3 3.3l.8-.8a1.3 1.3 0 011.4-.3c.6.2 1.3.4 2 .5a1.3 1.3 0 011.1 1.3z" />
              </svg>
              전화 걸기
            </a>
          </div>

          <div className="rounded-2xl bg-accent p-6 text-white shadow-card md:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              Booking
            </p>
            <h2 className="mt-1.5 font-serif text-[19px] font-bold">
              진료 예약 안내
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">
              예약과 자세한 진료 안내는 병원 공식 홈페이지에서 확인하실 수
              있습니다.
            </p>
            <a
              href={clinic.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-accent transition-colors hover:bg-paper-warm"
            >
              병원 홈페이지 바로가기
              <ExternalIcon />
            </a>
          </div>
        </div>
      </section>

      {/* 5. 오시는 길 */}
      <section className="mt-14 md:mt-20">
        <SectionHeading eyebrow="Directions" title="오시는 길" />
        <ul className="grid gap-4 md:grid-cols-3">
          {clinic.access.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3.5 rounded-2xl bg-white p-5 shadow-card"
            >
              <AccessIcon text={item} />
              <p className="pt-1.5 text-[14px] leading-relaxed text-ink-soft">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. 소속 원장 */}
      <section className="mt-14 md:mt-20">
        <SectionHeading
          eyebrow="Doctors"
          title={`${clinic.shortName} 진료 원장`}
          moreHref="/doctors"
          moreLabel="전체 원장 보기"
        />
        <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {clinicDoctors.map((doctor) => {
            const cols = columnsByAuthor(doctor.slug);
            const pinned =
              cols.find((c) => c.todaysPick) ??
              cols.find((c) => c.featured) ??
              cols[0];
            return (
              <DoctorCard
                key={doctor.slug}
                doctor={doctor}
                pinnedColumn={pinned}
              />
            );
          })}
        </div>
      </section>

      {/* 7. 법정 고지 안내 */}
      <section className="mt-14 rounded-2xl border border-line bg-paper-warm px-6 py-5 md:mt-20">
        <p className="text-[13.5px] leading-relaxed text-ink-faint">
          비급여 진료비용 등 법정 고지 사항은 병원 공식 홈페이지에서 확인하실
          수 있습니다.{" "}
          <a
            href={clinic.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink-soft underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent"
          >
            공식 홈페이지 확인
          </a>
        </p>
      </section>
    </div>
  );
}
