"use client"

import "./CssMenu.css"
import { useEffect, useRef } from "react";
import Link from 'next/link'
import * as React from "react";
import { EventBus } from "../eventbus/event-bus";
import { MdMenu, MdChevronRight, MdOutlineAccountCircle, MdOutlineSettings, MdSupervisorAccount, MdHouse, MdFilterNone, MdOutlineLock } from "react-icons/md";
import { User } from "@prisma/client";


type Props = {
  currentUser: User | undefined
}

export const CssMenu = ({ currentUser }: Props) => {
  // currentUser?.roles.includes("")
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = (event: MouseEvent) => {
      const element = event.target as Element;
      const isDropdownButton = element.classList.contains("data-dropdown-button");
      if (!isDropdownButton && element.closest(".data-dropdown") != null) {
        return
      }

      let currentDropdown: Element | null;
      if (isDropdownButton) {
        currentDropdown = element.closest(".data-dropdown")
        currentDropdown?.classList.toggle("active")
      }

      document.querySelectorAll(".data-dropdown.active").forEach(dropdown => {
        if (dropdown === currentDropdown) return
        dropdown.classList.remove("active")
      })
      if (!element.classList.contains("burger") &&
        !element.classList.contains("menu-header") &&
        !element.classList.contains("link") &&
        !element.classList.contains("dropdown-menu")) {
        menuRef.current?.classList.remove("show-flex")
      }
    }
    document.addEventListener("click", el)

    return () => document.removeEventListener("click", el);
  }, [])

  const handleLogOut = (event: Event | React.SyntheticEvent) => {
    console.log('LogOut');
    handleCloseMenu();
    EventBus.getInstance().dispatch<string>('logout');
  }

  const handleBurgerClick = () => {
    if (menuRef.current?.classList.contains("show-flex")) {
      menuRef.current?.classList.remove("show-flex")
    } else {
      menuRef.current?.classList.add("show-flex")
    }
  }

  const handleCloseMenu = () => {
    menuRef.current?.classList.remove("show-flex")
    document.querySelectorAll(".data-dropdown.active").forEach(dropdown => {
      dropdown.classList.remove("active")
    })
  }

  return (
    <div className="css-menu">
      <div onClick={handleBurgerClick} className="burger vertical-center">
        <MdMenu className="no-events xx-large" />
      </div>
      <div ref={menuRef} className="menu-header">
        <Link href="/" onClick={handleCloseMenu} className="link x-large">Kanowa</Link>

        <div className="dropdown data-dropdown">
          {/* <div className="link dropdown-button data-dropdown-button"> */}
          <div className="link dropdown-button data-dropdown-button">
            <MdFilterNone className="no-events x-large mr-1" /> Pages<MdChevronRight className="no-events x-large" />
          </div>
          <div className="dropdown-menu">
            <Link href='/home' onClick={handleCloseMenu} className="link">
              Home
            </Link>
            <Link href='/user' onClick={handleCloseMenu} className="link">
              User
            </Link>
            <Link href='/mod' onClick={handleCloseMenu} className="link">
              Moderator
            </Link>
            <Link href='/admin/*' onClick={handleCloseMenu} className="link">
              Admin Board
            </Link>
          </div>
        </div>

        <div className="dropdown data-dropdown">
          <div className="link dropdown-button data-dropdown-button"><MdOutlineSettings className="no-events x-large mr-1" /> Administration<MdChevronRight className="no-events x-large" /></div>
          <div className="dropdown-menu">
            <Link href='/colonyManagement' onClick={handleCloseMenu} className="link flex">
              <MdHouse className="no-events x-large mr-1" /> Colonies
            </Link>
            <Link href='/userManagement' onClick={handleCloseMenu} className="link flex">
              <MdSupervisorAccount className="no-events x-large mr-1" /> Users
            </Link>
          </div>
        </div>

        <div className="filler dropdown" />

        <div className="dropdown data-dropdown">
          <div className="link dropdown-button data-dropdown-button">
            <MdOutlineAccountCircle className="no-events x-large mr-1" /> Account<MdChevronRight className="no-events x-large" />
          </div>
          <div className="dropdown-menu dropdown-menu-last">
            <Link href='/colony/register' onClick={handleCloseMenu} className="link">
              Register Kanowa
            </Link>
            <Link href='/profile' onClick={handleCloseMenu} className="link" style={{ display: currentUser ? "flex" : "none" }}>
              Profile
            </Link>
            <Link href='/changePassword' onClick={handleCloseMenu} className="link" style={{ display: currentUser ? "flex" : "none" }}>
              <MdOutlineLock className="no-events x-large" /> Change Password
            </Link>
            <Link href='/login' className="link" style={{ display: currentUser ? "flex" : "none" }} onClick={handleLogOut}>
              Logout
            </Link>
            <Link href='/login' onClick={handleCloseMenu} className="link" style={{ display: currentUser ? "none" : "flex" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
