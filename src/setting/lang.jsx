import * as Icons from "@mui/icons-material";
import * as Lucid from "lucide-react";


export const langs = {
    fa: {
            themButtons: {
                purple: 'بنفش',
                blue: 'ابی',
                red: 'قرمز',
            },
            navs:{
                main_menu:[
                    { name: 'حس های جدید ', icon: <Lucid.Activity />, path: '/' },
                    { name: 'انواع حس ها ', icon: <Icons.Widgets />, path: '/vibe-types' },
                    { name: 'پلی لیست حس ها ', icon: <Icons.QueueMusic />, path: '/vibe-lists' },
                    { name: 'سازندگان حس', icon: <Lucid.Mic2 />, path: '/vibe-makers' },
                    // { name: 'بر اساس حس شما ', icon: <Icons.AutoAwesome />, path: '/by-your-vibe' },
                    // { name: 'ترین ها ', icon: <Icons.AutoGraph />, path: '/the-mosts' },
                    { name: 'ریمیکسر حس ها', icon: <Lucid.Disc3 />, path: '/vibe-remixers' },
                    // { name: '🎉 پارتی وایب', icon: <Icons.Celebration />, path: '/party-vibe' },
                ],
                feature_menu:[
                    { name: 'تنظیمات ', icon: <Icons.Settings/>, path: '/settings' },
                    { name: 'پروفایل', icon: <Icons.Person/>, path: '/profile' },
                    { name: 'علاقه مندی', icon: <Icons.Favorite/>, path: '/favorite' },
                    { name: 'تاریخچه ', icon:<Icons.History/>, path: '/history' },
                    // { name: 'دانلود', icon: <Icons.Download/>, path: '/download' },
                    { name: 'درباره ما ', icon: <Icons.Info/>, path: '/info' },
                ],
                quick_menu : [
                    { name: 'حس های جدید ', icon:<Lucid.Activity />, path: '/' },
                    { name: 'علاقه مندی', icon:<Icons.Favorite />, path: '/favorite' },
                    { name: '🎉 پارتی وایب', icon:<Icons.Celebration />, path: '/party-vibe' },
                    { name: 'پروفایل ', icon: <Icons.Person />, path: '/profile' },
                ]
            },
        guest_name: 'کاربر میهمان',
        tooltip:{
                rotate: 'چرخش ',
                logout:'خروج از حساب'
        },
        popUp: {
            themLangButton :"تم و زبان ",
            settingButton :"تنظیمات  ",
            logoutButton :"خروج از حساب  "
        },
        cancel:'لغو',
        save:'ذخیره',
        searchBar:{
              placeholder: 'آهنگ یا وایب مورد نظر را وارد کن',
        },
        searchFilters:{
            all: {
                id:'all',
                value:'همه'
            },songs: {
                id:'songs',
                value:'آهنگ ها'
            },albums: {
                id:'albums',
                value:'آلبوم ها'
            },artists: {
                id:'artists',
                value:'آرتیست ها'
            },playlists: {
                id:'playlists',
                value:'پلی لیست ها'
            },remixes: {
                id:'remixes',
                value:'ریمیکس ها'
            },
            notFoundSearch: 'چیزی پیدا نشد',
            searchSomeThing:'چیزی برای جستجو تایپ کنید',
            searchPlaceholder:'دنبال چی میگردی ؟',

        },
         loaders:{
                fetching:'در حال واکشی...',
                creating:'در حال ساختن...',
                deleting:'در حال حذف کردن...',
                searching:'دارم میگردم وایسا...',
         }


    },

    en: {
        themButtons: {
            purple: 'purple',
            blue: 'blue',
            red: 'red',
        },

        navs:{
            main_menu:[
                { name: 'New Vibes', icon: <Lucid.Activity />, path: '/' },
                { name: 'Vibe Types', icon: <Icons.Widgets />, path: '/vibe-types' },
                { name: 'Vibe Lists', icon: <Icons.QueueMusic />, path: '/vibe-lists' },
                // { name: 'Vibe Makers', icon: <Lucid.Mic2 />, path: '/vibe-makers' },
                { name: 'By Your Vibe', icon: <Icons.AutoAwesome />, path: '/by-your-vibe' },
                // { name: 'The Mosts', icon: <Icons.AutoGraph />, path: '/the-mosts' },
                { name: 'Vibe Remixers', icon: <Lucid.Disc3 />, path: '/vibe-remixers' },
                // { name: '🎉 Party Vibe', icon: <Icons.Celebration />, path: '/party-vibe' },
            ],
            feature_menu:[
                { name: 'Settings', icon: <Icons.Settings/>, path: '/settings' },
                { name: 'Profile', icon: <Icons.Person/>, path: '/profile' },
                { name: 'Favorite', icon: <Icons.Favorite/>, path: '/favorite' },
                { name: 'History', icon:<Icons.History/>, path: '/history' },
                // { name: 'Download', icon: <Icons.Download/>, path: '/download' },
                { name: 'Info', icon: <Icons.Info/>, path: '/info' },
            ],
            quick_menu : [
                { name: 'New Vibes', icon:<Lucid.Activity />, path: '/' },
                { name: 'Favorite', icon:<Icons.Favorite />, path: '/favorite' },
                { name: ' Party Vibe', icon:<Icons.Celebration />, path: '/party-vibe' },
                { name: 'Profile', icon: <Icons.Person />, path: '/profile' },
            ]
        },
        guest_name: 'Guest User',
        tooltip:{
            rotate: 'rotate ',
            logout:'logout'
        },
        popUp: {
            themLangButton :"Theme & Languages ",
            settingButton :"Settings ",
            logoutButton :"Logout  "
        },
        cancel:'cancel',
        save:'save',
        searchBar:{
            placeholder: 'Search for Songs & Vibes',
        },
        searchFilters:{
            all: {
                id:'all',
                value:'all'
            },songs: {
                id:'songs',
                value:'songs'
            },albums: {
                id:'albums',
                value:'albums  '
            },artists: {
                id:'artists',
                value:'artists  '
            },playlists: {
                id:'playlists',
                value:'playlists'
            },remixes: {
                id:'remixes',
                value:'remixes  '
            },
            searchPlaceholder:'what do you looking for ?',
            notFoundSearch: 'not found',
            searchSomeThing:'Search some thing',
        },
        loaders: {
            fetching: 'Fetching...',
            creating: 'Creating...',
            deleting: 'Deleting...',
            searching: 'Searching, hold on...',
        }
    }
};
