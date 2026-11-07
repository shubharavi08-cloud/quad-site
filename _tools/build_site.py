#!/usr/bin/env python3
"""Build the QUAD blog and the ₹49 Masterclass page. Standard library only; safe to re-run.

    python3 _tools/build_site.py            (from the quad-site folder, or pass its path)
    then: python3 <story-quest>/_tools/geo/geo_build.py quad <quad-site>

Daily blog post = add one Markdown file to _blog/posts/ (source only; build output goes to blog/) named YYYY-MM-DD-slug.md with a front-matter block:
    ---
    title: ...            (required)
    slug: ...             (required, lowercase-with-dashes; becomes /blog/<slug>/)
    date: 2026-11-07      (required; a post with a future date is skipped until that day)
    description: ...      (required, ~150 characters, used by Google and AI search)
    subject: Maths | Science | Study skills
    chapter: 1            (optional)
    tags: a, b, c         (optional)
    video: YOUTUBE_ID     (optional, embedded under the title; also gives the card thumbnail)
    video_title: ...      (optional caption)
    draft: yes            (optional; skipped)
    ---
Body: ## and ### headings, paragraphs, - and 1. lists, > quotes, **bold**, *italic*, [text](url), and raw HTML
lines (e.g. <p class="eq">…</p> for a chalkboard equation with <sub>/<sup>).

Writes: blog/index.html, blog/<slug>/index.html, blog/feed.xml, blog/posts.json (read by geo_build.py for the
sitemap, llms.txt and structured data), masterclass/index.html.
"""
import datetime as dt, html, json, pathlib, re, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from shell import page  # noqa: E402

BASE = "https://quadacademy.org/"
WA = "https://wa.me/918088443156?text="
ORG = {"@id": BASE + "#org"}
MONTHS = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()


def nice_date(d):
    return f"{d.day} {MONTHS[d.month - 1]} {d.year}"


def wa(text):
    from urllib.parse import quote
    return WA + quote(text, safe="")


# ------------------------------------------------------------------ markdown (small, predictable subset)
def inline(s):
    s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
    s = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", s)

    def link(m):
        text, url = m.group(1), m.group(2)
        ext = url.startswith("http") and "quadacademy.org" not in url
        return f'<a href="{html.escape(url, quote=True)}"' + (' target="_blank" rel="noopener"' if ext else "") + f">{text}</a>"
    return re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", link, s)


def md(text):
    out, para, lst, quote = [], [], None, []

    def flush():
        nonlocal para, lst, quote
        if para:
            out.append("<p>" + inline(" ".join(para)) + "</p>")
            para = []
        if lst:
            tag, items = lst
            out.append(f"<{tag}>" + "".join(f"<li>{inline(i)}</li>" for i in items) + f"</{tag}>")
            lst = None
        if quote:
            out.append("<blockquote><p>" + "<br>".join(inline(q) for q in quote) + "</p></blockquote>")
            quote = []

    for raw in text.splitlines():
        line = raw.rstrip()
        if not line.strip():
            flush(); continue
        m = re.match(r"^(#{2,3})\s+(.*)", line)
        if m:
            flush(); n = len(m.group(1)); out.append(f"<h{n}>{inline(m.group(2))}</h{n}>"); continue
        if line.startswith(">"):
            if para or lst: flush()
            quote.append(line[1:].strip()); continue
        m = re.match(r"^\s*(?:([-*])|(\d+)\.)\s+(.*)", line)
        if m:
            tag = "ul" if m.group(1) else "ol"
            if para or quote or (lst and lst[0] != tag): flush()
            if not lst: lst = (tag, [])
            lst[1].append(m.group(3)); continue
        if line.lstrip().startswith("<"):
            flush(); out.append(line.strip()); continue
        if lst and raw.startswith("  "):
            lst[1][-1] += " " + line.strip(); continue
        if lst or quote: flush()
        para.append(line.strip())
    flush()
    return "\n".join(out)


