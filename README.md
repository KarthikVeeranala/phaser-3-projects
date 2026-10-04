# 🕹️ Phaser 3 Game Prototypes & Physics Systems

<div align="center">
  <p align="center">
    <img src="https://img.shields.io/badge/Engine-Phaser_3_(WebGL)-FF6B9D?style=for-the-badge&logo=javascript&logoColor=white&labelColor=1a1a1a" alt="Phaser 3 WebGL">
    <img src="https://img.shields.io/badge/Physics-Matter.js_&_Arcade-4B5563?style=for-the-badge&logo=codepen&logoColor=white&labelColor=1a1a1a" alt="Matter.js & Arcade">
    <a href="https://karthikveeranala.github.io/portfolio/arcade/">
      <img src="https://img.shields.io/badge/Playable_Arcade-Live_in_Browser-00C49F?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=1a1a1a" alt="Play in Browser">
    </a>
    <a href="https://github.com/KarthikVeeranala/city-of-aethel">
      <img src="https://img.shields.io/badge/Standalone_Repo-City_of_Aethel_(IGDC_Finalist)-FF7B00?style=for-the-badge&logo=github&logoColor=white&labelColor=1a1a1a" alt="City of Aethel Repo">
    </a>
  </p>

  <p align="center">
    A curated suite of <strong>14 playable 2D game prototypes, combat mechanics, and physics simulations</strong> engineered by <strong>ME</strong> during my Game Developer Internship at <strong>Aicade</strong>.
  </p>
  
  <p align="center">
    <a href="https://karthikveeranala.github.io/portfolio/arcade/">
      <strong>🎮 CLICK HERE TO OPEN THE LIVE WEB ARCADE VAULT</strong>
    </a>
  </p>
</div>

---

