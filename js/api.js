// ═══════════════════════════════════════════════
// API — Fonctions Baserow partagées
// ═══════════════════════════════════════════════

const API = {

  // Headers communs
  headers() {
    return {
      'Authorization': `Token ${Auth.getToken()}`,
      'Content-Type': 'application/json'
    };
  },

  // GET générique
  async get(path) {
    const res = await fetch(`${FCP_CONFIG.baseUrl}/api/${path}`, {
      headers: this.headers()
    });
    if (res.status === 401) {
      Auth.logout();
      throw new Error('Token invalide ou expiré');
    }
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Erreur API ${res.status} : ${err}`);
    }
    return res.json();
  },

  // Récupère les champs d'une table
  async getFields(tableId) {
    return this.get(`database/fields/table/${tableId}/`);
  },

  // Récupère une page de lignes
  async getRows(tableId, { page = 1, size = 25, search = '', filters = '' } = {}) {
    let url = `database/rows/table/${tableId}/?user_field_names=true&page=${page}&size=${size}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (filters) url += `&${filters}`;
    return this.get(url);
  },

  // Récupère une ligne par ID
  async getRow(tableId, rowId) {
    return this.get(`database/rows/table/${tableId}/${rowId}/?user_field_names=true`);
  },

  // Récupère TOUTES les lignes (pagination automatique)
  async getAllRows(tableId) {
    let rows = [];
    let page = 1;
    while (true) {
      const data = await this.getRows(tableId, { page, size: 100 });
      rows = rows.concat(data.results);
      if (!data.next) break;
      page++;
    }
    return rows;
  }
};