def read_post(f):
    s = f.read_text(encoding="utf-8")
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", s, flags=re.S)
    if not m:
        sys.exit(f"{f.name}: missing front matter")
    meta = {}
    for ln in m.group(1).splitlines():
        if ":" in ln:
            k, v = ln.split(":", 1)
            v = v.strip()
            if len(v) >= 2 and v[0] == v[-1] == '"':
                v = v[1:-1]
            meta[k.strip()] = v
    for k in ("title", "slug", "date", "description"):
        if not meta.get(k):
            sys.exit(f"{f.name}: front matter needs '{k}'")
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", meta["slug"]):
        sys.exit(f"{f.name}: slug must be lowercase-with-dashes")
    meta["date"] = dt.date.fromisoformat(meta["date"])
    meta["tags"] = [t.strip() for t in meta.get("tags", "").split(",") if t.strip()]
    body = m.group(2).strip()
    meta["html"] = md(body)
    words = len(re.sub(r"<[^>]+>", " ", meta["html"]).split())
    meta["words"], meta["mins"] = words, max(1, round(words / 200))
    meta["url"] = f"{BASE}blog/{meta['slug']}/"
    meta["thumb"] = f"https://i.ytimg.com/vi/{meta['video']}/hqdefault.jpg" if meta.get("video") else "/quad_logo.jpg"
    return meta


# ------------------------------------------------------------------ blocks
SIDE = f"""<aside class="side">
  <div class="sbox y">
    <h3>₹49 Board Masterclass</h3>
    <p>2 hours live: the 20 questions that come almost every year, solved live, with a PDF to keep. Maths Sun 22 Nov, Science Sun 29 Nov, 10:30 am.</p>
    <a class="btn o" href="/masterclass/">See the Masterclass</a>
  </div>
  <div class="sbox">
    <h3>Board Boost · live batches</h3>
    <p>6 weeks from Mon 7 Dec: 18 live classes, a scored mock every Sunday, weekly parent reports. From ₹1,499.</p>
    <a class="btn" href="/board-boost/">Batches &amp; fees</a>
  </div>
  <div class="sbox">
    <h3>Free every day</h3>
    <p>New revision videos on the QUAD YouTube channel, and updates on our WhatsApp channel.</p>
    <a class="btn" href="https://www.youtube.com/@QuadAcademyOSH?sub_confirmation=1" target="_blank" rel="noopener">Subscribe</a>
    <a class="btn" href="https://whatsapp.com/channel/0029Vb9DNhtADTOEAMwyH723" target="_blank" rel="noopener">WhatsApp channel</a>
  </div>
</aside>"""


def post_page(p, others):
    vid = ""
    if p.get("video"):
        vid = (f'<div class="vframe"><iframe src="https://www.youtube-nocookie.com/embed/{p["video"]}" loading="lazy" '
               f'title="{html.escape(p.get("video_title") or p["title"], quote=True)}" allow="accelerometer; clipboard-write; '
               'encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>'
               + (f'<p class="vcap">▶ {html.escape(p["video_title"])} · '
                  f'<a href="https://www.youtube.com/watch?v={p["video"]}" target="_blank" rel="noopener">open on YouTube</a></p>'
                  if p.get("video_title") else ""))
    more = "".join(f'<li><a href="/blog/{o["slug"]}/">{html.escape(o["title"])}</a></li>' for o in others[:4])
    kick = '<span class="pill y">' + html.escape(p.get("subject") or "QUAD Blog") + "</span>" + \
           (f'<span class="pill t">Chapter {html.escape(p["chapter"])}</span>' if p.get("chapter") else "") + \
           '<span class="pill">CBSE Class 10</span>'
    body = f"""<p class="crumbs"><a href="/">QUAD Academy</a> › <a href="/blog/">Blog</a></p>
<header class="posthead">
  <div class="kicker">{kick}</div>
  <h1 style="font-size:clamp(1.8rem,4.6vw,3rem);line-height:1.08">{html.escape(p["title"])}</h1>
  <div class="postmeta"><span>By Team QUAD</span><time datetime="{p["date"].isoformat()}">{nice_date(p["date"])}</time><span>{p["mins"]} min read</span></div>
</header>
<div class="postgrid">
  <div>
    {vid}
    <article class="post">
{p["html"]}
    </article>
    <section style="border-top:0;padding-block:30px 0">
      <div class="contact">
        <h2>Stuck on a chapter?</h2>
        <p>Tell us which chapter costs you the most marks, and we will cover it in a video. Send it on WhatsApp.</p>
        <div class="cta" style="margin-top:4px"><a class="btn o" href="{wa('Hi QUAD, I read your blog. The chapter where I lose the most marks is: ')}">Message on WhatsApp</a></div>
      </div>
    </section>
    {f'<section style="border-top:0;padding-block:30px 0"><h2>More from the <span class="t">blog</span></h2><ul>{more}</ul></section>' if more else ''}
  </div>
  {SIDE}
</div>"""
    return page(f"{p['title']} · QUAD Academy Blog", p["description"], body, active="/blog/",
                og_url=p["url"], og_image=p["thumb"] if p["thumb"].startswith("http") else BASE + "quad_logo.jpg")


