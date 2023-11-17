import { Stepper } from '@mantine/core';
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
          semester.sem_cEstado === 'A' && (
            <span className={styles.semestreActivo}>
              Activo
            </span>
          )
        }
      </div>
      <div className={styles.semesterContent}>
        {
          semester.sem_cEstado === 'P' && (
            <Stepper
              active={1}
              size="sm"
              onStepClick={() => {}}
              style={{ maxWidth: '50rem', marginTop: '1rem', marginBottom: '1rem' }}
            >
              <Stepper.Step label="Primer paso" description="Abrir secciones">
                Step 1 content: Create an account
              </Stepper.Step>
              <Stepper.Step label="Segundo paso" description="Verify email">
                Step 2 content: Verify email
              </Stepper.Step>
              <Stepper.Step label="Tercer paso" description="Get full access">
                Step 3 content: Get full access
              </Stepper.Step>
              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
            </Stepper>
          )
        }
      </div>
    </section>
  );
}

export default SemseterItem;
