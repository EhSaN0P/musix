import * as Lucide from "lucide-react"
import * as Icons from "@mui/icons-material";

export const sidebarItems = [
    { name: 'New Vibes', icon: <Lucide.Activity />, path: '/' },
    { name: 'Vibe Types', icon: <Icons.Widgets />, path: '/vibe-types' },
    { name: 'Vibe Lists', icon: <Icons.QueueMusic />, path: '/vibe-lists' },
    { name: 'Vibe Makers', icon: <Lucide.Mic2 />, path: '/vibe-makers' },
    { name: 'By Your Vibe', icon: <Icons.AutoAwesome />, path: '/by-your-vibe' },
    { name: 'The Mosts', icon: <Icons.AutoGraph />, path: '/the-mosts' },
    { name: 'Vibe Remixers', icon: <Lucide.Disc3 />, path: '/vibe-remixers' },
];

export const sidebarFeatures = [
    { name: 'Settings', icon: <Icons.Settings/>, path: '/settings' },
    { name: 'Profile', icon: <Icons.Person/>, path: '/profile' },
    { name: 'Favorite', icon: <Icons.Favorite/>, path: '/favorite' },
    { name: 'History', icon:<Icons.History/>, path: '/history' },
    { name: 'Download', icon: <Icons.Download/>, path: '/download' },
    { name: 'Info', icon: <Icons.Info/>, path: '/info' },
];


export const quickAccess = [
    { name: 'New Vibes', icon:<Lucide.Activity />, path: '/' },
    { name: 'Favorite', icon:<Icons.Favorite />, path: '/favorite' },
    { name: 'History', icon:  <Lucide.History />, path: '/history' },
    { name: 'Profile', icon: <Icons.Person />, path: '/profile' },

]

