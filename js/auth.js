// ═══════════════════════════════════════════════
// AUTH — Gestion du token Baserow
// ═══════════════════════════════════════════════

const Auth = {

  // Récupère le token stocké
  getToken() {
    return localStorage.getItem(FCP_CONFIG.storageKey) || '';
  },

  // Sauvegarde le token
  setToken(token) {
    localStorage.setItem(FCP_CONFIG.storageKey, token.trim());
  },

  // Supprime le token (déconnexion)
  logout() {
    localStorage.removeItem(FCP_CONFIG.storageKey);
    window.location.href = 'index.html';
  },

  // Vérifie si connecté (token présent)
  isLoggedIn() {
    return !!this.getToken();
  },

  // Redirige vers login si pas de token
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },

  // Teste le token contre l'API Baserow
  async testToken(token) {
    try {
      const res = await fetch(`${FCP_CONFIG.baseUrl}/api/database/rows/table/${FCP_CONFIG.tables.benevoles}/?size=1`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }
};
