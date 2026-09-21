# Biyu Zou — Project Portfolios

Two focused portfolios share the existing `media/` assets:

- **AI agents and applied AI:** [agent-portfolio.html](https://zzby610.github.io/robot-learning-portfolio/agent-portfolio.html)
- **Robot learning:** [vla-research-profile.html](https://zzby610.github.io/robot-learning-portfolio/vla-research-profile.html)
- The original [home page](https://zzby610.github.io/robot-learning-portfolio/) remains the robot-learning portfolio.

## Agent portfolio

The Agent version presents the Ericsson SP Copilot project, power-domain RAG work, deployment and evaluation experience, and three supporting robotics projects. All five Ericsson skill demos are visible on the page, alongside all four RAG images. Robotics evidence includes the Midea setup and annotation tool, garment-manipulation video, and the Lund visual-target demonstration. It uses the original project screenshots and recordings. The synchronization poster is a frame from `media/sync.mp4`.

Files:

- `agent-portfolio.html` — content and accessible page structure
- `assets/agent-portfolio.css` — responsive styles and print layout
- `assets/agent-portfolio.js` — image viewer and navigation state

There is no build step or external JavaScript dependency. The existing GitHub Pages deployment serves the HTML, CSS, JavaScript, and media directly.

## Local preview

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/agent-portfolio.html`.

The pages retain the existing no-index metadata. Videos are loaded on demand and use native browser playback controls.
