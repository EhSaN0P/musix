// DIFF PATCH — فقط بخش‌هایی که باید در lang.jsx عوض بشن:
// 1. در main_menu هر دو زبان، یه آیتم PartyVibe اضافه کن:
// 2. در feature_menu، Favorite و History رو نگه دار

// =============================================
// نمونه کامل navs برای هر دو زبان:
// =============================================

/*
FA:
navs: {
  main_menu: [
    { name: 'حس های جدید', icon: <Lucid.Activity />, path: '/' },
    { name: 'انواع حس ها', icon: <Icons.Widgets />, path: '/vibe-types' },
    { name: 'پلی لیست حس ها', icon: <Icons.QueueMusic />, path: '/vibe-lists' },
    { name: 'سازندگان حس', icon: <Lucid.Mic2 />, path: '/vibe-makers' },
    { name: 'بر اساس حس شما', icon: <Icons.AutoAwesome />, path: '/by-your-vibe' },
    { name: 'ترین ها', icon: <Icons.AutoGraph />, path: '/the-mosts' },
    { name: 'ریمیکسر حس ها', icon: <Lucid.Disc3 />, path: '/vibe-remixers' },
    { name: '🎉 پارتی وایب', icon: <Icons.Party />, path: '/party-vibe' },  // NEW
  ],
  feature_menu: [
    { name: 'تنظیمات', icon: <Icons.Settings/>, path: '/settings' },
    { name: 'پروفایل', icon: <Icons.Person/>, path: '/profile' },
    { name: 'علاقه‌مندی', icon: <Icons.Favorite/>, path: '/favorite' },
    { name: 'تاریخچه', icon: <Icons.History/>, path: '/history' },
    { name: 'دانلود', icon: <Icons.Download/>, path: '/download' },
    { name: 'درباره ما', icon: <Icons.Info/>, path: '/info' },
  ],
}

EN:
navs: {
  main_menu: [
    ... same structure but English names ...
    { name: '🎉 Party Vibe', icon: <Icons.Celebration/>, path: '/party-vibe' },  // NEW
  ],
}
*/

// =============================================
// FULL lang.jsx با PartyVibe اضافه شده:
// =============================================

export default `
در فایل lang.jsx خودت، به main_menu هر دو زبان اضافه کن:

FA:
{ name: '🎉 پارتی وایب', icon: <Icons.Celebration />, path: '/party-vibe' }

EN:
{ name: '🎉 Party Vibe', icon: <Icons.Celebration />, path: '/party-vibe' }

و در قسمت searchFilters یه مورد برای party اضافه کن:
party: { id: 'party', value: 'پارتی وایب' } / party: { id: 'party', value: 'Party Vibe' }
`;
