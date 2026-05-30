
import SideBarMobile from "./SideBarMobile/SideBarMobile.jsx";
import MainContentDesktop from "../LayoutMobile/MainContentMobile/MainContentMobile.jsx";


export default function LayoutMobile({ children }) {
    return (
        < >
            <SideBarMobile />
            <MainContentDesktop>
                {children}
            </MainContentDesktop>
        </>
    );
}
