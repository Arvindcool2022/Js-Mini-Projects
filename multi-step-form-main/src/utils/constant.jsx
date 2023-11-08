import { IconAdvanced, IconArcade, IconPro } from '../components/ReactSvg';

const PLANS = [
  {
    icon: [<IconArcade />],
    name: 'arcade',
    price: 9
  },
  {
    icon: [<IconAdvanced />],
    name: 'advanced',
    price: 12
  },
  { 
    icon: [<IconPro />],
    name: 'pro',
    price: 15
  }
];
const ADD_ON = [
  {
    name: 'online service',
    des: 'access to mutiplayer games',
    price: 1
  },
  {
    name: 'large storage',
    des: 'extra 1tb of cloud save',
    price: 2
  },
  {
    name: 'customizable profile',
    des: 'custom theme on your profile',
    price: 2
  }
];

export { PLANS, ADD_ON };
