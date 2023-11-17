import { Button, Stepper, Text } from '@mantine/core';
import { Link } from 'wouter';
import styles from './SemestersList.module.scss';
import { SemestreInformation } from './types';
import { useUser } from '../../stores/userStore';

function SemseterItem({ semester }: { semester: SemestreInformation }) {
  const { user } = useUser();
  let state = 0;
  if (semester.groups_count > 0) state += 1;

  return (
    <section
      key={semester.sem_vcCodigo}
      className={styles.semesterListItem}
    >
      <div className={styles.semesterTitle}>
        <h4>Semestre {semester.sem_vcCodigo}</h4>
        {
          semester.sem_cEstado === 'A' && (
            <span className={styles.semestreActivo}>Activo</span>
          )
        }
      </div>
      <div className={styles.semesterContent}>
        {
          semester.sem_cEstado === 'P' && (
            <Stepper
              active={state}
              size="sm"
              onStepClick={() => {}}
              style={{ maxWidth: '50rem', marginTop: '1rem', marginBottom: '1rem' }}
            >
              <Stepper.Step
                label="Apertura de grupos"
                description={state === 0 ? 'Pendiente' : 'Click para editar'}
              >
                <Text>Paso 1: Apertura de grupos.</Text>
                <Text mb="sm">
                  La apertura de secciones se realiza por escuela, con los
                  planes de estudio disponibles
                </Text>
                <Link href="/grupos">
                  <Button size="compact-sm" disabled={!user?.roles.some(role => role === 'grupos')}>
                    Empezar
                  </Button>
                </Link>
              </Stepper.Step>
              <Stepper.Step label="Asignación de horarios" description="Verify email">
                <Text>Paso 2: Asignación de horarios.</Text>
                <Text mb="sm">
                  La asignación de horarios se realiza por escuela, con los
                  planes de estudio disponibles
                </Text>
                <Link href="/horarios">
                  <Button size="compact-sm" disabled={!user?.roles.some(role => role === 'horarios')}>
                    Empezar
                  </Button>
                </Link>
              </Stepper.Step>
              <Stepper.Step label="Asignación de aulas" description="Get full access">
                <Text>Paso 3: Asignación de aulas.</Text>
                <Text mb="sm">
                  La asignación de aulas se realiza por escuela, con los
                  planes de estudio disponibles
                </Text>
                <Button size="compact-sm" disabled={!user?.roles.some(role => role === 'aulas')}>
                  Empezar
                </Button>
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
