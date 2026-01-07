import { supabase } from '../config/database'; 
import { calcularPrecio } from './cotizacion'; // Tu función que pide (req, res)

export const procesarTodo = async () => {
  console.log("⏳ Iniciando proceso por lotes...");

  const { data: filas, error } = await supabase
    .from('cotizaciones_maestras')
    .select('id, group, edad_1, edad_2, hijos, tipo');

  if (error || !filas) return console.error("Error:", error);

  const TAMANO_LOTE = 5; // Cada cuántas filas queremos guardar
  let loteActual = [];

  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];

    // 1. Ejecutamos el cálculo (Simulación de req/res)
    const resultado = await new Promise((resolve) => {
      const mockRes = { 
        json: (data: unknown) => resolve(data), 
        status: () => mockRes, 
        send: (data: unknown) => resolve(data) 
      };
      
      calcularPrecio({
        body: {
          group: String(fila.group),
          edad_1: String(fila.edad_1),
          edad_2: String(fila.edad_2 || 0),
          numkids: String(fila.hijos),
          tipo: fila.tipo
        }
      } as any, mockRes as any);
    });

    // 2. Lo metemos en la "bolsa" temporal
    loteActual.push({
      id: fila.id,
      respuesta: resultado,
      updated_at: new Date().toISOString()
    });

    // 3. ¿La bolsa ya tiene el tamaño del lote? ¡Guardamos!
    if (loteActual.length === TAMANO_LOTE || i === filas.length - 1) {
      const { error: upsertError } = await supabase
        .from('cotizaciones_maestras')
        .upsert(loteActual, { onConflict: 'id' });

      if (upsertError) {
        console.error(`❌ Error guardando lote hasta la fila ${i}:`, upsertError.message);
      } else {
        console.log(`✅ Guardado lote exitoso: Procesadas ${i + 1} / ${filas.length}`);
      }

      // Vaciamos la bolsa para el siguiente lote
      loteActual = [];
    }
  }

  console.log("🏁 ¡Proceso completado!");
};