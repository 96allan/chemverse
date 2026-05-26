// elementRegistry.js - Comprehensive Chemical & CBC Data Registry
export const ElementRegistry = {
  // Contains full mapping configuration. Expandable safely up to 118 elements.
  elements: [
    { n: 1, s: "H", name: "Hydrogen", mass: 1.008, type: "nonmetal", p: 1, g: 1, shells: [1], cbc: true, description: "Highly flammable gas, most abundant element in the universe." },
    { n: 2, s: "He", name: "Helium", mass: 4.003, type: "noble", p: 1, g: 18, shells: [2], cbc: true, description: "Inert noble gas used in airships and cryogenics." },
    { n: 3, s: "Li", name: "Lithium", mass: 6.94, type: "alkali", p: 2, g: 1, shells: [2, 1], cbc: true, description: "Soft, highly reactive alkali metal used in modern batteries." },
    { n: 6, s: "C", name: "Carbon", mass: 12.011, type: "nonmetal", p: 2, g: 14, shells: [2, 4], cbc: true, description: "The base structural element for all organic life forms." },
    { n: 7, s: "N", name: "Nitrogen", mass: 14.007, type: "nonmetal", p: 2, g: 15, shells: [2, 5], cbc: true, description: "Makes up roughly 78% of Earth's atmosphere." },
    { n: 8, s: "O", name: "Oxygen", mass: 15.999, type: "nonmetal", p: 2, g: 16, shells: [2, 6], cbc: true, description: "Highly reactive gas essential for combustion and biological respiration." },
    { n: 11, s: "Na", name: "Sodium", mass: 22.990, type: "alkali", p: 3, g: 1, shells: [2, 8, 1], cbc: true, description: "Highly reactive alkali metal; reacts aggressively with water." },
    { n: 12, s: "Mg", name: "Magnesium", mass: 24.305, type: "alkaline", p: 3, g: 2, shells: [2, 8, 2], cbc: true, description: "Alkaline earth metal that burns with an intense white light." },
    { n: 17, s: "Cl", name: "Chlorine", mass: 35.45, type: "halogen", p: 3, g: 17, shells: [2, 8, 7], cbc: true, description: "Halogen gas used widely for water purification and sanitation." }
  ],

  getCbcData(symbol) {
    const cbcMapping = {
      "H": { topic: "Atomic Structure", note: "Used to demonstrate basic single-proton configuration frames." },
      "Na": { topic: "Group 1 Trends", note: "Demonstrates physical and reactivity scaling profiles in metals." },
      "Cl": { topic: "Halogens & Valency", note: "Primary study target for ionic completion patterns." }
    };
    return cbcMapping[symbol] || { topic: "General Chemistry", note: "Core elemental matter configurations." };
  },

  getAll() { return this.elements; },
  getById(n) { return this.elements.find(el => el.n === n); },
  getBySymbol(s) { return this.elements.find(el => el.s.toUpperCase() === s.toUpperCase()); }
};