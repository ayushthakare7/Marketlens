import React, {useState, useEffect} from "react";

/* ─────────────────────────── DATA ─────────────────────────── */
const NEWS = [
  {
    id: 1, category: "Markets", tag: "Breaking", sentiment: "bullish",
    ticker: "SPY +2.4%", views: "128K", readTime: "4 min", time: "2m ago",
    author: "Sarah Mitchell", authorRole: "Markets Editor",
    title: "Fed Signals Three Rate Cuts in 2026 Amid Cooling Inflation",
    summary: "Federal Reserve officials hint at aggressive easing as CPI drops to 2.1%, sparking a rally across equities and crypto.",
    color: "#1ed760",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: 2, category: "Tech", tag: "Exclusive", sentiment: "bullish",
    ticker: "NVDA +5.1%", views: "94K", readTime: "6 min", time: "18m ago",
    author: "James Park", authorRole: "Tech Correspondent",
    title: "NVIDIA's Next-Gen GPU: 3× Performance Over H100 Leaked",
    summary: "Internal documents reveal Blackwell Ultra chips targeting AI inference at sub-$1 per million tokens.",
    color: "#3d91f5",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: 3, category: "Crypto", tag: "Live", sentiment: "bullish",
    ticker: "BTC +8.3%", views: "213K", readTime: "5 min", time: "34m ago",
    author: "Alex Chen", authorRole: "Crypto Desk",
    title: "Bitcoin Breaks $120K as ETF Inflows Hit All-Time Record",
    summary: "BlackRock's IBIT records $4.2B single-day inflow. Analysts target $150K by Q3 2026.",
    color: "#f7931a",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&q=80",
  },
  {
    id: 4, category: "Earnings", tag: "Alert", sentiment: "bearish",
    ticker: "AAPL -3.2%", views: "76K", readTime: "7 min", time: "1h ago",
    author: "Emma Torres", authorRole: "Equities Reporter",
    title: "Apple Misses Revenue Estimates for First Time in 11 Quarters",
    summary: "China weakness drags Services growth. Tim Cook announces $110B buyback but shares slide afterhours.",
    color: "#ff453a",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  },
  {
    id: 5, category: "Macro", tag: "Analysis", sentiment: "bearish",
    ticker: "DXY -1.7%", views: "55K", readTime: "8 min", time: "2h ago",
    author: "David Russo", authorRole: "Macro Strategist",
    title: "Dollar Index Collapses to 5-Year Low as Gold Hits $3,400",
    summary: "DXY falls through critical 98 support as global central banks diversify reserves rapidly.",
    color: "#ffd60a",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
  },
  {
    id: 6, category: "IPO", tag: "Watch", sentiment: "neutral",
    ticker: "SPACE $200B", views: "189K", readTime: "5 min", time: "3h ago",
    author: "Lisa Huang", authorRole: "Capital Markets",
    title: "SpaceX Starlink IPO Filing Said to Be Imminent at $200B",
    summary: "Sources confirm SEC registration documents drafted. Morgan Stanley and Goldman tapped as lead underwriters.",
    color: "#bf5af2",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=600&q=80",
  },
  {
    id: 7, category: "Markets", tag: "Report", sentiment: "bullish",
    ticker: "GOLD +2.9%", views: "44K", readTime: "4 min", time: "4h ago",
    author: "Sarah Mitchell", authorRole: "Markets Editor",
    title: "Gold Surges Past $3,400 as Safe-Haven Demand Explodes",
    summary: "Central bank buying accelerates with China adding 60 tonnes in March alone, the largest monthly purchase since 2019.",
    color: "#ffd60a",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=600&q=80",
  },
  {
    id: 8, category: "Tech", tag: "Deep Dive", sentiment: "neutral",
    ticker: "MSFT +0.9%", views: "38K", readTime: "10 min", time: "5h ago",
    author: "James Park", authorRole: "Tech Correspondent",
    title: "Microsoft Copilot+ PCs Capture 18% of Enterprise Laptop Market",
    summary: "AI-integrated hardware is reshaping corporate procurement cycles with IT budgets shifting to NPU-equipped devices.",
    color: "#3d91f5",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
  },
];

