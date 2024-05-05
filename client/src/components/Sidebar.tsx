import { useState } from 'react';
import {  Tooltip, UnstyledButton, Stack, rem, useMantineColorScheme } from '@mantine/core';
import {
    IconHome2,
    IconLogout,
    IconPlus,
    IconArrowsJoin,
    IconMoon,
    IconSun,
} from '@tabler/icons-react';
import classes from '../styling/Sidebar.module.css';

interface NavbarLinkProps {
    icon: typeof IconHome2;
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

    const mockdata = [
    { icon: IconHome2, label: 'Home' },
    { icon: IconPlus, label: 'Add New'},
    { icon: IconArrowsJoin, label: 'Join' },
    ];

export function Sidebar() {
    const [active, setActive] = useState(0);

    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
        console.log(colorScheme)
    const links = mockdata.map((link, index) => (
        <NavbarLink
        {...link}
        key={link.label}
        active={index === active}
        onClick={() => {alert(index); setActive(index)}}
        />
    ));

    return (
        <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
            <Stack justify="center" gap={0}>
            {links}
            </Stack>
            <Stack justify="center" align='center'>
            <Tooltip label="change theme" position="right" transitionProps={{ duration: 0 }}>
        <UnstyledButton onClick={toggleColorScheme} className={classes.link} data-active={active || undefined}>
            {
                colorScheme === 'dark' ? <IconSun style={{ width: rem(20), height: rem(20) }} stroke={1.5} /> : <IconMoon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            }
        </UnstyledButton>
        </Tooltip>
            </Stack>
        </div>
        

        <Stack justify="center" gap={0}>
            <NavbarLink icon={IconLogout} label="Logout" />
        </Stack>
        </nav>
    );
    }