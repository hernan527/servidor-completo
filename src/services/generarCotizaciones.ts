import { supabase } from '../config/database'; 
import { calcularPrecio } from './cotizacion'; // Tu función que pide (req, res)

export const procesarTodo = async (fechaManual?: string) => {
  // 1. Si vos pasás una fecha (ej: "2026-01-08T15:00:00"), usa esa.
  // 2. Si no pasás nada, usa el momento exacto del inicio.
  const FECHA_CORTE = fechaManual ? new Date(fechaManual).toISOString() : new Date().toISOString(); 
  
  console.log(`⏳ Iniciando sincronización.`);
  console.log(`🎯 Objetivo: Procesar todo lo ANTERIOR a: ${FECHA_CORTE}`);

  const TRAMO_SIZE = 100;
  let totalProcesadas = 0;
  let continuar = true;

  while (continuar) {
    const { data: filas, error } = await supabase
      .from('cotizaciones_maestras')
      .select('id, group, edad_1, edad_2, hijos, tipo')
      .lt('updated_at', FECHA_CORTE) 
      .order('updated_at', { ascending: true }) 
      .limit(TRAMO_SIZE);

    if (error) {
      console.error("❌ Error en DB:", error);
      break;
    }

    if (!filas || filas.length === 0) {
      console.log("✨ ¡Sincronización completa! No quedan registros anteriores al corte.");
      continuar = false;
      break;
    }

    for (const fila of filas) {
      try {
        const resultado = await new Promise((resolve) => {
          const mockRes = { 
            json: (data: any) => resolve(data), 
            status: () => mockRes, 
            send: (data: any) => resolve(data) 
          };
          
          calcularPrecio({
            body: {
              group: String(fila.group),
              edad_1: Number(fila.edad_1),
              edad_2: Number(fila.edad_2 || 0),
              numkids: Number(fila.hijos),
              tipo: fila.tipo
            }
          } as any, mockRes as any);
        });

        await supabase
          .from('cotizaciones_maestras')
          .upsert({
            id: fila.id,
            respuesta: resultado,
            updated_at: new Date().toISOString() 
          });

        totalProcesadas++;
        if (totalProcesadas % 50 === 0) console.log(`🚀 Procesadas: ${totalProcesadas}...`);
        
      } catch (err) {
        console.error(`⚠️ Error en fila ${fila.id}, saltando a la siguiente...`);
      }
    }
  }
  console.log(`🏁 Proceso finalizado. Total: ${totalProcesadas}`);
};