const TICKERS = [
  { sym: "S&P 500", val: 5842.3, chg: 2.41, bull: true },
  { sym: "NASDAQ", val: 19211.4, chg: 3.12, bull: true },
  { sym: "BTC/USD", val: 121430, chg: 8.32, bull: true },
  { sym: "ETH/USD", val: 4821, chg: 6.44, bull: true },
  { sym: "NVDA", val: 1124.5, chg: 5.18, bull: true },
  { sym: "AAPL", val: 187.3, chg: -3.24, bull: false },
  { sym: "TSLA", val: 312.8, chg: 1.87, bull: true },
  { sym: "GOLD", val: 3412.0, chg: 2.91, bull: true },
  { sym: "CRUDE OIL", val: 79.4, chg: -0.73, bull: false },
  { sym: "DXY", val: 97.8, chg: -1.70, bull: false },
];

const NAV_ITEMS = [
  { id: "home", label: "For You", icon: HomeIcon },
  { id: "markets", label: "Markets", icon: ChartIcon },
  { id: "crypto", label: "Crypto", icon: CoinIcon },
  { id: "tech", label: "Technology", icon: CpuIcon },
  { id: "macro", label: "Macro", icon: GlobeIcon },
  { id: "saved", label: "Saved Stories", icon: BookmarkIcon },
];

const CATEGORIES = ["All", "Markets", "Tech", "Crypto", "Earnings", "Macro", "IPO"];

const TAG_COLORS = {
  Breaking: "#ff453a", Exclusive: "#f7931a", Live: "#1ed760",
  Alert: "#ff453a", Analysis: "#3d91f5", Watch: "#bf5af2",
  Report: "#ffd60a", "Deep Dive": "#30c8c8",
};