def index_page(posts):
    subjects = sorted({p.get("subject") or "Other" for p in posts})
    chips = '<button type="button" aria-pressed="true" data-f="">All</button>' + "".join(
        f'<button type="button" aria-pressed="false" data-f="{html.escape(s, quote=True)}">{html.escape(s)}</button>' for s in subjects)
    cards = "".join(f"""<a class="pcard" href="/blog/{p['slug']}/" data-s="{html.escape(p.get('subject') or 'Other', quote=True)}">
  <span class="th"><img src="{p['thumb']}" alt="" loading="lazy"><span class="pill y">{html.escape(p.get('subject') or 'QUAD')}</span></span>
  <small>{nice_date(p['date'])} · {p['mins']} min read</small>
  <b>{html.escape(p['title'])}</b>
  <p>{html.escape(p['description'])}</p>
</a>""" for p in posts)
    body = f"""<div class="hero" style="padding-bottom:30px">
  <div>
    <div class="kicker"><span class="pill y">QUAD Blog</span><span class="pill">CBSE Class 10 · Boards 2027</span></div>
    <h1>Board prep, <span class="hl">one post</span> <span class="t">at a time</span></h1>
    <p class="lede">Real board questions solved step by step, the mistakes that cost marks, and study plans that work. Written by the QUAD team for Class 10 Maths and Science.</p>
    <div class="cta"><a class="btn y" href="#posts">Read the posts</a><a class="btn" href="/masterclass/">₹49 Masterclass</a></div>
  </div>
  <div class="board tilt" aria-label="Blog at a glance">
    <h3>On the blog</h3>
    <div class="row"><span>Posts so far</span><span class="y">{len(posts)}</span></div>
    <div class="row"><span>Latest</span><span class="y">{nice_date(posts[0]['date']) if posts else '—'}</span></div>
    <div class="row"><span>Subjects</span><span class="y">{' · '.join(s for s in subjects)}</span></div>
    <div class="row"><span>New posts</span><span class="y">regularly</span></div>
  </div>
</div>
<section id="posts">
  <h2>All <span class="t">posts</span></h2>
  <div class="chips" role="group" aria-label="Filter by subject">{chips}</div>
  <div class="postlist" id="list">{cards}</div>
</section>
<section>
  <div class="contact">
    <h2>Get new posts and videos first</h2>
    <p>Follow the QUAD WhatsApp channel for every new post, video and class. No spam, and you can leave any time.</p>
    <div class="cta" style="margin-top:4px"><a class="btn o" href="https://whatsapp.com/channel/0029Vb9DNhtADTOEAMwyH723" target="_blank" rel="noopener">Follow on WhatsApp</a><a class="btn" href="/blog/feed.xml">RSS feed</a></div>
  </div>
</section>"""
    script = """<script>
document.querySelectorAll('.chips button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.chips button').forEach(x=>x.setAttribute('aria-pressed',x===b));
  const f=b.dataset.f;document.querySelectorAll('#list .pcard').forEach(c=>c.hidden=!!f&&c.dataset.s!==f);
}));
</script>"""
    return page("QUAD Academy Blog · CBSE Class 10 Maths & Science Board Prep",
                "Free CBSE Class 10 board-exam prep articles from QUAD Academy: real board questions solved step by step, "
                "common mistakes, and study plans for Maths and Science.", body, active="/blog/",
                og_url=BASE + "blog/", og_image=BASE + "quad_logo.jpg", script=script)


