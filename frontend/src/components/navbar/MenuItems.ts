export type MenuItem = {
    label: string;
    link: string;
  };
  
export const APP_NAME = "fairVote"
const menuItems: MenuItem[] = [
    {
        label: 'Home',
        link: '/',
    },
    {
        label: 'Explore',
        link: '/Explore',
    },
    {
        label: 'Account',
        link: '/Account',
    },
    {
        label: 'About',
        link: '/About',
    },
    // Add more menu items as needed
];
  
export default menuItems;
  