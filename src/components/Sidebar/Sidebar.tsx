import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconListCheck,
  IconCalendarEvent,
  IconLogout,
  IconUser,
  IconListDetails,
} from '@tabler/icons-react';
import { useLocation } from 'wouter';
import classes from './Sidebar.module.css';
import { useUser } from '../../stores/userStore';
import fisi from '../../../public/fisi.png';

interface NavbarLinkProps {
  icon: typeof IconListCheck;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const tabs = [
  { icon: IconListCheck, label: 'semestres', to: '/semestres' },
  { icon: IconListDetails, label: 'grupos', to: '/grupos' },
  { icon: IconCalendarEvent, label: 'horarios', to: '/horarios' },
  { icon: IconUser, label: 'cuenta', to: '/cuenta' },
];

export default function Sidebar() {
  const setLocation = useLocation()[1];
  const [active, setActive] = useState(2);
  const { user } = useUser();

  const links = tabs
  .filter((tab) => (
    tab.label === 'semestres' || user!.roles.includes(tab.label as any)
  ))
  .map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        setLocation(link.to);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
        <img src={fisi} alt="FISI" style={{ width: '100%', margin: 'auto' }} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconLogout} label="Cerrar sesión" onClick={() => useUser.setState({ user: null })} />
      </Stack>
    </nav>
  );
}
