// quantumEngineMFE.js - Isolated 3D Particle Generator & Zoom Space
import EventBus from './eventBus.js';

export class QuantumEngineMFE {
  constructor(canvasId, sliderId, buttonId) {
    this.canvas = document.getElementById(canvasId);
    this.slider = document.getElementById(sliderId);
    this.button = document.getElementById(buttonId);
    this.ctx = this.canvas.getContext('2d');
    this.currentPoints = [];
    this.targetZoom = 1.0;
    this.currentZoom = 1.0;
    this.activeElement = null;
  }

  init() {
    EventBus.on('ELEMENT_SELECTED', (elementData) => {
      this.activeElement = elementData;
      this.targetZoom = 1.0;
      this.currentZoom = 1.0;
      this.slider.value = 1.0;
      this.generateParticles();
    });

    this.slider.oninput = (e) => { this.targetZoom = parseFloat(e.target.value); };
    this.button.onclick = () => { this.targetZoom = this.targetZoom < 15 ? 22.0 : 1.0; this.slider.value = this.targetZoom; };
    
    this.startAnimationLoop();
  }

  generateParticles() {
    if (!this.activeElement) return;
    this.currentPoints = [];
    const protons = this.activeElement.n;
    const neutrons = Math.round(this.activeElement.mass - this.activeElement.n);
    
    for (let i = 0; i < (protons + neutrons); i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.pow(Math.random(), 1/3) * 6;
      this.currentPoints.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        color: i < protons ? '#ff4a5a' : '#8fa0ba',
        size: 2.5,
        isNucleon: true
      });
    }

    this.activeElement.shells.forEach((electrons, index) => {
      const baseRadius = (index + 1) * 28 + 12;
      for (let i = 0; i < electrons * 80; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = baseRadius + (Math.random() - 0.5) * 10;
        this.currentPoints.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
          color: '#7c6ff7',
          size: Math.random() * 0.8 + 0.3,
          isNucleon: false
        });
      }
    });
  }

  startAnimationLoop() {
    const render = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.currentZoom += (this.targetZoom - this.currentZoom) * 0.1;
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;

      this.currentPoints.sort((a,b) => b.z - a.z);

      this.currentPoints.forEach(p => {
        const cosY = Math.cos(0.004), sinY = Math.sin(0.004);
        const rx = p.x * cosY + p.z * sinY;
        const rz = -p.x * sinY + p.z * cosY;
        p.x = rx; p.z = rz;

        const perspective = 220 / (220 + p.z);
        const projX = cx + p.x * perspective * this.currentZoom;
        const projY = cy + p.y * perspective * this.currentZoom;

        let alpha = 0.5;
        let size = p.size * perspective;

        if (p.isNucleon) {
          size = p.size * perspective * Math.max(1, this.currentZoom * 0.35);
          alpha = Math.min(1, this.currentZoom * 0.15 + 0.5);
        } else if (this.currentZoom > 5) {
          alpha *= Math.max(0, (15 - this.currentZoom) / 10);
        }

        if (alpha > 0 && projX >= 0 && projX <= this.canvas.width) {
          this.ctx.beginPath();
          this.ctx.arc(projX, projY, size, 0, 2 * Math.PI);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = alpha;
          this.ctx.fill();
        }
      });
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }
}