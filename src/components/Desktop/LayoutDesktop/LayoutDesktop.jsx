
import SideBarDesktop from "./SideBarDesktop/SideBarDesktop.jsx";
import MainContentDesktop from "../LayoutDesktop/MainContentDesktop/MainContentDesktop.jsx";

export default function LayoutDesktop({ children }) {
    return (
        <div className={'flex gap-6 m-3'}>
             <SideBarDesktop />
            <MainContentDesktop>
                {children}
            </MainContentDesktop>
        </div>
     );
}
