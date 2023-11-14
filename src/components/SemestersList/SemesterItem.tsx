import styles from './SemestersList.module.scss';

export interface SemestreInformation {
  sem_vcCodigo: string;
  sem_cEstado: string;
}

function SemseterItem() {
  return (
    <section className={styles.semesterListItem}>
      Semestre
    </section>
  );
}

export default SemseterItem;