def feed(posts):
    items = "".join(f"""<item><title>{html.escape(p['title'])}</title><link>{p['url']}</link><guid>{p['url']}</guid>
<pubDate>{dt.datetime.combine(p['date'], dt.time(7, 0)).strftime('%a, %d %b %Y %H:%M:%S')} +0530</pubDate>
<description>{html.escape(p['description'])}</description></item>
""" for p in posts)
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>QUAD Academy Blog</title><link>{BASE}blog/</link>
<description>CBSE Class 10 Maths and Science board-exam prep from QUAD Academy.</description><language>en-IN</language>
{items}</channel></rss>
"""


def manifest(posts):
    """Pages for geo_build.py (sitemap, structured data)."""
    pages = [{"path": "blog/index.html", "priority": 0.7,
              "jsonld": [{"@type": "Blog", "name": "QUAD Academy Blog", "url": BASE + "blog/", "inLanguage": "en-IN",
                          "publisher": ORG, "blogPost": [{"@type": "BlogPosting", "headline": p["title"], "url": p["url"],
                                                          "datePublished": p["date"].isoformat()} for p in posts]}]}]
    for p in posts:
        ld = {"@type": "BlogPosting", "headline": p["title"], "description": p["description"], "url": p["url"],
              "mainEntityOfPage": p["url"], "datePublished": p["date"].isoformat(), "dateModified": p["date"].isoformat(),
              "inLanguage": "en-IN", "wordCount": p["words"], "author": {"@type": "Organization", "name": "Team QUAD", **ORG},
              "publisher": ORG, "educationalLevel": "Class 10", "keywords": ", ".join(p["tags"]),
              "image": p["thumb"] if p["thumb"].startswith("http") else BASE + "quad_logo.jpg",
              "isPartOf": {"@type": "Blog", "url": BASE + "blog/"}}
        if p.get("video"):
            ld["video"] = {"@type": "VideoObject", "name": p.get("video_title") or p["title"],
                           "description": p["description"], "thumbnailUrl": p["thumb"], "uploadDate": p["date"].isoformat(),
                           "embedUrl": f"https://www.youtube-nocookie.com/embed/{p['video']}",
                           "contentUrl": f"https://www.youtube.com/watch?v={p['video']}"}
        pages.append({"path": f"blog/{p['slug']}/index.html", "priority": 0.6, "jsonld": [ld]})
    return {"posts": [{"title": p["title"], "url": p["url"], "date": p["date"].isoformat(), "description": p["description"]}
                      for p in posts], "pages": pages}


# ------------------------------------------------------------------ masterclass
MC = [  # (subject, ISO date, label, css class, teacher). Change dates/teachers here, then rebuild.
    ("Maths", "2026-11-22", "Sun 22 Nov 2026", "m", "Shwetha J"),
    ("Science", "2026-11-29", "Sun 29 Nov 2026", "s", "Mihir R Shreshti"),
]


def masterclass_page():
    cards = ""
    for subj, iso, label, c, teacher in MC:
        cards += f"""<div class="batch {c}" data-start="{iso}T10:30:00+05:30" data-end="{iso}T12:30:00+05:30">
  <span class="status" data-status>{label}</span>
  <h3>{subj} Masterclass</h3>
  <p style="margin:0">CBSE Class 10 {subj}: the 20 questions that come almost every year, solved live, with a PDF to keep. Ask your doubts at the end.</p>
  <dl>
    <dt>Date</dt><dd>{label}</dd>
    <dt>Time</dt><dd>10:30 am – 12:30 pm IST (2 hours)</dd>
    <dt>Teacher</dt><dd>{teacher}</dd>
    <dt>Fee</dt><dd>₹49 · adjusted if you join a batch</dd>
  </dl>
  <a class="btn y" style="justify-self:start" data-book href="{wa(f"Hi, I'd like to book the ₹49 QUAD {subj} Masterclass ({label}). Child's name:  School:  City: ")}">Book {subj} for ₹49</a>
