
import {  booking, dash, logout, profile,  } from '../assets'


export const side_menu = [
    {
        icon: dash,
        label: 'Dashboard',
        href: '',
    },
    {
        icon: booking,
        label: 'My Bookings',
        href: 'bookings',
    },

    {
        icon: profile,
        label: 'Profile',
        href: 'profile',
    },

    {
        icon: logout,
        label: 'Log out',
        href: 'logout',
        custom: true,   // add this so Sidebar knows this is a special action
    }
]
