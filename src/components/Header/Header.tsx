import { Image } from '@mantine/core';
import styles from '../../Layout.module.scss';

function Header() {

  return (
    <header className={styles.header} style={{
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#222027'
    }}>
      <Image src="/fisi_logo.png" width={50} height={50} alt="FISI Logo" />
    </header>
  );
}

export default Header;
