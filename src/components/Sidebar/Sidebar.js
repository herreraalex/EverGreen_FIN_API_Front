// Imports
import React, { useContext, useRef, useState } from "react";
import { logoSVG } from "../../assets";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "./../../App";

import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

import {
    SDivider, 
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSearch,
    SSearchIcon,
    SSidebar,
    SSidebarButton,
    STheme,
    SThemeLabel,
    SThemeToggler,
    SToggleThumb,
} from "./styles";

import {
    AiOutlineApartment,
    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineSearch,
    AiOutlineSetting,
    AiFillQuestionCircle,
    AiOutlineUserAdd,
} from "react-icons/ai";

import {
    BsCardChecklist,
} from "react-icons/bs";

import {
    GrContactInfo,
} from "react-icons/gr";

// Sidebar
const Sidebar = () => {
    const searchRef = useRef(null);
    const { setTheme, theme } = useContext(ThemeContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();

    const searchClickHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
            searchRef.current.focus();
        } else {
            // search functionality
        }
    };

    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo>
                <img src={logoSVG} alt="logo"/>
            </SLogo>
            <SSearch
                onClick={searchClickHandler}
                style={!sidebarOpen ? { width: `fit-content` } : {}}
            >
                <SSearchIcon>
                    <AiOutlineSearch />
                </SSearchIcon>
                <input
                    ref={searchRef}
                    placeholder="Search"
                    style={!sidebarOpen ? { width: 0, padding: 0 } : {}}
                />
            </SSearch>
            <SDivider />
            {linksArray.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {/* if notifications are at 0 or null, do not display */}
                                {!!notification && (
                                    <SLinkNotification>{notification}</SLinkNotification>
                                )}
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {secondaryLinksArray.map(({ icon, label }) => (
                <SLinkContainer key={label}>
                    <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            <STheme>
                {sidebarOpen && <SThemeLabel>Dark Mode</SThemeLabel>}
                <SThemeToggler
                    isActive={theme === "dark"}
                    onClick={() => setTheme((p) => (p === "light" ? "dark" : "light"))}
                >
                    <SToggleThumb style={theme === "dark" ? { right: "1px" } : {}} />
                </SThemeToggler>
            </STheme>
        </SSidebar>
    );
};

// Section 1 of the sidebar
const linksArray = [
    {
        label: "Home",
        icon: <AiOutlineHome />,
        to: "/",
        notification: 0,
    },
];

// Section 2 of the sidebar
const secondaryLinksArray = [
    {
        label: "Settings",
        icon: <AiOutlineSetting />,
    },
    {
        label: "Logout",
        icon: <MdLogout />,
    },
];

export default Sidebar;
