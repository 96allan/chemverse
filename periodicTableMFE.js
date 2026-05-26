// periodicTableMFE.js - Handles Element Registry and Grid Navigation
import EventBus from './eventBus.js';

export class PeriodicTableMFE {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.elements = [
      {n:1,s:'H',name:'Hydrogen',mass:1.008,type:'nonmetal',p:1,shells:[1],cbc:true},
      {n:6,s:'C',name:'Carbon',mass:12.01,type:'nonmetal',p:2,shells:[2,4],cbc:true},
      {n:8,s:'O',name:'Oxygen',mass:16.00,type:'nonmetal',p:2,shells:[2,6],cbc:true},
      {n:11,s:'Na',name:'Sodium',mass:22.99,type:'alkali',p:3,shells:[2,8,1],cbc:true}
    ];
  }

  init() {
    this.render();
    this.selectElement(this.elements.find(e => e.n === 6));
  }

  render() {
    this.container.innerHTML = `
      <div class="grid" style="display: flex; gap: 8px; padding: 1rem; justify-content: center;"></div>
    `;
    const grid = this.container.querySelector('.grid');
    this.elements.forEach(el => {
      const cell = document.createElement('div');
      cell.style = "padding: 12px; background: #1f2937; border-radius: 8px; cursor: pointer; text-align: center; width: 55px; border: 1px solid rgba(255,255,255,0.05);";
      cell.innerHTML = `<strong>${el.s}</strong><div style="font-size: 10px; color:#6b7a99;">${el.n}</div>`;
      cell.onclick = () => this.selectElement(el);
      grid.appendChild(cell);
    });
  }

  selectElement(el) {
    EventBus.emit('ELEMENT_SELECTED', el);
  }
}