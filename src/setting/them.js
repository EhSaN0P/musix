export const themes = {
    red: {
        mainColor: '#ff4444',
        id:'red',
        body:{
            gradient: {
                colors: [ "#731f1f","#551414","#cc3030"],
                angle: "45deg"
            }
        },
        lists:{
            ListItemDesktop:'error',
            ListItem:'linear-gradient(40deg,#d38a8a,#d66565);',
            ListItemText:'#da2323',
            ListItemActive:'linear-gradient(40deg,#100505,#770505);',
            primary:'#610d0d',
            activePrimary:'#ed5252',
            logout:'error',
            login:'info',
            rotate:'error'
        },
        bottomNav:{
            icon: '#e47d7d',
            activeIcon: '#ff0000',
        },
        drawer:{
            user_name:'#c44f4f'
        },
        popUp:{
            logout :"error",
            login :"warning",
        }, searchBar:{
            borderColor:'rgb(216,35,35)',
            text:'rgb(216,126,126)',
        },
        searchFilters:{
            tabColor:'rgb(216,35,35)',
            activeTabColor:'rgb(221,142,142)',
        },




    },

    blue: {
        mainColor: '#4444ff',
        id:'blue',
        body: {
            gradient: {
                colors: ["#52027a", "#02127a", "#02127a"],
                angle: "45deg"
            }
        },
        lists:{
            ListItemDesktop:'primary',
            ListItem:'linear-gradient(40deg,#6b9bd1,#4a7bc4);',
            ListItemText:'#2563eb',
            ListItemActive:'linear-gradient(40deg,#0a1628,#05326b);',
            primary:'#0d3561',
            activePrimary:'#5299ed',
            logout:'primary',
            login:'info',
            rotate:'primary'
        },
        bottomNav:{
            icon: '#0052ff',
            activeIcon: '#a100ff'
        },
        drawer:{
            user_name:'#5484c6'
        },
        popUp:{
            logout :"error",
            login :"primary"

        },
        searchBar:{
            borderColor:'rgb(81,152,235)',
            text:'rgb(126,167,216)',
        },
        searchFilters:{
            tabColor:'rgb(35,107,216)',
            activeTabColor:'rgb(142,176,221)',
        }
    },

    purple: {
        mainColor: '#aa44ff',
        id:'purple',
        body: {
            gradient: {
                colors: ["rgba(31,4,53,0.76)", "rgb(19,0,34)","rgba(169,75,250,0.76)"],
                angle: "0deg"
            }
        },
        lists:{
            ListItemDesktop:'secondary',
            ListItem:'linear-gradient(40deg,#c89bd1,#b865d6);',
            ListItemText:'#a855f7',
            ListItemActive:'linear-gradient(40deg,#1a0528,#4b056b);',
            primary:'#4a0d61',
            activePrimary:'#c752ed',
            logout:'secondary',
            login:'info',
            rotate:'secondary'
        },
        bottomNav:{
            icon: '#a600ff',
            activeIcon: '#f200ff'
        },
        drawer:{
            user_name:'#b44fc4'
        },
        popUp:{
            logout :"error",
            login :"secondary",

        },
        searchBar:{
            borderColor:'rgb(155,39,175)',
            text:'rgb(207,126,216)',

        },
        searchFilters:{
            tabColor:'rgb(216,35,207)',
            activeTabColor:'rgb(213,142,221)',
        }
    },
    makeGradient : (theme) => {
        const t = themes[theme].body;
        return `linear-gradient(${t.gradient.angle}, ${t.gradient.colors.join(", ")})`;
    }

};
export const themesList = [
    { id: 'red', name: 'قرمز', nameEn: 'Red', color: '#ff4444' },
    { id: 'blue', name: 'آبی', nameEn: 'Blue', color: '#4444ff' },
    { id: 'purple', name: 'بنفش', nameEn: 'Purple', color: '#aa44ff' },
];