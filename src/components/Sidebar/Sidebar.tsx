import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconListCheck,
  IconCalendarEvent,
  IconLogout,
  IconSwitchHorizontal,
  IconUser,
  IconListDetails,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import { useLocation } from 'wouter';
import classes from './Sidebar.module.css';

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
  { icon: IconListCheck, label: 'Semestres', to: '/semestres' },
  { icon: IconListDetails, label: 'Grupos', to: '/grupos' },
  { icon: IconCalendarEvent, label: 'Horarios', to: '/horarios' },
  { icon: IconUser, label: 'Cuenta', to: '/cuenta' },
];

export default function Sidebar() {
  const setLocation = useLocation()[1];
  const [active, setActive] = useState(2);

  const links = tabs.map((link, index) => (
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
        <MantineLogo type="mark" size={30} />
      </Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Cambiar de cuenta" />
        <NavbarLink icon={IconLogout} label="Cerrar sesión" />
      </Stack>
    </nav>
  );
}
