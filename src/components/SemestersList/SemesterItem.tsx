import { Checkbox, Radio } from '@mantine/core';
import styles from './SemestersList.module.scss';

export interface SemestreInformation {
  sem_vcCodigo: string;
  sem_cEstado: string;
}

function SemseterItem({ semester }: { semester: SemestreInformation }) {
  return (
    <section
      key={semester.sem_vcCodigo}
      className={styles.semesterListItem}
    >
      <div className={styles.semesterTitle}>
        <h4>Semestre {semester.sem_vcCodigo}</h4>
        {
          semester.sem_cEstado !== 'A' && (
            <span className={styles.semestreActivo}>
              Activo
            </span>
          )
        }
      </div>
      <div className={styles.semesterContent}>
        {
          semester.sem_cEstado === 'P' && (
            <ul>
              <li>
                <Radio
                  label="Definir los grupos del semestre"
                  checked={false}
                />
              </li>
              <li>
                <Radio
                  label="Seleccionar horarios"
                  checked={false}
                />
              </li>
            </ul>
          )
        }
      </div>
    </section>
  );
}

export default SemseterItem;
