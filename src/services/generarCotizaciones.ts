import { supabase } from '../config/database'; 
import { calcularPrecio } from './cotizacion';

export const procesarTodo = async (fechaManual?: string) => {
  const FECHA_CORTE = fechaManual ? new Date(fechaManual).toISOString() : new Date().toISOString(); 
  
  console.log(`⏳ Iniciando sincronización veloz.`);
  const TRAMO_SIZE = 50; // Bajamos el lote a 50 para no saturar la memoria
  let totalProcesadas = 0;
  let continuar = true;

  while (continuar) {
    const { data: filas, error } = await supabase
      .from('cotizaciones_maestras')
      .select('id, group, edad_1, edad_2, hijos, tipo')
      .lt('updated_at', FECHA_CORTE) 
      .order('updated_at', { ascending: true }) 
      .limit(TRAMO_SIZE);

    if (error || !filas || filas.length === 0) {
      continuar = false;
      break;
    }

    // --- MAGIA: Procesamos los 50 registros EN PARALELO ---
const promesas = filas.map(async (fila) => {
    return new Promise((resolve) => {
        // Seguro de vida: Si en 10 segundos no respondió, cancelamos esa fila
        const timeout = setTimeout(() => {
            console.log(`⏱️ Timeout en ID: ${fila.id}`);
            resolve(null);
        }, 10000);

        const mockRes = {
            json: (data: any) => { clearTimeout(timeout); resolve({ id: fila.id, respuesta: data, updated_at: new Date().toISOString() }); },
            send: (data: any) => { clearTimeout(timeout); resolve({ id: fila.id, respuesta: data, updated_at: new Date().toISOString() }); },
            status: function() { return this; }
        };

        try {
            calcularPrecio({
                body: {
                    group: String(fila.group),
                    edad_1: Number(fila.edad_1),
                    edad_2: Number(fila.edad_2 || 0),
                    numkids: Number(fila.hijos),
                    tipo: fila.tipo,
                    empresa_prepaga: 'todas'
                }
            } as any, mockRes as any).catch(err => {
                clearTimeout(timeout);
                console.error(`❌ Error interno calcularPrecio ID ${fila.id}`);
                resolve(null);
            });
        } catch (e) {
            clearTimeout(timeout);
            resolve(null);
        }
    });
});
const resultadosBatch = (await Promise.all(promesas)).filter(r => r !== null);

    console.log(`📦 Lote calculado. Intentando subir ${resultadosBatch.length} registros a Supabase...`);

    if (resultadosBatch.length > 0) {
        // Ejecutamos el upsert UNA sola vez y capturamos el error
        const { error: upsertError } = await supabase
            .from('cotizaciones_maestras')
            .upsert(resultadosBatch);

        if (upsertError) {
            console.error("❌ ERROR DE SUPABASE:", upsertError.message, upsertError.details);
            // Si hay error en el lote, podrías decidir si frenar o seguir
        } else {
            totalProcesadas += resultadosBatch.length;
            console.log(`✅ [OK] Se subieron ${resultadosBatch.length} registros. Total acumulado: ${totalProcesadas}`);
        }
    } else {
        console.warn("⚠️ El lote resultó vacío después de filtrar nulos.");
    }
} // Aquí cierra el while

console.log(`🏁 Proceso finalizado. Total de registros actualizados: ${totalProcesadas}`);
};