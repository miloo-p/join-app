# Join – Agile Task Management

**[Live Demo ansehen](https://timo-boening.de/join)**

## Über das Projekt
„Join“ ist ein komplexes Kanban-Board zur Aufgabenorganisation, inspiriert von klassischen Task-Management-Tools. Das Projekt wurde agil in einem Entwickler-Team umgesetzt und bildet eine vollständige Applikation mit Login, Task-Erstellung, Kontaktverwaltung und Drag-and-Drop-Logik ab. 

Der Fokus lag auf asynchronen REST-API-Calls, komplexen CRUD-Operationen, State Management und einer intuitiven Nutzeroberfläche.

## Tech-Stack
* **Frontend:** Angular, TypeScript, HTML, SCSS
* **Backend / Datenbank:** Supabase
* **Workflow:** Git, GitHub, agiles Projektmanagement (Kanban)
* **Design:** Figma

## Meine Rolle im Team & Learnings
Als Teil des Entwickler-Teams lag mein Schwerpunkt auf der Struktur, dem Styling und der Datenanbindung. Zu meinen Kernaufgaben gehörten:

* **Projektarchitektur:** Mitverantwortlich für das initiale Setup und die Konzeption einer skalierbaren Ordner- und Komponentenstruktur in Angular.
* **Modulares Styling (SCSS):** Kompletter Aufbau der Styling-Architektur. Um das Design-System konsistent und wartbar zu halten, habe ich konsequent mit globalen SCSS-Variablen und anpassbaren Mixins gearbeitet.
* **Backend-Integration mit Supabase:** Nutzung und Anbindung der Supabase-Infrastruktur für die User-Authentifizierung, die Kontaktverwaltung sowie das zentrale Task-Management (Synchronisierung von States und Inhalten).
* **UI/UX-Präzision:** Durch meinen Hintergrund als Mediengestalter habe ich sichergestellt, dass die Layout-Vorgaben aus Figma responsiv und pixelgenau in die Angular-Komponenten übertragen werden.

---

## Projektstruktur & Architektur

Um das Projekt skalierbar zu halten, haben wir uns für eine strikte Trennung von Logik, Layout und Styling entschieden:

```text
join-app/
├── public/                 // Statische Dateien (Browser-Auslieferung)
│   └── assets/
│       ├── fonts/          // Lokale Schriftarten
│       ├── icons/          // SVG-Icons und Icon-Sprites
│       └── images/         // Allgemeine Grafiken
│
├── src/                    // Quellcode der Anwendung
│   ├── app/                // Kern der Angular-App
│   │   ├── layout/         // Seitenübergreifende Elemente (Header, Sidebar, Footer)
│   │   ├── pages/          // Haupt-Ansichten/Routen (Smart Components)
│   │   ├── sections/       // In sich geschlossene Inhaltsblöcke für Pages
│   │   ├── shared/         // Wiederverwendbare UI-Elemente (Buttons, Inputs, Modals)
│   │   ├── app.config.ts   // Globale Konfiguration (Provider, Routing-Setup)
│   │   └── app.routes.ts   // Routing-Definitionen
│   │
│   ├── environments/       // Konfigurationsvariablen (z.B. Supabase-Keys)
│   │
│   ├── styles/             // Modulare, globale SCSS-Architektur
│   │   ├── abstracts/      // SCSS-Helfer (Variablen, Mixins - kein CSS Output)
│   │   ├── base/           // Grundlegende HTML-Element-Stylings und CSS-Resets
│   │   └── utils/          // Hilfsklassen (Utility Classes wie .flex-center)
│   │
│   ├── index.html          // Einstiegspunkt in den Browser
│   ├── main.ts             // Entry Point für die Angular-App
│   └── styles.scss         // Haupt-Styling-Datei
```

---

## So haben wir gearbeitet: Unser Team-Manifest

Um effizient zusammenzuarbeiten und Code-Konflikte zu vermeiden, haben wir uns auf strenge Entwicklungs-Standards geeinigt:

### 1. Kommunikation & Stand-Up
* **Daily Stand-Up:** Tägliches Sync-Meeting um 15:00 Uhr zur Klärung von Fortschritten, Planung und Blockern.
* **Asynchrone Kommunikation:** Proaktive Kommunikation bei Problemen, um stundenlange, isolierte Fehlersuche zu vermeiden.

### 2. Branching-Strategie & Pull Requests
* **Kein direkter Push auf Main:** Es wird niemals direkt auf den `main`-Branch gepusht.
* **Feature Branches:** Für jede Aufgabe wird ein eigener Branch erstellt (`feature/...`, `fix/...`, `chore/...`).
* **Vier-Augen-Prinzip (Code Review):** Niemand mergt seinen eigenen Code. Jeder Pull Request muss von einem anderen Teammitglied geprüft und freigegeben werden.

### 3. Commit-Historie
Wir nutzen **Conventional Commits** für eine saubere und nachvollziehbare Historie:
* `feat:` für neue Funktionen
* `fix:` für Fehlerbehebungen
* `chore:` für Konfigurationen und Setup
* `style:` für reine Optik-Anpassungen (SCSS)
* `refactor:` für Code-Optimierungen ohne Feature-Änderung

### 4. Ticket-Management (GitHub Projects)
* Striktes Kanban-System: Von der Idee (Draft) über zugewiesene Issues bis zum automatischen Schließen der Tickets via Commit-Message (z.B. `closes #12`).
* Ein Issue, ein Entwickler: Klare Zuweisungen verhindern Doppelarbeit.

### 5. Fehlerkultur (Die 15-Minuten-Regel)
Wer länger als 15 bis 30 Minuten an einem Bug festhängt, ohne erkennbaren Fortschritt zu machen, bittet das Team proaktiv um Hilfe (Pair-Programming / Screen-Sharing).

---

## Lokale Installation

Um das Projekt lokal auszuführen, klone das Repository und nutze die Angular CLI:

```bash
git clone https://github.com/miloo-p/join-app.git
cd join
npm install
ng serve
```
Navigiere anschließend zu `http://localhost:4200/`.
