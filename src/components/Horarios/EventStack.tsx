import classes from './Horarios.module.scss';

export default function EventStack() {
  return (
    <article className={classes.stack}>
      <h3>Cursos disponibles</h3>
      <div className={classes.event}>Curso 1</div>
      <div className={classes.event}>Curso 2</div>
      <div className={classes.event}>Curso 3</div>
      <div className={classes.event}>Curso 4</div>
      <div className={classes.event}>Curso 5</div>
    </article>
  );
}
