import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home'
import Fevourite from './Fevourite';
import Profile from './Profile';
import Setting from './Setting';

export const Screens = [
    {
        name: 'Home',
        component: Home,
        icon: <Icon name={'home-outline'} size={22} color={'#fff'} />
    },
    {
        name: 'Favourite',
        component: Fevourite,
        icon: <Icon name={'heart-outline'} size={22} color={'#fff'} />
    },
    {
        name: 'Profile',
        component: Profile,
        icon: <Icon name={'person-outline'} size={22} color={'#fff'} />
    },
    {
        name: 'Setting',
        component: Setting,
        icon: <Icon name={'settings-outline'} size={22} color={'#fff'} />
    },
]