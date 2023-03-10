import styles from "./CssMenu.module.css"
import {useEffect, useRef} from "react";
import Link from 'next/link'
import * as React from "react";
import {
    MdMenu,
    MdChevronRight,
    MdOutlineAccountCircle,
    MdOutlineSettings,
    MdSupervisorAccount,
    MdHouse,
    MdFilterNone,
    MdOutlineLock
} from "react-icons/md";
import {signIn, signOut, useSession} from "next-auth/react";


export const CssMenu = () => {
    const {data: session} = useSession();
    // console.log({ session });

    const loggedIn = session?.user
    // const admin = session?.user.role.includes("ROLE_ADMIN")

    // currentUser?.roles.includes("")
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = (event: MouseEvent) => {
            const element = event.target as Element;
            const isDropdownButton = element.hasAttribute("data-dropdown-button");
            // console.log('isDropdownButton', isDropdownButton)
            if (!isDropdownButton && element.closest("[data-dropdown]") != null) {
                return
            }

            let currentDropdown: Element | null;
            if (isDropdownButton) {
                currentDropdown = element.closest("[data-dropdown]")
                // currentDropdown = element.closest("." + styles.dataDropdown)
                // console.log('currentDropdown', currentDropdown)
                // console.log('currentDropdown', currentDropdown?.classList)
                currentDropdown?.classList.toggle(styles.active)
                // console.log('currentDropdown', currentDropdown?.classList)
            }
            document.querySelectorAll("[data-dropdown]").forEach(dropdown => {
                if (dropdown.classList.contains(styles.active)) {
                    if (dropdown === currentDropdown) return
                    dropdown.classList.remove(styles.active)
                }
            })
            // console.log('element.classList', element.classList)
            if (!element.classList.contains(styles.burger) &&
                !element.classList.contains(styles.menuHeader) &&
                !element.classList.contains(styles.link) &&
                !element.classList.contains(styles.dropdownMenu)) {
                // console.log('remove showFlex')
                document.querySelector("[data-menu]")?.classList.remove(styles.showFlex)
                // menuRef.current?.classList.remove(styles.showFlex)
            }
        }
        document.addEventListener("click", el)

        return () => document.removeEventListener("click", el);
    }, [])

    function handleLogin() {
        signIn()
        handleCloseMenu();
    }

    const handleLogOut = (event: Event | React.SyntheticEvent) => {
        // console.log('LogOut');
        signOut()
        handleCloseMenu();
        // EventBus.getInstance().dispatch<string>('logout');
    }

    const handleBurgerClick = () => {
        document.querySelector("[data-menu]")?.classList.toggle(styles.showFlex)
    }

    const handleCloseMenu = () => {
        document.querySelector("[data-menu]")?.classList.remove(styles.showFlex)
        document.querySelectorAll("[data-dropdown]").forEach(dropdown => {
            dropdown.classList.remove(styles.active)
        })
    }

    return (
        <div className={styles.cssMenu}>
            <div onClick={handleBurgerClick} className={styles.burger}>
                <MdMenu className={[styles.cssMenu, styles.xxLarge, styles.noEvents].join(" ")}/>
            </div>
            <div data-menu="" className={styles.menuHeader}>
                <Link href="/" onClick={handleCloseMenu}
                      className={[styles.link, styles.xLarge].join(" ")}>Kanowa</Link>

                <div data-dropdown="" className={[styles.dropdown].join(" ")}>
                    <div data-dropdown-button="" className={[styles.link, styles.dropdownButton].join(" ")}>
                        <MdFilterNone className={[styles.noEvents, styles.xLarge, "mr-1"].join(" ")}/>
                        Pages <MdChevronRight className={[styles.noEvents, styles.xLarge].join(" ")}/>
                    </div>
                    <div className={styles.dropdownMenu}>
                        <Link href='/home' onClick={handleCloseMenu} className={styles.link}>
                            Home
                        </Link>
                        <Link href='/users' onClick={handleCloseMenu} className={styles.link}>
                            User
                        </Link>
                        <Link href='/mod' onClick={handleCloseMenu} className={styles.link}>
                            Moderator
                        </Link>
                        <Link href='/admin' onClick={handleCloseMenu} className={styles.link}>
                            Admin Board
                        </Link>
                        <Link href='/poc/mail' onClick={handleCloseMenu} className={styles.link}>
                            Mail
                        </Link>
                    </div>
                </div>

                <div data-dropdown="" className={[styles.dropdown].join(" ")}>
                    <div data-dropdown-button="" className={[styles.link, styles.dropdownButton].join(" ")}>
                        <MdOutlineSettings
                            className={[styles.noEvents, styles.xLarge, "mr-1"].join(" ")}/> Administration<MdChevronRight
                        className={[styles.noEvents, styles.xLarge].join(" ")}/></div>
                    <div className={styles.dropdownMenu}>
                        <Link href='/administration/colonies' onClick={handleCloseMenu}
                              className={[styles.link, "flex"].join(" ")}>
                            <MdHouse className={[styles.noEvents, styles.xLarge, "mr-1"].join(" ")}/> Colonies
                        </Link>
                        <Link href='/administration/users' onClick={handleCloseMenu}
                              className={[styles.link, "flex"].join(" ")}>
                            <MdSupervisorAccount className={[styles.noEvents, styles.xLarge, "mr-1"].join(" ")}/> Users
                        </Link>
                    </div>
                </div>

                <div className={[styles.filler, styles.dropdown].join(" ")}/>

                <div data-dropdown="" className={[styles.dropdown].join(" ")}>
                    <div data-dropdown-button="" className={[styles.link, styles.dropdownButton].join(" ")}>
                        <MdOutlineAccountCircle className={[styles.noEvents, styles.xLarge, "mr-1"].join(" ")}/> Account<MdChevronRight
                        className={[styles.noEvents, styles.xLarge].join(" ")}/>
                    </div>
                    <div className={[styles.dropdownMenu, styles.dropdownMenuLast].join(" ")}>
                        <Link href='/colony/register' onClick={handleCloseMenu} className={styles.link}>
                            Register Kanowa
                        </Link>
                        <Link href='/profile' onClick={handleCloseMenu} className={styles.link}
                              style={{display: loggedIn ? "flex" : "none"}}>
                            Profile
                        </Link>
                        <Link href='/changePassword' onClick={handleCloseMenu} className={styles.link}
                              style={{display: loggedIn ? "flex" : "none"}}>
                            <MdOutlineLock className={[styles.noEvents, styles.xLarge].join(" ")}/> Change Password
                        </Link>
                        <button className={styles.link} style={{display: loggedIn ? "flex" : "none"}}
                                onClick={handleLogOut}>
                            Logout
                        </button>
                        <button onClick={handleLogin} className={styles.link}
                                style={{display: loggedIn ? "none" : "flex"}}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
