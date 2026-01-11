"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyLogo = getCompanyLogo;
exports.getPlanName = getPlanName;
exports.getClinicRegion = getClinicRegion;
function getCompanyLogo(empresa) {
    if (!empresa?.imagenes)
        return null;
    if (Array.isArray(empresa.imagenes)) {
        return empresa.imagenes[0]?.logo || null;
    }
    return empresa.imagenes.logo || null;
}
function getPlanName(plan) {
    return plan.nombre_plan || plan.nombre || 'Plan sin nombre';
}
function getClinicRegion(clinic) {
    if (!clinic?.ubicaciones)
        return null;
    return clinic.ubicaciones.region || clinic.ubicaciones.REGIONS?.[0] || null;
}
//# sourceMappingURL=supabase.js.map