> ⚔️ **Looking for City of Aethel?**  
> *City of Aethel* (Top 45 Indie Finalist at IGDC 2024) has been graduated into its own dedicated standalone repository complete with custom sprite atlases and combat engine code:  
> 👉 **[KarthikVeeranala/city-of-aethel](https://github.com/KarthikVeeranala/city-of-aethel)**

---

## 📋 Playable Prototypes Matrix

All showcase prototypes are integrated and live in the portfolio's interactive WebGL arcade emulator. Click any link below to test the game directly in your browser:

| # | Game Title | Genre / Focus | Physics Engine | Live Play Link |
| :-: | :--- | :--- | :--- | :--- |
| **01** | **Total Crush: Demolition Ballistics** | Trajectory Estimation & Brick Demolition | Phaser Arcade + Vector Math | [▶ Play Live](https://karthikveeranala.github.io/portfolio/arcade/?game=angle_trajectory_shooter) |
| **02** | **Cannon Rampart** | Horizontal Wave Defense & Climax Boss | Phaser Arcade Physics | [▶ Play Live](https://karthikveeranala.github.io/portfolio/arcade/?game=canon_forcareer) |
| **03** | **Ragdoll Rampage** | Rigid Body Constraints & Spring Drag | Matter.js Physics Engine | [▶ Play Live](https://karthikveeranala.github.io/portfolio/arcade/?game=kickthebuddy) |
| **04** | **Skyward Cannon** | Vertical Defensive Pacing & Cascades | Responsive Arcade Physics | [▶ Play Live](https://karthikveeranala.github.io/portfolio/arcade/?game=vertical_canon) |
| **05** | **Into the Beastverse** | Cinematic Aerial Flight & Spell Duels | Scene Manager & Tweens | [▶ Play Live](https://karthikveeranala.github.io/portfolio/arcade/?game=harrypotter) |
| **06** | **Maze Runner** | Labyrinth Sightlines & Patrol Waypoints | Arcade + Waypoint AI | [▶ Play Live](https://karthikveeranala.github.io/portfolio/arcade/?game=maze_runner) |
| **07** | **Tower Ascent** | Vertical Ladder State Machine & Hazards | Arcade Platformer + States | [▶ Play Live](https://karthikveeranala.github.io/portfolio/arcade/?game=vertical_maze) |

---

## 🔬 Showcase Prototypes Deep-Dive

### 1. Total Crush: Demolition Ballistics (`games/01_total_crush`)
- **Gameplay Concept**: Precision trajectory cannon prototype testing predictive aiming arcs and reactive obstacle destruction.
- **Engineering Highlights**:
  - Parabolic ballistic curve calculation rendering dynamic aiming guides.
  - Elastic collision restitution coefficients for bouncing projectile kinetic transfer.
  - Progressive brick density matrices testing spatial pressure and player reflexes.
- **Controls**: `1st Click` Start angle sweep • `2nd Click` Lock angle & start power • `3rd Click` Lock power & fire • `Esc` Pause.

### 2. Cannon Rampart (`games/02_cannon_rampart`)
- **Gameplay Concept**: Horizontal arcade defense testing ammo tension and bullet-hell boss encounters.
- **Engineering Highlights**:
  - Resource scarcity loop: players must balance precision cannon shots against collecting dropped ammo packs.
  - Multi-phase boss encounter with rotating bullet-hell projectile spreads and vulnerable wind-up recovery windows.
  - Layered audio feedback and camera shake impulse triggers synchronized to explosive impacts.
- **Controls**: `Arrow Keys` Move cannon • `Mouse Aim` Reticle aiming • `Left-Click` Fire • `Shift` Bullet Time • `Esc` Pause.

### 3. Ragdoll Rampage (`games/03_ragdoll_rampage`)
- **Gameplay Concept**: Interactive physics stress-test sandbox built on Matter.js with multi-joint skeletal constraints.
- **Engineering Highlights**:
  - Configured head, torso, and limb constraint stiffness for natural human ragdoll tumble and momentum distribution.
  - Dynamic elastic spring constraint linking the cursor to ragdoll limbs with instantaneous velocity handoff.
  - Impulse threshold sensors that scale audio pitch and visual hit sparks based on collision momentum vectors.
- **Controls**: `Left-Click + Drag` Grab & toss ragdoll limbs • `Left-Click (Tap)` Punch impulse • `HUD` Select weapon • `Esc` Pause.

### 4. Skyward Cannon: Mobile Defense (`games/04_skyward_cannon`)
- **Gameplay Concept**: Portrait-oriented mobile variant engineered for one-handed thumb ergonomics and descending threat cascades.
- **Engineering Highlights**:
  - Lower-third input zone ensuring clear visibility of the upper combat arena without thumb occlusion.
  - Rapid descending threat vectors demanding priority target evaluation under tight time constraints.
  - Chain reaction explosive payloads triggered by hitting hazardous falling fuel canisters.
- **Controls**: `Left / Right Arrows` Move cannon base • `Touch Buttons` Mobile shift triggers • `Mouse Aim / Tap` Aim & fire • `Esc` Pause.

### 5. Into the Beastverse (`games/05_into_the_beastverse`)
- **Gameplay Concept**: Story-driven aerial combat adventure featuring broomstick flight handling and spell duel mechanics.
- **Engineering Highlights**:
  - Smooth inertia flight steering with dampening drag curves through aerial obstacle courses.
  - Spell duel projectile collision system with defensive shielding and counter-cast timing.
  - Multi-scene narrative sequencer transitioning seamlessly between dialogue storyboards and real-time combat.
- **Controls**: `Arrow Keys` Flight steering • `Z` Cast projectile • `X` Ultimate beam • `D` Quick dodge • `Space / Click` Dialogue advance.

### 6. Maze Runner (`games/06_maze_runner`)
- **Gameplay Concept**: Top-down labyrinth challenge emphasizing directional memory, sightline choke points, and patrol avoidance.
- **Engineering Highlights**:
  - Narrow corridor visibility challenges designed to test player spatial navigation and reaction time.
  - Waypoint-based AI patrols maintaining continuous perimeter tension.
  - Objective progression gates requiring item/key retrieval loops before exit unsealing.
- **Controls**: `W A S D` Move • `Mouse Reticle` Aim weapon • `Left-Click / Space` Attack • `E` Swap weapon • `HUD` Trigger items.

### 7. Tower Ascent: Dungeon Escape (`games/07_tower_ascent`)
- **Gameplay Concept**: Vertical ascent platformer testing precise platform hops, ladder climbing states, and rising hazard pacing.
- **Engineering Highlights**:
  - Deterministic state machine governing transitions between horizontal running, jumping physics, and vertical ladder climbing.
  - Rising hazard floor creating continuous upward urgency to discourage camping.
  - Platform cadence alternating between wide breather ledges and narrow precision hops.
- **Controls**: `A / D` Move • `W / S` Climb ladders • `Space` Jump • `Mouse Reticle` Aim weapon • `Left-Click` Fire • `R` Reload.

---

## 📦 Archive & Experimental Prototypes (`games/archive`)

In addition to the 7 core showcase games, this repository contains 7 experimental mechanics prototypes created during R&D sprints:

1. **`cave_platformer` (Greedy Willie)**: 2D tilemap cave exploration testing slope collisions and collectible coin cascades.
2. **`igdc_prototype`**: Early dark fantasy combat prototype that served as the architectural foundation for *City of Aethel*.
3. **`ludo`**: Turn-based board game logic testing pawn state progressions, dice probability, and track navigation.
4. **`pianotiles`**: Rhythm lane synchronization testing precision millisecond input timing and note pooling.
5. **`pool`**: 2D billiards simulation testing cue ball impulse vectors, friction dampening, and multi-ball elastic collisions.
6. **`rooftop_snipers`**: Physics duel prototype testing two-button jump/shoot ragdoll momentum on elevated ledges.
7. **`school_monday`**: Narrative choice adventure exploring branching dialogue states and interactive UI scenes.

---

## 📂 Repository Structure

```
phaser-3-projects/
├── games/
│   ├── 01_total_crush/           # Trajectory Cannon Ballistics
│   ├── 02_cannon_rampart/        # Horizontal Wave Defense
│   ├── 03_ragdoll_rampage/       # Matter.js Ragdoll Sandbox
│   ├── 04_skyward_cannon/        # Mobile Vertical Cannon
│   ├── 05_into_the_beastverse/   # Flight Combat & Narrative
│   ├── 06_maze_runner/           # Labyrinth Navigation & AI Patrol
│   ├── 07_tower_ascent/          # Vertical Climbing Platformer
│   ├── shared/                   # Phaser 3 & touch runtime fallback
│   └── archive/                  # 7 R&D Experimental Prototypes
│       ├── cave_platformer/
│       ├── igdc_prototype/
│       ├── ludo/
│       ├── pianotiles/
│       ├── pool/
│       ├── rooftop_snipers/
│       ├── school_monday/
│       └── shared/
├── shared/
│   ├── phaser.min.js             # Phaser 3.80.1 WebGL bundle
│   └── aicade-runtime.js         # Virtual touch controls runtime
├── .gitignore
└── README.md
```

---

## 💻 Running Any Prototype Locally

Because Phaser 3 loads JSON configuration files and audio assets asynchronously via `fetch`, all prototypes should be launched using a local HTTP server:

```bash
# Clone the repository:
git clone https://github.com/KarthikVeeranala/phaser-3-projects.git
cd phaser-3-projects

# Start a local web server (Python 3):
python -m http.server 8080
```

Once running, navigate to any prototype in your browser:
- `http://localhost:8080/games/01_total_crush/`
- `http://localhost:8080/games/02_cannon_rampart/`
- `http://localhost:8080/games/03_ragdoll_rampage/`
- `http://localhost:8080/games/04_skyward_cannon/`
- `http://localhost:8080/games/05_into_the_beastverse/`
- `http://localhost:8080/games/06_maze_runner/`
- `http://localhost:8080/games/07_tower_ascent/`

Or use **VS Code Live Server** by right-clicking any game's `index.html` and selecting **"Open with Live Server"**.

---

## 👨‍💻 Developer & Portfolio

- **Developer**: **Karthik Veeranala** (Game Developer & Combat Designer)
- **Interactive Portfolio**: [karthikveeranala.github.io/portfolio](https://karthikveeranala.github.io/portfolio/)
- **Playable Arcade Vault**: [karthikveeranala.github.io/portfolio/arcade/](https://karthikveeranala.github.io/portfolio/arcade/)
- **LinkedIn**: [linkedin.com/in/karthikveeranala](https://www.linkedin.com/in/karthikveeranala/)
- **GitHub**: [@KarthikVeeranala](https://github.com/KarthikVeeranala)

---

<div align="center">
  <sub>© 2024–2026 Karthik Veeranala • Built during Game Development Internship at Aicade.</sub>
</div>