</div>"""
    body = f"""<div class="hero">
  <div>
    <div class="kicker"><span class="pill y">₹49 · 2 hours live</span><span class="pill">CBSE Class 10 · Boards 2027</span></div>
    <h1>The <span class="hl">₹49</span> Board <span class="t">Masterclass</span></h1>
    <p class="lede">Two hours, live, with a real teacher: the 20 questions that come almost every year in the CBSE Class 10 board paper, solved step by step. You keep the PDF, and you ask your doubts at the end. It is the easiest way to see how QUAD teaches before you join a batch.</p>
    <div class="cta">
      <a class="btn y" href="#book">Book a seat for ₹49</a>
      <a class="btn" href="/board-boost/">See the live batches</a>
    </div>
  </div>
  <div class="board tilt" aria-label="Masterclass at a glance">
    <h3>Masterclass · at a glance</h3>
    <div class="row"><span>Maths</span><span class="y">Sun 22 Nov</span></div>
    <div class="row"><span>Science</span><span class="y">Sun 29 Nov</span></div>
    <div class="row"><span>Time</span><span class="y">10:30 am – 12:30 pm</span></div>
    <div class="row"><span>Fee</span><span class="y">₹49</span></div>
    <div class="row" id="nextrow"><span>Next class</span><span class="y" id="next">—</span></div>
  </div>
</div>

<section id="book">
  <h2>Pick your <span class="t">subject</span></h2>
  <p class="sub">Each Masterclass is a separate two-hour class. Take one, or both.</p>
  <div class="batches">{cards}</div>
  <div class="cta"><a class="btn" href="{wa("Hi, I'd like to book BOTH ₹49 QUAD Masterclasses (Maths Sun 22 Nov and Science Sun 29 Nov). Child's name:  School:  City: ")}">Book both on WhatsApp</a></div>
  <p class="small" id="over" hidden>Both Masterclasses are over. Thank you to everyone who joined. The next step is the Board Boost live batch, starting Mon 7 Dec 2026.</p>
</section>

<section>
  <h2>What you <span class="t">get</span></h2>
  <div class="gets">
    <div class="item"><span class="n">20</span><h4>Questions that keep coming</h4><p>The questions that come almost every year, picked from real CBSE board papers.</p></div>
    <div class="item"><span class="n">2h</span><h4>Solved live</h4><p>Step by step, the way the board marks it, by a real teacher. Not a recording, not AI.</p></div>
    <div class="item"><span class="n">PDF</span><h4>Yours to keep</h4><p>Every question and solution in a PDF, so you can practise again before the exam.</p></div>
    <div class="item"><span class="n">?</span><h4>Doubts at the end</h4><p>Bring the questions you are stuck on and ask them live.</p></div>
  </div>
</section>

<section>
  <h2>How to <span class="t">book</span></h2>
  <ol class="steps">
    <li><b>Message us on WhatsApp</b><span>Tap a Book button above. Send your child's name, school and city.</span></li>
    <li><b>We confirm your seat</b><span>We reply on WhatsApp and share the payment details (UPI or a secure payment link).</span></li>
    <li><b>Join live on Sunday</b><span>Be ready at 10:30 am with a notebook and pen.</span></li>
  </ol>
  <p class="small">Prefer to call? <strong>+91 80884 43156</strong>.</p>
</section>

<section>
  <h2>Then, if you like it: <span class="t">Board Boost</span></h2>
  <p class="sub">Six weeks of live classes from Mon 7 Dec 2026 to Sat 16 Jan 2027: 18 live classes, a board-pattern mock every Sunday, weekly parent score reports on WhatsApp. One subject ₹1,499 (early bird till 25 Nov), both ₹2,499. Your ₹49 is adjusted in the fee.</p>
  <div class="cta"><a class="btn o" href="/board-boost/">See Board Boost batches</a></div>
</section>

