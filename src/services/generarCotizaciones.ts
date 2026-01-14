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

        return {
          id: fila.id,
          respuesta: resultado,
          updated_at: new Date().toISOString() 
        };
      } catch (err) {
        console.error(`⚠️ Error en fila ${fila.id}`);
        return null;
      }
    });

    // Esperamos a que los 50 terminen de calcularse (tardará ~4-5 segundos en total por lote)
    const resultadosBatch = (await Promise.all(promesas)).filter(r => r !== null);

    // Guardamos los 50 en Supabase de una sola vez
    if (resultadosBatch.length > 0) {
      await supabase.from('cotizaciones_maestras').upsert(resultadosBatch);
      totalProcesadas += resultadosBatch.length;
      console.log(`🚀 Procesadas: ${totalProcesadas} de 7000...`);
    }
  }
  console.log(`🏁 Proceso finalizado.`);
};