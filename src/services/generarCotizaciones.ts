import { supabase } from '../config/database'; 
import { calcularPrecio } from './cotizacion';

export const procesarTodo = async (fechaManual?: string) => {
  const FECHA_CORTE = fechaManual ? new Date(fechaManual).toISOString() : new Date().toISOString(); 
  
  console.log(`⏳ Iniciando sincronización de 7000 registros.`);
  console.log(`🎯 Objetivo: Procesar todo lo anterior a: ${FECHA_CORTE}`);

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
      console.log("✨ ¡Sincronización completa!");
      continuar = false;
      break;
    }

    // --- CAMBIO AQUÍ: Creamos un array para acumular los 100 resultados ---
    const batchResultados = [];

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
              tipo: fila.tipo,
              empresa_prepaga: 'todas'
            }
          } as any, mockRes as any);
        });

        // Acumulamos el objeto en lugar de hacer await a la base de datos aquí
        batchResultados.push({
          id: fila.id,
          respuesta: resultado,
          updated_at: new Date().toISOString() 
        });

      } catch (err) {
        console.error(`⚠️ Error en fila ${fila.id}, saltando...`);
      }
    }

    // --- GUARDADO MASIVO: Enviamos los 100 de golpe ---
    if (batchResultados.length > 0) {
      const { error: upsertError } = await supabase
        .from('cotizaciones_maestras')
        .upsert(batchResultados);

      if (upsertError) {
        console.error("❌ Error al guardar el lote:", upsertError);
      } else {
        totalProcesadas += batchResultados.length;
        console.log(`🚀 Procesadas acumuladas: ${totalProcesadas} / 7000`);
      }
    }
  }
  console.log(`🏁 Proceso finalizado. Total: ${totalProcesadas}`);
};