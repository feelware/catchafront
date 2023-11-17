import { Button, Fieldset, PasswordInput, TextInput, Title } from '@mantine/core';
import { sha256 } from 'js-sha256';
import { useState } from 'react';
import fisi from '../../public/fisi.png';
import { LoggedUserInformation, useUser } from '../stores/userStore';

const users = [
  {
    id: 1,
    name: 'Paolo Luis Flores Congora',
    email: 'paolo.flores@unmsm.edu.pe',
    password: '254835d73cc88095a30fc74133beabe9d8463b2954493227b205ea326c8a9c86',
    roles: ['horarios'],
  },
  {
    id: 2,
    name: 'Jesus Stevan Diaz Ingol',
    email: 'jesus.diaz10@unmsm.edu.pe',
    password: 'a54e71f0e17f5aaf7946e66ab42cf3b1fd4e61d60581736c9f0eb1c3f794eb7c',
    roles: ['grupos'],
  },
  {
    id: 3,
    name: 'Rodrigo Jose Alva Saenz',
    email: 'rodrigo.alva@unmsm.edu.pe',
    password: 'c9fd92c735c7609969a0ab48b6dc2fda85a06e135196571c06708222baf5a2e7',
    roles: ['horarios', 'grupos'],
  },
  {
    id: 4,
    name: 'Jose Alfredo Herrera Quispe',
    email: 'jose.alfredo@unmsm.edu.pe',
    password: '1ec4ed037766aa181d8840ad04b9fc6e195fd37dedc04c98a5767a67d3758ece',
    roles: ['horarios', 'grupos', 'aulas', 'admin'],
  },
] satisfies LoggedUserInformation[];

const login = (email: string, password: string) => {
  const hashedPassword = sha256(password);
  const user = users.find((u) => u.email === email && u.password === hashedPassword);
  useUser.setState({ user });
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div style={{ height: '100vh', display: 'grid', placeContent: 'center', gap: '20px' }}>
      <img src={fisi} alt="FISI" style={{ width: '100px', margin: 'auto' }} />
      <Title style={{ textAlign: 'center' }} order={2}>fisi-scheduler</Title>
      <Fieldset
        style={{
        margin: 'auto',
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        gap: '10px',
      }}
      >
        <TextInput value={email} onChange={(event) => setEmail(event.currentTarget.value)} placeholder="Email" />
        <PasswordInput value={password} onChange={(event) => setPassword(event.currentTarget.value)} placeholder="Password" />
        <Button type="submit" onClick={() => login(email, password)}>
          Iniciar Sesión
        </Button>
      </Fieldset>
    </div>
  );
}
