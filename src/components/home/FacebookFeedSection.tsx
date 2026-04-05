const FACEBOOK_PAGE_URL = 'https://www.facebook.com/chokhchay.xahil.kea?locale=th_TH';

const timelineSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FACEBOOK_PAGE_URL,
)}&tabs=timeline&width=500&height=720&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&lazy=true`;

export default function FacebookFeedSection() {
  return (
    <section
      id="facebook-feed"
      className="py-12 md:py-16 bg-[linear-gradient(180deg,rgba(37,99,235,0.04),rgba(248,250,252,1))]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-6 lg:grid-cols-[0.95fr_1.15fr] lg:gap-8">
          <div className="rounded-[2rem] border border-white/70 bg-[linear-gradient(135deg,#f8fbff,#edf4ff)] p-6 md:p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold tracking-[0.18em] text-[var(--primary)] uppercase shadow-sm">
              Facebook Feed
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-bold leading-tight text-[var(--text-primary)]">
              อัปเดตโพสต์ล่าสุดของร้าน
            </h2>

            <p className="mt-4 text-base md:text-lg leading-8 text-[var(--text-secondary)]">
              เลื่อนดูโพสต์ โปรโมชั่น และภาพอะไหล่ล่าสุดได้จากในเว็บทันที
              ถ้าต้องการดูแบบเต็มหรือทักถามต่อ กดปุ่มลัดด้านล่างได้เลย
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4 shadow-sm">
                <p className="font-semibold text-[var(--text-primary)]">ดูโพสต์ได้ต่อเนื่อง</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  เลื่อนดูในกรอบด้านขวาได้เลย ไม่ต้องออกจากหน้าเว็บ
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-4 shadow-sm">
                <p className="font-semibold text-[var(--text-primary)]">ปุ่มลัดพร้อมใช้งาน</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  เปิดเพจ Facebook หรือสอบถามผ่าน LINE ได้ทันที
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1877F2] px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5 hover:bg-[#1669d9]"
              >
                <span>เปิดเพจ Facebook</span>
                <span aria-hidden="true">↗</span>
              </a>

              <a
                href="https://line.me/ti/p/~0972549395"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-white px-5 py-3 font-semibold text-[var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                <span>สอบถามผ่าน LINE</span>
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-3 md:p-4 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-sm">
            <div className="rounded-[1.6rem] border border-slate-100 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.1),transparent_38%),linear-gradient(180deg,#ffffff,#f8fbff)] p-4 md:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]">
                    Live Timeline
                  </p>
                  <h3 className="mt-1 text-xl md:text-2xl font-bold text-[var(--text-primary)]">
                    โพสต์ล่าสุดจากหน้าเพจ
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>เลื่อนดูโพสต์ได้ในกรอบนี้</span>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-inner">
                <iframe
                  src={timelineSrc}
                  title="Facebook page timeline"
                  width="100%"
                  height="720"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="yes"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                  className="w-full min-h-[720px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
