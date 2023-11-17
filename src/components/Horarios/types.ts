// Response from '/secciones/:escuela/:semestre'
export interface AssignedGroupsResponse {
  gru_iNumero: number;
  curso: Curso;
}

export interface Curso {
  cur_iCodigo: number;
  cur_vcCodigo: string;
  cur_vcNombre: string;
  cur_fCreditos: string;
  cur_fCreditosRequisito: string;
  cur_iCiclo: number;
  plaest_iCodigo: number;
  curtip_iCodigo: number;
  curare_iCodigo: number;
  curso_horasdictado: CursoHorasdictado[];
}

export interface CursoHorasdictado {
  curhor_iCodigo: number;
  curhor_iHoras: number;
  cur_iCodigo: number;
  curtip_iCodigo: number;
}
