# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Canvas Particle Engine + Custom Client Virtual Terminal (xterm-style interactive Linux shell) + Client-safe SHA-256 Validator + Pyodide/JS Python Code Runner

## Users

- **Beginner to Intermediate Cybersecurity Learners & Students**: Wanting to learn CTF from scratch without getting intimidated by bare, clunky legacy interfaces.
- **CTF Competitors & Hobbyist Hackers**: Practicing challenge types (Web, Crypto, Forensics, Reverse Engineering, Binary Exploitation/Pwn, Steganography, OSINT, Scripting, Network).
- **Security Enthusiasts**: Needing structured step-by-step curriculum with hands-on practice, virtual sandbox terminals, and honest progress tracking.

## Product Purpose

FlagForge is an interactive, dark, premium "instrument-panel" CTF learning platform. It replaces generic documentation and clunky practice tools with a sleek, device-framed tactile workbench that combines:
1. Complete 14-chapter structured curriculum (Basic to Advance)
2. Interactive challenge solving with a strict **Reveal-on-Surrender** mechanic (distinguishing "Solved" vs "Revealed" solutions)
3. Built-in interactive browser terminal with virtual filesystem inspection tools (`ls`, `cat`, `strings`, `file`, `grep`, `pwd`, `whoami`, etc.)
4. Browser Python code runner for crypto/scripting automation
5. Rich user dashboard, progress metrics, and achievement badges

## Positioning

Unlike traditional CTF platforms (CTFd or bare terminal sandboxes) that offer little pedagogy or dump users into raw command-lines, FlagForge pairs high-fidelity educational modules directly with embedded virtual device sandboxes, guided walkthroughs upon surrender, and a sci-fi cybernetic device aesthetic inspired by futuristic space hardware.

## Operating Context

- Used in desktop and tablet/mobile web browsers for study sessions, competition prep, and hands-on terminal experimentation.
- Self-paced learning loop: Read Module -> Launch Practice Challenge -> Run Terminal Commands -> Submit Flag -> Or Surrender for Step-by-Step Explanation.

## Capabilities and Constraints

- **Modules**: 14 comprehensive CTF chapters with rich Markdown formatting, code copy, and quick links to practice challenges.
- **Practice Workspace**: Challenge cards across all 8 core categories + difficulties (Basic, Menengah, Advance), attachment downloads, terminal card, code sandbox, SHA-256 flag verification.
- **Reveal-on-Surrender**: Modal confirmation with non-reversible "Revealed" tag to protect learning integrity and honest progress analytics.
- **Interactive Sandbox Terminal**: Full virtual filesystem with realistic command outputs, colorized syntax, and challenge artifacts.
- **User Progress**: LocalStorage persistent state tracking solved vs revealed counts, points, category mastery percentages, submission logs, and unlockable badges.
- **Mock Auth**: Sleek device-framed login/register with guest quick-start, credential simulation, and persistent user profile.

## Brand Commitments

- **Name**: FlagForge
- **Aesthetic**: Deep space void (`#0A0A0C`), off-white device panels (`#F4F3F0`), sleek dark instrument cards (`#1C1C20`), glowing cybernetic orange accents (`#FF5A1F`), high-contrast status colors (Solved Green `#4ADE80`, Locked Red `#F04438`).
- **Typography**: Space Grotesk (Display headings), Inter (Clean body/content), JetBrains Mono (Code/terminal/flags).
- **Visual Motif**: Floating device chassis with large rounded corners (32px radius), starfield background, pill buttons, floating icon sidebar with glowing active notch.

## Evidence on Hand

- `bahan/prd-flagforge-ctf-platform.md`: Comprehensive product requirements and multi-phase specifications.
- `bahan/modul-ctf-basic-to-advance.md`: Full 14-chapter curriculum content in Indonesian.
- `bahan/Got a wild idea_ We turn it into wow__Create by bee_ui.ux`: High-res UI reference image defining the floating device chassis, off-white panels, capsule tags, and cybernetic orange focal points.

## Product Principles

1. **Instrument, Not Just Documentation**: Every screen feels like interacting with a tactile, futuristic security workstation.
2. **Honest Learning Integrity**: Solved flags are celebrated; revealed solutions are marked distinctly to encourage true mastery.
3. **Frictionless In-Browser Practice**: Zero installation required for learners to run commands, inspect forensics files, and test scripts.
4. **Rich Visual Feedback**: Dynamic typing effects, terminal glowing cursors, fluid tabs, and tactile button states.
