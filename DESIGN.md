# Design System: FlagForge

<!-- impeccable:design-schema 1 -->

## 1. Visual Philosophy & Material World

FlagForge implements an **"Instrument-Panel" & Sci-Fi Device** design language inspired by futuristic hardware, dark starfields, and tactile security workstations.
- **Background**: Deep void cosmic canvas (`#0A0A0C`) with animated drifting stars and subtle ambient nebula gradients.
- **Chassis**: Floating device container with `border-radius: 32px` to `40px`, subtle `1px` translucent borders, and multi-layered elevation drop shadows (`rgba(0,0,0,0.9)`).
- **Surface Panels**: Off-white light panel (`#F4F3F0`) with high-contrast dark typography (`#131316`) for primary module and curriculum reading.
- **Signature Accent**: Cybernetic vibrant orange (`#FF5A1F`) representing captured flags, active indicators, and glowing terminal cursors.

---

## 2. Color Palette & Design Tokens

| Token | Hex / Value | Usage |
|---|---|---|
| `--bg-void` | `#0A0A0C` | Primary dark starfield canvas background |
| `--bg-void-alt` | `#131316` | Secondary darker panels and terminal bars |
| `--surface-panel` | `#F4F3F0` | Off-white device chassis light cards |
| `--surface-dark-card` | `#1C1C20` | Dark instrument cards, terminals, challenge cards |
| `--accent-flag` | `#FF5A1F` | Focal orange accent: capture button, active tabs, blinking cursor |
| `--accent-flag-dim` | `#7A3218` | Dim orange for glowing border highlights |
| `--text-on-dark` | `#F4F3F0` | Primary white text on dark cards |
| `--text-on-light` | `#131316` | Charcoal text on light off-white panels |
| `--text-muted` | `#8A8A92` | Secondary captions and subtitles |
| `--success-solved` | `#4ADE80` | Solved challenge indicator and badges |
| `--state-revealed` | `#FBBF24` | Surrendered / Revealed challenge indicator |
| `--danger-locked` | `#F04438` | Locked, incorrect flag, and danger warnings |

---

## 3. Typography

- **Display Headings**: `Space Grotesk` (Geometric, technical, punchy tracking)
- **Body & Prose**: `Inter` (Neutral, highly readable for 14-chapter modules)
- **Code & Shell**: `JetBrains Mono` (Terminal inputs, outputs, flags `flag{...}`, scripts)

---

## 4. Key UI Components

1. **Floating Navigation Rail**:
   - Vertical pill bar on the left with brand sparkle logo, active tab indicator, tooltips, and avatar points counter.
2. **Hero Auto-Typing Terminal Card**:
   - Simulates `nc target.flagforge.io 1337` connection, exploitation response, and flag capture on load.
3. **Capsule / Pill Tags ("CHOOSE STYLES")**:
   - Capsule buttons matching the UI reference for selecting CTF categories.
4. **Interactive Virtual Terminal**:
   - Blinking orange cursor (`#FF5A1F`), tab autocompletion, history navigation (`↑`/`↓`), and realistic command output (`ls`, `cat`, `strings`, `file`, `grep`, `nc`, `curl`, `base64`).
5. **Python Code Runner**:
   - In-browser Python executor for Base64, Hex, ROT13, and string manipulation.
6. **Reveal-on-Surrender Confirmation**:
   - Modal warning dialog separating Solved vs Revealed status with step-by-step writeups.
