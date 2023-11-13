import { Link } from "wouter";
import styles from "../../Layout.module.scss";

function Sidebar() {

  return (
    <aside className={styles.sidebar}>
      <Link to={'/semestres'}>Semestres</Link>
      <Link to={'/grupos'}>Grupos</Link>
      <Link to={'/horarios'}>Horarios</Link>
    </aside>
  );
}

export default Sidebar;
