// This type comes from the API, but it's not complete.
// I just added the fields I needed (see the console.log(data))
export type CourseAPIResponse = {
  cur_vcNombre: string,
  cur_vcCodigo: string,
  plan_estudios: {
    plaest_vcCodigo: string,
  },
  curso_tipo: {
    curtip_vcNombre: 'ELECTIVO' | 'OBLIGATORIO',
  },
};