/* ─────────────────────────── APP ─────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeCategory, setActiveCategory] = useState("All");
  const [saved, setSaved] = useState([1, 3]);
  const [search, setSearch] = useState("");
  const [tickers, setTickers] = useState(TICKERS);
  const [nowPlaying, setNowPlaying] = useState(NEWS[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [fearValue, setFearValue] = useState(72);

  useEffect(() => {
    const id = setInterval(() => {
      setTickers(prev => prev.map(t => {
        const d = (Math.random() - 0.49) * 0.4;
        const newChg = parseFloat((t.chg + d).toFixed(2));
        return { ...t, chg: newChg, bull: newChg >= 0 };
      }));
      setFearValue(v => Math.max(15, Math.min(92, v + (Math.random() - 0.48) * 2.5)));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const toggleSave = id => setSaved(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

  const filtered = NEWS.filter(n => {
    if (activeNav === "saved") return saved.includes(n.id);
    if (activeNav === "crypto") return n.category === "Crypto";
    if (activeNav === "tech") return n.category === "Tech";
    if (activeNav === "markets") return ["Markets", "Earnings", "IPO"].includes(n.category);
    if (activeNav === "macro") return n.category === "Macro";
    const catMatch = activeCategory === "All" || n.category === activeCategory;
    const searchMatch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const hero = filtered[0];
  const grid = filtered.slice(1);

  return (
    <div style={s.root}>
      <style>{CSS}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{ ...s.sidebar, width: sidebarCollapsed ? 72 : 240 }}>
        <div style={s.logoArea}>
          <div style={s.logoMark}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" fill="#1ed760" opacity="0.9"/>
            </svg>
          </div>
          {!sidebarCollapsed && (
            <div style={s.logoTextArea}>
              <span style={s.logoName}>Market<span style={s.logoAccent}>Lens</span></span>
              <span style={s.logoTag}>Financial Intelligence</span>
            </div>
          )}
          <button style={s.collapseBtn} onClick={() => setSidebarCollapsed(p => !p)}>
            {sidebarCollapsed ? "›" : "‹"}
          </button>
        </div>

        <nav style={s.nav}>
          {NAV_ITEMS.map(item => {
            const active = activeNav === item.id;
            return (
              <button key={item.id}
                style={{ ...s.navItem, ...(active ? s.navItemActive : {}) }}
                onClick={() => setActiveNav(item.id)}
                title={sidebarCollapsed ? item.label : ""}>
                <span style={{ ...s.navIcon, color: active ? "#1ed760" : "#b3b3b3" }}>
                  <item.icon />
                </span>
                {!sidebarCollapsed && (
                  <span style={{ ...s.navLabel, color: active ? "#fff" : "#b3b3b3" }}>{item.label}</span>
                )}
                {active && <span style={s.navPill} />}
              </button>
            );
          })}
        </nav>

        {!sidebarCollapsed && (
          <div style={s.savedCount}>
            <BookmarkIcon />
            <span>{saved.length} saved stories</span>
          </div>
        )}
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div style={s.content}>
        <header style={s.topbar}>
          <div style={s.searchWrap}>
            <svg style={s.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b3b3b3" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input style={s.searchInput} placeholder="Search stories, tickers, topics…"
              value={search} onChange={e => setSearch(e.target.value)} />
            {search && <button style={s.clearBtn} onClick={() => setSearch("")}>×</button>}
          </div>
          <div style={s.topbarRight}>
            <div style={s.timeDisplay}>{new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
            <div style={s.avatar}>SJ</div>
          </div>
        </header>

        {/* Ticker strip */}
        <div style={s.tickerStrip}>
          <div style={s.tickerInner}>
            {[...tickers, ...tickers].map((t, i) => (
              <div key={i} style={s.tickerPill}>
                <span style={s.tickerSym}>{t.sym}</span>
                <span style={{ ...s.tickerChg, color: t.bull ? "#1ed760" : "#ff453a" }}>
                  {t.bull ? "▲" : "▼"} {Math.abs(t.chg).toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll area */}
        <div style={s.scrollArea}>
          {activeNav === "home" && (
            <div style={s.categoryRow}>
              {CATEGORIES.map(c => (
                <button key={c}
                  style={{ ...s.catPill, ...(activeCategory === c ? s.catPillActive : {}) }}
                  onClick={() => setActiveCategory(c)}>{c}</button>
              ))}
            </div>
          )}

          <div style={s.sectionLabel}>
            <span>{activeNav === "home" ? "Today's Top Stories" : activeNav === "saved" ? "Your Saved Stories" : NAV_ITEMS.find(n => n.id === activeNav)?.label}</span>
            <span style={s.storyCount}>{filtered.length} stories</span>
          </div>

          {/* Hero */}
          {hero && (
            <div style={s.heroCard} onClick={() => setNowPlaying(hero)} className="hero-card">
              <div style={s.heroImageWrap}>
                <img src={hero.image} alt="" style={s.heroImage} />
                <div style={{ ...s.heroImageGrad }} />
                <div style={{ ...s.heroCategoryBadge, background: hero.color + "22", color: hero.color, borderColor: hero.color + "44" }}>
                  {hero.category}
                </div>
              </div>
              <div style={s.heroBody}>
                <div style={s.heroTopRow}>
                  <span style={{ ...s.tagBadge, background: TAG_COLORS[hero.tag] + "22", color: TAG_COLORS[hero.tag], borderColor: TAG_COLORS[hero.tag] + "55" }}>
                    {hero.tag === "Live" && <span style={s.liveDot} />}{hero.tag}
                  </span>
                  <span style={{ ...s.tickerBadge, color: hero.sentiment === "bullish" ? "#1ed760" : hero.sentiment === "bearish" ? "#ff453a" : "#ffd60a" }}>
                    {hero.sentiment === "bullish" ? "▲" : hero.sentiment === "bearish" ? "▼" : "—"} {hero.ticker}
                  </span>
                </div>
                <h1 style={s.heroTitle}>{hero.title}</h1>
                <p style={s.heroSummary}>{hero.summary}</p>
                <div style={s.heroFooter}>
                  <div style={s.heroAuthor}>
                    <div style={{ ...s.authorAvatar, background: hero.color }}>{hero.author[0]}</div>
                    <div>
                      <div style={s.authorName}>{hero.author}</div>
                      <div style={s.authorRole}>{hero.authorRole}</div>
                    </div>
                  </div>
                  <div style={s.heroMeta}>
                    <span style={s.metaItem}>⏱ {hero.readTime}</span>
                    <span style={s.metaItem}>👁 {hero.views}</span>
                    <button style={s.heroReadBtn} className="read-btn" onClick={e => e.stopPropagation()}>Read →</button>
                    <button style={{ ...s.saveBtn, color: saved.includes(hero.id) ? "#1ed760" : "#535353" }}
                      onClick={e => { e.stopPropagation(); toggleSave(hero.id); }}>
                      <BookmarkIcon filled={saved.includes(hero.id)} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {grid.length > 0 && <div style={s.gridLabel}>More Stories</div>}
          <div style={s.newsGrid}>
            {grid.map((article, i) => (
              <NewsCard key={article.id} article={article}
                saved={saved.includes(article.id)}
                onSave={() => toggleSave(article.id)}
                index={i} onClick={() => setNowPlaying(article)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={s.emptyState}>
              <div style={s.emptyIcon}>🔍</div>
              <div style={s.emptyTitle}>Nothing here yet</div>
              <div style={s.emptyText}>{activeNav === "saved" ? "Save stories to find them here" : "Try a different search or category"}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <aside style={s.rightPanel}>
        <div style={s.widget}>
          <div style={s.widgetTitle}>Fear & Greed Index</div>
          <FearMeter value={fearValue} />
        </div>

        <div style={s.widget}>
          <div style={s.widgetTitle}>
            <span>Live Markets</span>
            <span style={s.liveBadge}>● LIVE</span>
          </div>
          {tickers.slice(0, 7).map(t => (
            <div key={t.sym} style={s.marketRow}>
              <span style={s.mktSym}>{t.sym}</span>
              <div style={s.mktRight}>
                <span style={s.mktPrice}>{t.val.toLocaleString()}</span>
                <span style={{ ...s.mktChg, color: t.bull ? "#1ed760" : "#ff453a", background: t.bull ? "#1ed76015" : "#ff453a15" }}>
                  {t.bull ? "+" : ""}{t.chg.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {nowPlaying && (
          <div style={s.nowReadingCard}>
            <div style={s.nowReadingLabel}>Now Reading</div>
            <div style={s.nowReadingInner}>
              <img src={nowPlaying.image} alt="" style={s.nowReadingThumb} />
              <div style={s.nowReadingText}>
                <div style={s.nowReadingTitle}>{nowPlaying.title}</div>
                <div style={s.nowReadingAuthor}>{nowPlaying.author}</div>
              </div>
            </div>
            <div style={s.progressBarWrap}>
              <div style={{ ...s.progressBar, width: "38%" }} />
            </div>
            <div style={s.progressLabels}><span>2 min in</span><span>{nowPlaying.readTime}</span></div>
          </div>
        )}
      </aside>
    </div>
  );
}

function NewsCard({ article, saved, onSave, index, onClick }) {
  return (
    <div style={{ ...s.card, animationDelay: `${index * 0.06}s` }} className="news-card" onClick={onClick}>
      <div style={s.cardImageWrap}>
        <img src={article.image} alt="" style={s.cardImage} />
        <div style={{ ...s.cardCatBadge, background: article.color + "22", color: article.color }}>
          {article.category}
        </div>
      </div>
      <div style={s.cardBody}>
        <div style={s.cardTopRow}>
          <span style={{ ...s.tagBadgeSm, background: TAG_COLORS[article.tag] + "18", color: TAG_COLORS[article.tag] }}>
            {article.tag === "Live" && <span style={{ ...s.liveDot, width: 5, height: 5 }} />}{article.tag}
          </span>
          <span style={s.cardTime}>{article.time}</span>
        </div>
        <h3 style={s.cardTitle}>{article.title}</h3>
        <p style={s.cardSummary}>{article.summary}</p>
        <div style={s.cardFooter}>
          <div style={s.cardAuthor}>
            <div style={{ ...s.authorAvatar, width: 24, height: 24, fontSize: 10, background: article.color }}>
              {article.author[0]}
            </div>
            <span style={s.cardAuthorName}>{article.author}</span>
          </div>
          <div style={s.cardStats}>
            <span style={{ ...s.tickerSmall, color: article.sentiment === "bullish" ? "#1ed760" : article.sentiment === "bearish" ? "#ff453a" : "#ffd60a" }}>
              {article.ticker}
            </span>
            <button style={{ ...s.saveBtn, color: saved ? "#1ed760" : "#535353" }}
              onClick={e => { e.stopPropagation(); onSave(); }}>
              <BookmarkIcon filled={saved} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FearMeter({ value }) {
  const label = value > 74 ? "Extreme Greed" : value > 55 ? "Greed" : value > 45 ? "Neutral" : value > 28 ? "Fear" : "Extreme Fear";
  const color = value > 74 ? "#1ed760" : value > 55 ? "#ffd60a" : value > 45 ? "#b3b3b3" : value > 28 ? "#ff9f0a" : "#ff453a";
  const angle = -90 + (value / 100) * 180;
  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox="0 0 140 80" style={{ width: "100%", overflow: "visible" }}>
        <defs>
          <linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff453a"/>
            <stop offset="25%" stopColor="#ff9f0a"/>
            <stop offset="50%" stopColor="#ffd60a"/>
            <stop offset="75%" stopColor="#1ed760"/>
            <stop offset="100%" stopColor="#3d91f5"/>
          </linearGradient>
        </defs>
        <path d="M15 70 A55 55 0 0 1 125 70" fill="none" stroke="#282828" strokeWidth="14" strokeLinecap="round"/>
        <path d="M15 70 A55 55 0 0 1 125 70" fill="none" stroke="url(#fg)" strokeWidth="10" strokeLinecap="round" opacity="0.85"/>
        <line x1="70" y1="70" x2="70" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round"
          transform={`rotate(${angle}, 70, 70)`}
          style={{ transition: "transform 1s cubic-bezier(.34,1.56,.64,1)" }}/>
        <circle cx="70" cy="70" r="5" fill="#181818" stroke="white" strokeWidth="2"/>
      </svg>
      <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: "'Syne', sans-serif", lineHeight: 1, marginTop: -8 }}>
        {Math.round(value)}
      </div>
      <div style={{ fontSize: 12, color, fontWeight: 600, marginTop: 4, letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 10, color: "#535353", marginTop: 6 }}>CNN Fear & Greed · Live</div>
    </div>
  );
}

function HomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>;
}
function ChartIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}
function CoinIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v2m0 8v2M9.17 9.17A4 4 0 0 1 16 12a4 4 0 0 1-6.83 2.83"/></svg>;
}
function CpuIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>;
}
function GlobeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
function BookmarkIcon({ filled }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
}

const s = {
  root: { display: "flex", height: "100vh", background: "#121212", color: "#fff", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" },
  sidebar: { flexShrink: 0, background: "#000", display: "flex", flexDirection: "column", padding: "24px 0", transition: "width 0.3s cubic-bezier(.4,0,.2,1)", overflow: "hidden", borderRight: "1px solid #282828", position: "relative", zIndex: 10 },
  logoArea: { display: "flex", alignItems: "center", gap: 10, padding: "0 16px 28px", borderBottom: "1px solid #1a1a1a", marginBottom: 12 },
  logoMark: { width: 40, height: 40, borderRadius: 10, background: "#191919", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  logoTextArea: { display: "flex", flexDirection: "column", overflow: "hidden" },
  logoName: { fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: -0.3, whiteSpace: "nowrap", fontFamily: "'Syne', sans-serif" },
  logoAccent: { color: "#1ed760" },
  logoTag: { fontSize: 9, color: "#535353", letterSpacing: 0.8, textTransform: "uppercase", whiteSpace: "nowrap" },
  collapseBtn: { marginLeft: "auto", background: "none", border: "none", color: "#535353", cursor: "pointer", fontSize: 18, padding: "2px 6px", flexShrink: 0, lineHeight: 1 },
  nav: { flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 8px" },
  navItem: { display: "flex", alignItems: "center", gap: 14, padding: "10px 12px", borderRadius: 8, border: "none", background: "none", cursor: "pointer", position: "relative", transition: "background 0.15s", textAlign: "left", whiteSpace: "nowrap" },
  navItemActive: { background: "#282828" },
  navIcon: { display: "flex", flexShrink: 0, transition: "color 0.15s" },
  navLabel: { fontSize: 13, fontWeight: 600, transition: "color 0.15s" },
  navPill: { position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: 3, height: 20, background: "#1ed760", borderRadius: "0 2px 2px 0" },
  savedCount: { display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", fontSize: 11, color: "#535353", borderTop: "1px solid #1a1a1a", marginTop: "auto" },
  content: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
  topbar: { display: "flex", alignItems: "center", gap: 16, padding: "16px 28px", background: "rgba(18,18,18,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid #282828", flexShrink: 0 },
  searchWrap: { flex: 1, maxWidth: 520, display: "flex", alignItems: "center", gap: 10, background: "#282828", borderRadius: 24, padding: "9px 16px" },
  searchIcon: { flexShrink: 0 },
  searchInput: { flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
  clearBtn: { background: "none", border: "none", color: "#535353", cursor: "pointer", fontSize: 16, lineHeight: 1 },
  topbarRight: { display: "flex", alignItems: "center", gap: 14, marginLeft: "auto" },
  timeDisplay: { fontSize: 12, color: "#535353", fontWeight: 500 },
  avatar: { width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #1ed760, #17b34e)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#000", cursor: "pointer" },
  tickerStrip: { background: "#0a0a0a", borderBottom: "1px solid #1a1a1a", overflow: "hidden", height: 36, flexShrink: 0 },
  tickerInner: { display: "flex", width: "max-content", animation: "tickerMove 50s linear infinite", height: "100%", alignItems: "center" },
  tickerPill: { display: "flex", alignItems: "center", gap: 8, padding: "0 20px", borderRight: "1px solid #1a1a1a", height: "100%" },
  tickerSym: { fontSize: 11, fontWeight: 700, color: "#b3b3b3", fontFamily: "'Syne', sans-serif", letterSpacing: 0.3 },
  tickerChg: { fontSize: 11, fontWeight: 700, fontFamily: "'DM Mono', monospace", transition: "color 0.6s" },
  scrollArea: { flex: 1, overflowY: "auto", padding: "28px 28px 40px" },
  categoryRow: { display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" },
  catPill: { background: "#282828", border: "1px solid #383838", color: "#b3b3b3", fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 20, cursor: "pointer", transition: "all 0.15s", fontFamily: "'DM Sans', sans-serif" },
  catPillActive: { background: "#fff", borderColor: "#fff", color: "#000" },
  sectionLabel: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 20, fontFamily: "'Syne', sans-serif", letterSpacing: -0.5 },
  storyCount: { fontSize: 13, fontWeight: 500, color: "#535353", fontFamily: "'DM Sans', sans-serif" },
  heroCard: { display: "grid", gridTemplateColumns: "1fr 1.2fr", borderRadius: 16, overflow: "hidden", background: "#181818", marginBottom: 32, cursor: "pointer", border: "1px solid #282828", transition: "border-color 0.2s" },
  heroImageWrap: { position: "relative", minHeight: 340, overflow: "hidden" },
  heroImage: { width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" },
  heroImageGrad: { position: "absolute", inset: 0, background: "linear-gradient(to right, #181818 0%, transparent 60%)" },
  heroCategoryBadge: { position: "absolute", top: 14, left: 14, fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: 20, border: "1px solid", textTransform: "uppercase", letterSpacing: 0.8 },
  heroBody: { padding: "32px 32px", display: "flex", flexDirection: "column", gap: 14 },
  heroTopRow: { display: "flex", alignItems: "center", gap: 10 },
  heroTitle: { fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 800, lineHeight: 1.3, color: "#fff", letterSpacing: -0.4 },
  heroSummary: { fontSize: 14, color: "#b3b3b3", lineHeight: 1.65 },
  heroFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", flexWrap: "wrap", gap: 12 },
  heroAuthor: { display: "flex", alignItems: "center", gap: 10 },
  heroMeta: { display: "flex", alignItems: "center", gap: 10 },
  metaItem: { fontSize: 12, color: "#535353" },
  heroReadBtn: { background: "#1ed760", color: "#000", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" },
  saveBtn: { background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", transition: "color 0.2s", padding: 4 },
  tagBadge: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 800, padding: "4px 10px", borderRadius: 20, border: "1px solid", letterSpacing: 0.5, textTransform: "uppercase" },
  tagBadgeSm: { display: "inline-flex", alignItems: "center", gap: 4, fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 12, letterSpacing: 0.4 },
  liveDot: { width: 6, height: 6, borderRadius: "50%", background: "#1ed760", display: "inline-block", animation: "pulse 1.2s ease-in-out infinite" },
  tickerBadge: { fontSize: 12, fontWeight: 800, fontFamily: "'DM Mono', monospace", letterSpacing: 0.3 },
  authorAvatar: { width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#000", flexShrink: 0 },
  authorName: { fontSize: 13, fontWeight: 600, color: "#e0e0e0" },
  authorRole: { fontSize: 11, color: "#535353" },
  gridLabel: { fontSize: 16, fontWeight: 700, color: "#b3b3b3", marginBottom: 16, fontFamily: "'Syne', sans-serif" },
  newsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  card: { background: "#181818", borderRadius: 12, overflow: "hidden", cursor: "pointer", border: "1px solid #282828", transition: "all 0.2s", animation: "fadeUp 0.45s ease both" },
  cardImageWrap: { position: "relative", height: 150, overflow: "hidden" },
  cardImage: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" },
  cardCatBadge: { position: "absolute", top: 10, left: 10, fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 12, textTransform: "uppercase", letterSpacing: 0.6 },
  cardBody: { padding: "14px 14px 12px" },
  cardTopRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  cardTime: { fontSize: 10, color: "#535353" },
  cardTitle: { fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, lineHeight: 1.4, color: "#e8e8e8", marginBottom: 6 },
  cardSummary: { fontSize: 12, color: "#727272", lineHeight: 1.55, marginBottom: 10 },
  cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardAuthor: { display: "flex", alignItems: "center", gap: 6 },
  cardAuthorName: { fontSize: 11, color: "#727272", fontWeight: 500 },
  cardStats: { display: "flex", alignItems: "center", gap: 6 },
  tickerSmall: { fontSize: 10, fontWeight: 700, fontFamily: "'DM Mono', monospace" },
  rightPanel: { width: 280, flexShrink: 0, background: "#000", borderLeft: "1px solid #282828", padding: "24px 16px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 },
  widget: { background: "#181818", borderRadius: 12, padding: "16px 14px", border: "1px solid #282828" },
  widgetTitle: { fontSize: 12, fontWeight: 700, color: "#b3b3b3", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" },
  liveBadge: { fontSize: 9, fontWeight: 800, color: "#1ed760", letterSpacing: 0.5, animation: "pulse 1.5s ease-in-out infinite" },
  marketRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #282828" },
  mktSym: { fontSize: 12, fontWeight: 700, color: "#e0e0e0", fontFamily: "'Syne', sans-serif" },
  mktRight: { display: "flex", alignItems: "center", gap: 6 },
  mktPrice: { fontSize: 11, color: "#727272", fontFamily: "'DM Mono', monospace" },
  mktChg: { fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, fontFamily: "'DM Mono', monospace", transition: "color 0.6s, background 0.6s" },
  nowReadingCard: { background: "linear-gradient(135deg, #1a1a1a, #141414)", borderRadius: 12, padding: "16px 14px", border: "1px solid #282828" },
  nowReadingLabel: { fontSize: 10, fontWeight: 700, color: "#1ed760", letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 12 },
  nowReadingInner: { display: "flex", gap: 10, marginBottom: 14 },
  nowReadingThumb: { width: 48, height: 48, borderRadius: 8, objectFit: "cover", flexShrink: 0 },
  nowReadingText: { flex: 1 },
  nowReadingTitle: { fontSize: 12, fontWeight: 600, color: "#e0e0e0", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  nowReadingAuthor: { fontSize: 10, color: "#535353", marginTop: 3 },
  progressBarWrap: { height: 3, background: "#282828", borderRadius: 2, overflow: "hidden", marginBottom: 6 },
  progressBar: { height: "100%", background: "#1ed760", borderRadius: 2 },
  progressLabels: { display: "flex", justifyContent: "space-between", fontSize: 10, color: "#535353" },
  emptyState: { textAlign: "center", padding: "80px 20px" },
  emptyIcon: { fontSize: 40, marginBottom: 14 },
  emptyTitle: { fontSize: 18, fontWeight: 700, color: "#535353", fontFamily: "'Syne', sans-serif", marginBottom: 6 },
  emptyText: { fontSize: 13, color: "#383838" },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { overflow: hidden; }
  ::-webkit-scrollbar { width: 5px; background: #121212; }
  ::-webkit-scrollbar-thumb { background: #282828; border-radius: 3px; }
  @keyframes tickerMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
  .hero-card:hover { border-color: #535353 !important; }
  .hero-card:hover img { transform: scale(1.03); }
  .news-card:hover { background: #1f1f1f !important; border-color: #383838 !important; transform: translateY(-2px); }
  .news-card:hover img { transform: scale(1.06); }
  .read-btn:hover { background: #1fdf64 !important; transform: scale(1.04); }
  input::placeholder { color: #535353; }
`;
