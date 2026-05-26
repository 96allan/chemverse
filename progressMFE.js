// progressMFE.js - Competency Log Tracker
import EventBus from './eventBus.js';

export class ProgressMFE {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.experiencePoints = 0;
    this.unlockedSkills = new Set();
  }

  init() {
    this.updateDisplay();
    
    // Listen for completion parameters across any of the running apps
    EventBus.on('COMPETENCY_ACHIEVED', (data) => {
      if (!this.unlockedSkills.has(data.id)) {
        this.unlockedSkills.add(data.id);
        this.experiencePoints += data.xp;
        this.updateDisplay();
      }
    });
  }

  updateDisplay() {
    this.container.innerHTML = `
      <div style="padding:12px 16px; background:rgba(47,212,168,0.04); border:1px solid #2fd4a8; border-radius:10px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 4px 12px rgba(47,212,168,0.05);">
        <div>
          <div style="font-size:11px; color:#2fd4a8; text-transform:uppercase; font-weight:700; letter-spacing:0.5px;">Live CBC Competency Track</div>
          <div style="font-size:14px; color:#dde4f0; margin-top:2px;">Modules Mastered: <strong>${this.unlockedSkills.size}</strong></div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:20px; font-weight:800; color:#2fd4a8;">${this.experiencePoints}</span> <span style="font-size:12px; color:#7a8ba0;">XP</span>
        </div>
      </div>
    `;
  }
}