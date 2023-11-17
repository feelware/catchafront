import { useEffect } from "react";

// const horariosPayloadSchema = z.array(z.object({
//   curso_vcCodigo: z.string(),
//   curso_tipo: z.enum(['teoria', 'practica', 'laboratorio']),
//   grupo_numero: z.number(),
//   hora_inicio: z.string(),
//   hora_final: z.string(),
// }))

interface HorariosPayload {
  curso_vcCodigo: string,
  curso_tipo: 'teoria' | 'practica' | 'laboratorio',
  grupo_numero: number,
  hora_inicio: string,
  hora_final: string,
}

function Aulaspage() {
  // useEffect(() => {
  //   fetch
  // })

  return (
    <div>Hello</div>
  );
}

export default Aulaspage;
