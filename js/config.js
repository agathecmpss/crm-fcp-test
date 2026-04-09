// ═══════════════════════════════════════════════
// CONFIG CRM FCP — NE PAS METTRE DE TOKEN ICI
// ═══════════════════════════════════════════════

const FCP_CONFIG = {
  // URL de base Baserow
  baseUrl: 'https://api.baserow.io',

  // IDs des tables Baserow
  tables: {
    benevoles:      837810,
    beneficiaires:  null, // à renseigner
    etablissements: null, // à renseigner
    interventions:  null, // à renseigner
    formations:     null, // à renseigner
    evenements:     null, // à renseigner
    antennes:       null, // à renseigner
    missions:       null, // à renseigner
  },

  // Pagination
  pageSize: 25,

  // Nom de l'app
  appName: 'CRM Fondation Claude Pompidou',
  appVersion: 'v1.0',

  // Clé localStorage
  storageKey: 'fcp_crm_token',
};
