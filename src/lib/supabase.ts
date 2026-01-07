export function getCompanyLogo(empresa?: Empresa): string | null {
  if (!empresa?.imagenes) return null;
  if (Array.isArray(empresa.imagenes)) {
    return empresa.imagenes[0]?.logo || null;
  }
  return (empresa.imagenes as any).logo || null;
}

export function getPlanName(plan: Plan): string {
  return plan.nombre_plan || plan.nombre || 'Plan sin nombre';
}

export function getClinicRegion(clinic?: Clinica): string | null {
  if (!clinic?.ubicaciones) return null;
  return (clinic.ubicaciones as any).region || (clinic.ubicaciones as any).REGIONS?.[0] || null;
}