<section>
  <h2>Questions <span class="t">parents ask</span></h2>
  <details><summary>Who is the Masterclass for?</summary><p>CBSE Class 10 students writing the 2027 board exam who want to see the most-asked Maths or Science questions solved live.</p></details>
  <details><summary>Who teaches it?</summary><p>Maths: Shwetha J (MA, MEd, 15+ years teaching Class 8–10 Maths and Science), who teaches the Maths Board Boost batch. Science: Mihir R Shreshti, IIT Madras alumnus, who teaches the Science batch.</p></details>
  <details><summary>Is it live or recorded?</summary><p>It is a live online class, taught by a real teacher, with time for doubts at the end.</p></details>
  <details><summary>What if we join a batch afterwards?</summary><p>The ₹49 is adjusted in the Board Boost fee.</p></details>
  <details><summary>How do we pay?</summary><p>Message us on WhatsApp. We confirm your seat and share the payment details: UPI or a secure payment link.</p></details>
  <details><summary>What do we need?</summary><p>A laptop, tablet or phone with a stable internet connection, a notebook and a pen.</p></details>
</section>"""
    script = """<script>
(function(){
  var now=Date.now(), next=null, left=0, fmt=function(d){return new Date(d).toLocaleDateString('en-IN',{weekday:'short',day:'numeric',month:'short',timeZone:'Asia/Kolkata'})};
  document.querySelectorAll('[data-start]').forEach(function(c){
    var s=Date.parse(c.dataset.start), e=Date.parse(c.dataset.end), st=c.querySelector('[data-status]'), b=c.querySelector('[data-book]');
    if(now>e){st.textContent='Done';st.className='status done';b.textContent='Join Board Boost instead';b.href='/board-boost/';c.style.opacity='.75'}
    else{left++; if(!next||s<next)next=s; var days=Math.ceil((s-now)/864e5);
      if(now>=s){st.textContent='Live now';st.className='status soon'}
      else if(days<=7){st.textContent=days<=1?'Tomorrow':days+' days to go';st.className='status soon'}}
  });
  var n=document.getElementById('next'); n.textContent=next?fmt(next):'Board Boost · 7 Dec';
  if(!left){document.getElementById('over').hidden=false}
})();
</script>"""
    return page("₹49 Board Masterclass · CBSE Class 10 Maths & Science · QUAD Academy",
                "Two-hour live ₹49 Masterclass for CBSE Class 10: the 20 questions that come almost every year, solved live "
                "by a real teacher, with a PDF to keep. Maths Sun 22 Nov, Science Sun 29 Nov 2026, 10:30 am IST.",
                body, active="/masterclass/", og_url=BASE + "masterclass/", og_image=BASE + "quad_logo.jpg", script=script)


# ------------------------------------------------------------------ free PDFs page (/free/)
WA_CHANNEL = "https://whatsapp.com/channel/0029Vb9DNhtADTOEAMwyH723"
NOTES_FOLDER = "https://drive.google.com/drive/folders/1sH6j0V007OiKelAPtwDDKZ8uiFEL01KP"
MOCKS_FOLDER = "https://drive.google.com/drive/folders/1zxDgrAMtbNd7ea0uz4YqgChRjUkxx2yK"
# Complete chapter guides: all 27 Drive PDFs shared "anyone with the link" on 7 Nov 2026 (Shubha: "share QUAD guides").
GUIDES_PUBLIC = True


def read_catalog(root):
    """Chapter list, guides and videos from catalog.js (the single source the home page uses)."""
    js = (root / "catalog.js").read_text(encoding="utf-8")
    guide = dict(re.findall(r'([ms]\d+):"([\w-]+)"', re.search(r"var GUIDE = \{(.*?)\};", js, re.S).group(1)))
    ch_src = re.search(r"var CH = \{(.*?)\n\};", js, re.S).group(1)
    ch = {}
    for subj in ("Maths", "Science"):
        block = re.search(subj + r":\[(.*?)\]\](?:,|\s*$)", ch_src, re.S).group(1) + "]"
        rows = []
        for row in re.findall(r"\[([^\[\]]*)\]", block):
            vals = [v.strip() for v in row.split(",")]
            vals = [None if v == "null" else v.strip('"') for v in vals]
            vals += [None] * (4 - len(vals))
            rows.append(vals[:4])
        ch[subj] = rows
    iq = {}
    for m in re.finditer(r'\{s:"(\w+)",c:(\d+),n:"[^"]*",id:"([\w-]+)"[^}]*\}', js):
        obj = m.group(0)
        at = re.search(r'at:"([^"]+)"', obj)
        iq[(m.group(1), int(m.group(2)))] = {"id": m.group(3), "hold": "hold:1" in obj, "at": at.group(1) if at else ""}
    return ch, guide, iq


def free_page(root):
    ch, guide, iq = read_catalog(root)
    now = dt.datetime.now(dt.timezone(dt.timedelta(hours=5, minutes=30)))
    D = lambda i: f"https://drive.google.com/file/d/{i}/view"
    counts = {"guide": 0, "notes": 0, "mm": 0, "sol": 0}
    lists = ""
    for subj in ("Maths", "Science"):
        rows = ""
        for i, (name, notes, _ab, mm) in enumerate(ch[subj], 1):
            key = ("m" if subj == "Maths" else "s") + str(i)
            links = ""
            if GUIDES_PUBLIC and guide.get(key):
                links += f'<a class="lk g" href="{D(guide[key])}">📘 Complete guide</a>'; counts["guide"] += 1
            if notes:
                links += f'<a class="lk n" href="{D(notes)}">Revision notes</a>'; counts["notes"] += 1
            if mm:
                links += f'<a class="lk mm" href="{D(mm)}">Mind map</a>'; counts["mm"] += 1
            v = iq.get((subj, i))
            live = v and not v["hold"] and (not v["at"] or dt.datetime.fromisoformat(v["at"]) <= now)
            if live:
                links += (f'<a class="lk a" href="https://www.youtube.com/watch?v={v["id"]}" '
                          f'title="The solutions book link is in the video description">Solutions book · in video description</a>')
                counts["sol"] += 1
            rows += (f'<div class="ch"><span class="no">{i}</span><div><div class="nm">{html.escape(name)}</div>'
                     f'<div class="links">{links}</div></div></div>\n')
        lists += f'<section id="{subj.lower()}"><h2>{subj} · <span class="t">chapter by chapter</span></h2>\n<div class="chs">{rows}</div></section>\n'
    style = """<style>
