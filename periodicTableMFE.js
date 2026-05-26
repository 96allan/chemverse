// periodicTableMFE.js - Interactive Grid Layout
import EventBus from './eventBus.js';
import { ElementRegistry } from './elementRegistry.js';

export class PeriodicTableMFE {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.elements = ElementRegistry.getAll();
    this.activeFilter = 'all';
    this.searchQuery = '';
  }

  init() {
    this.renderLayout();
    this.attachLocalListeners();
    this.renderGrid();
    // Pre-select Carbon on system boot
    const defaultEl = ElementRegistry.getBySymbol('C');
    if (defaultEl) EventBus.emit('ELEMENT_SELECTED', defaultEl);
  }

  renderLayout() {
    this.container.innerHTML = `
      <div class="table-controls" style="display:flex; gap:12px; margin-bottom:15px; flex-wrap:wrap; align-items:center;">
        <input type="text" id="mfeSearch" placeholder="Search by name or symbol..." style="padding:10px; background:#161e30; color:#dde4f0; border:1px solid rgba(255,255,255,0.1); border-radius:8px; flex-grow:1; outline:none;">
        <button class="filter-chip active" data-filter="all" style="padding:8px 16px; background:#161e30; color:#dde4f0; border:1px solid rgba(255,255,255,0.1); border-radius:20px; cursor:pointer; font-weight:500;">All Elements</button>
        <button class="filter-chip" data-filter="cbc" style="padding:8px 16px; background:#161e30; color:#dde4f0; border:1px solid rgba(255,255,255,0.1); border-radius:20px; cursor:pointer; font-weight:500;">⭐ CBC Topics</button>
      </div>
      <div id="mfeGridContainer" style="display:grid; grid-template-columns: repeat(18, 1fr); gap:6px; overflow-x:auto; padding:5px; background:#07090f; border-radius:10px;"></div>
    `;
  }

  attachLocalListeners() {
    const searchInput = this.container.querySelector('#mfeSearch');
    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.renderGrid();
    });

    this.container.querySelectorAll('.filter-chip').forEach(btn => {
      btn.onclick = (e) => {
        this.container.querySelectorAll('.filter-chip').forEach(b => {
          b.classList.remove('active');
          b.style.background = '#161e30';
          b.style.borderColor = 'rgba(255,255,255,0.1)';
        });
        e.target.classList.add('active');
        e.target.style.background = '#6c5ff5';
        e.target.style.borderColor = '#6c5ff5';
        this.activeFilter = e.target.getAttribute('data-filter');
        this.renderGrid();
      };
    });
  }

  renderGrid() {
    const grid = this.container.querySelector('#mfeGridContainer');
    grid.innerHTML = '';

    const colorMap = {
      alkali: '#e85d75', alkaline: '#f0a05a', transition: '#6db8f5',
      postmetal: '#7dd8b8', metalloid: '#c4a6f5', nonmetal: '#f7d06a',
      halogen: '#f5878e', noble: '#89d4e8'
    };

    this.elements.forEach(el => {
      const matchesSearch = el.name.toLowerCase().includes(this.searchQuery) || el.s.toLowerCase().includes(this.searchQuery);
      const matchesFilter = this.activeFilter === 'all' || (this.activeFilter === 'cbc' && el.cbc);

      if (!matchesSearch || !matchesFilter) return;

      const cell = document.createElement('div');
      const baseColor = colorMap[el.type] || '#556070';
      cell.style = `grid-column: ${el.g}; grid-row: ${el.p}; padding:10px 4px; background:#0e1422; border:1px solid rgba(255,255,255,0.05); text-align:center; border-radius:6px; cursor:pointer; min-width:45px; transition:transform 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.2); border-top: 3px solid ${baseColor};`;
      cell.innerHTML = `<div style="font-size:9px; color:#7a8ba0;">${el.n}</div><strong style="font-size:15px; color:#dde4f0; display:block; margin:2px 0;">${el.s}</strong>`;
      
      cell.onmouseenter = () => { cell.style.transform = 'scale(1.08)'; cell.style.backgroundColor = '#161e30'; };
      cell.onmouseleave = () => { cell.style.transform = 'none'; cell.style.backgroundColor = '#0e1422'; };
      cell.onclick = () => { EventBus.emit('ELEMENT_SELECTED', el); };
      
      grid.appendChild(cell);
    });
  }
}