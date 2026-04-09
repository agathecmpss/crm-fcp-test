// ═══════════════════════════════════════════════
// UTILS — Fonctions communes
// ═══════════════════════════════════════════════

const Utils = {

  // Échappe le HTML pour éviter les injections
  escHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  // Formate une valeur Baserow (gère les objets, arrays, booleans)
  formatValue(val) {
    if (val === null || val === undefined || val === '') return '';
    if (Array.isArray(val)) return val.map(v => v.value || v.name || v).join(', ');
    if (typeof val === 'object' && val.value !== undefined) return val.value;
    if (typeof val === 'boolean') return val ? 'Oui' : 'Non';
    return String(val);
  },

  // Formate une date ISO → JJ/MM/AAAA
  formatDate(val) {
    if (!val) return '—';
    const d = String(val).substring(0, 10);
    if (!d.includes('-')) return val;
    return d.split('-').reverse().join('/');
  },

  // Retourne la classe CSS du badge selon le statut
  statutBadgeClass(statut) {
    if (!statut) return 'badge-default';
    const s = statut.toLowerCase();
    if (s.includes('actif') && !s.includes('inactif')) return 'badge-actif';
    if (s.includes('candidat') || s.includes('en cours')) return 'badge-candidat';
    if (s.includes('inactif') || s.includes('pause')) return 'badge-inactif';
    if (s.includes('formation')) return 'badge-formation';
    if (s.includes('attente')) return 'badge-attente';
    if (s.includes('démiss') || s.includes('demiss')) return 'badge-demission';
    if (s.includes('radié') || s.includes('radie')) return 'badge-radie';
    if (s.includes('engagé') || s.includes('engage')) return 'badge-actif';
    return 'badge-default';
  },

  // Affiche un toast
  showToast(msg, type = '', duration = 3500) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = `toast ${type}`;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => t.classList.add('hidden'), duration);
  },

  // Trouve un champ par mots-clés dans les clés d'une ligne
  findCol(row, ...terms) {
    const keys = Object.keys(row);
    for (const term of terms) {
      const t = term.toLowerCase().replace(/[_\s-]/g, '');
      const k = keys.find(k => k.toLowerCase().replace(/[_\s-]/g, '').includes(t));
      if (k) return k;
    }
    return null;
  },

  // Debounce (pour la recherche)
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
};