.chs{display:grid;gap:10px}.ch{display:grid;grid-template-columns:44px 1fr;gap:12px;align-items:start;background:var(--card);border:2px solid var(--line);border-radius:14px;padding:12px 14px}
.ch .no{font:900 1.1rem/44px var(--display);text-align:center;background:var(--yellow);color:var(--deep);border-radius:10px;height:44px}
.ch .nm{font:800 1.05rem/1.3 var(--display);margin-bottom:6px}.links{display:flex;flex-wrap:wrap;gap:6px}
.lk{display:inline-block;font:700 .8rem/1 var(--display);padding:.5rem .65rem;border-radius:9px;text-decoration:none;border:2px solid var(--line);color:var(--ink);background:#fff}
.lk.g{background:var(--osh);color:#fff;border-color:var(--osh)}.lk.n{border-color:var(--teal)}.lk.mm{border-color:var(--coral)}.lk.a{border-color:var(--yellow)}
.lk:hover{background:var(--yellow);color:var(--deep)}
.wa{background:#e8f7ee;border:3px solid #1f9d55;border-radius:18px;padding:20px;display:grid;gap:10px;margin-top:26px}.wa h2{margin:0}.wa p{margin:0;max-width:62ch}
.btn.g{background:#1f9d55;color:#fff;border-color:#14703c}
</style>"""
    body = f"""<div class="hero">
  <div>
    <div class="kicker"><span class="pill y">100% free</span><span class="pill">CBSE Class 10 · Boards 2027</span></div>
    <h1>Free <span class="hl">revision</span> <span class="t">PDFs</span></h1>
    <p class="lede">Complete chapter guides, crisp revision notes, mind maps, solutions books and board-pattern mock tests for CBSE Class 10 Maths and Science. No sign-up, no payment. Open a PDF in Google Drive and tap the download arrow to keep it.</p>
    <div class="cta"><a class="btn y" href="#maths">Maths PDFs</a><a class="btn y" href="#science">Science PDFs</a><a class="btn g" href="{WA_CHANNEL}">Join our WhatsApp Channel</a></div>
  </div>
  <div class="board tilt" aria-label="What is free here">
    <h3>Free on this page</h3>
    {f'<div class="row"><span>Complete chapter guides</span><span class="y">{counts["guide"]}</span></div>' if counts['guide'] else ''}
    <div class="row"><span>Revision notes</span><span class="y">{counts['notes']}</span></div>
    <div class="row"><span>Mind maps</span><span class="y">{counts['mm']}</span></div>
    <div class="row"><span>Solutions books (via video)</span><span class="y">{counts['sol']}</span></div>
    <div class="row"><span>Mock tests with answer keys</span><span class="y">folder</span></div>
  </div>
</div>

<section id="mocks">
  <h2>Mock tests &amp; <span class="t">full libraries</span></h2>
  <p class="sub">Board-pattern papers with answer keys: sit them in 3 hours, then mark yourself. Or open a whole library at once.</p>
  <div class="cta" style="margin-top:0"><a class="btn o" href="{MOCKS_FOLDER}">Mock tests (with answer keys)</a><a class="btn y" href="{NOTES_FOLDER}">All revision notes</a></div>
  <p class="small">Each solutions book is linked in its chapter video's description: watch, try every question yourself, then check your working.</p>
</section>

{lists}
<div class="wa">
  <h2>Join our WhatsApp Channel for daily updates</h2>
  <p>One board-exam trick a day, new chapter PDFs and videos the moment they are out. Free, and you can leave any time.</p>
  <div class="cta" style="margin-top:4px"><a class="btn g" href="{WA_CHANNEL}">Join the QUAD WhatsApp Channel</a></div>
</div>

<section>
  <h2>Want a <span class="t">real teacher</span> too?</h2>
  <p class="sub">See the most-asked board questions solved live in our two-hour ₹49 Masterclass, or join the six-week Board Boost live batch from Mon 7 Dec 2026.</p>
  <div class="cta" style="margin-top:0"><a class="btn y" href="/masterclass/">₹49 Masterclass</a><a class="btn o" href="/board-boost/">Board Boost · live batches</a></div>
</section>"""
    return page("Free CBSE Class 10 Maths & Science Revision PDFs · Notes, Mind Maps, Mock Tests · QUAD Academy",
                "Free CBSE Class 10 Maths and Science PDFs for Boards 2027: complete chapter guides, revision notes, mind maps, "
                "solutions books and board-pattern mock tests with answer keys. No sign-up.",
                body, active="/free/", og_url=BASE + "free/", og_image=BASE + "quad_logo.jpg", extra_head=style)


# ------------------------------------------------------------------ main
def main():
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else pathlib.Path(__file__).resolve().parent.parent)
    today = dt.datetime.now(dt.timezone(dt.timedelta(hours=5, minutes=30))).date()
    posts = []
    for f in sorted((root / "_blog/posts").glob("*.md")):
        p = read_post(f)
        if p.get("draft", "").lower() in ("yes", "true", "1") or p["date"] > today:
            print("skip (draft/future):", f.name); continue
        posts.append(p)
    slugs = [p["slug"] for p in posts]
    if len(slugs) != len(set(slugs)):
        sys.exit("two posts share a slug")
    posts.sort(key=lambda p: (p["date"], p["slug"]), reverse=True)
    blog = root / "blog"
    keep = set(slugs)
    for d in blog.iterdir():  # remove pages of posts that were deleted or set back to draft
        if d.is_dir() and d.name not in keep and (d / "index.html").exists():
            (d / "index.html").unlink(); d.rmdir(); print("removed old page", d.name)
    for p in posts:
        (blog / p["slug"]).mkdir(exist_ok=True)
        (blog / p["slug"] / "index.html").write_text(post_page(p, [o for o in posts if o is not p]), encoding="utf-8")
    (blog / "index.html").write_text(index_page(posts), encoding="utf-8")
    (blog / "feed.xml").write_text(feed(posts), encoding="utf-8")
    (blog / "posts.json").write_text(json.dumps(manifest(posts), ensure_ascii=False, indent=1), encoding="utf-8")
    (root / "masterclass").mkdir(exist_ok=True)
    (root / "masterclass/index.html").write_text(masterclass_page(), encoding="utf-8")
    (root / "free").mkdir(exist_ok=True)
    (root / "free/index.html").write_text(free_page(root), encoding="utf-8")
    print(f"built {len(posts)} posts, blog index, feed, posts.json, masterclass page, free PDFs page")


if __name__ == "__main__":
    main()
