"use client"
import * as React from 'react';
import {ChangeEvent, useEffect, useState} from "react";
import moment from 'moment';
import "./Users.css"
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdCancel, MdAddBusiness} from "react-icons/md";
import Link from "next/link";
import {User} from "@prisma/client";

type SortType = "name" | "username" | "created" | "active" | "email";

const Users = ({ users } : {users: User[]}) => {

  const [filteredSortedUsers, setFilteredSortedUsers] = useState<User[]>([]);

  const [sort, setSort] = useState<SortType>("created");
  const [ascending, setAscending] = useState<boolean>(true);

  const [filterText, setFilterText] = useState<string>("");

  const setSorting = (sort: SortType) => {
    console.log(sort)
    setSort(sort);
    setAscending(!ascending);
  }

  const number = (a: boolean) => {
    return a ? 1 : -1;
  }

  const sortByName = () => {
    setSorting("name")
  }
  const sortByUsername = () => {
    setSorting("username")
  }
  const sortByEmail = () => {
    setSorting("email")
  }
  const sortByCreated = () => {
    setSorting("created")
  }
  const sortByActivated = () => {
    setSorting("active")
  }

  const changeText = (event: ChangeEvent) => {
    setFilterText((event.target as HTMLInputElement).value);
    console.log('filterText', filterText)
  }

  useEffect(() => {
    const sorter = (a: User, b: User) => {
      switch (sort) {
        case "name": {
          const nameA = a.firstname + a.lastname;
          const nameB = b.firstname + b.lastname;
          return number(ascending) * nameA.localeCompare(nameB)
        }
        case "username": {
          if (!a.username || !b.username) return 0
          return number(ascending) * a.username.localeCompare(b.username)
        }
        case "email": {
          if (!a.email || !b.email) return 0
          return number(ascending) * a.email.localeCompare(b.email)
        }
        case "created": {
          return number(ascending) * number((a.createdAt.valueOf() > b.createdAt.valueOf()))
        }
        case "active": {
          return number(ascending) * (number(b.active) - number(a.active))
        }
      }
      return 0;
    }

    let fsUsers: User[] | [];
    fsUsers = users?.sort((a, b) => sorter(a, b))
      .filter(user => {
        const textToBeFiltered = user.firstname + " " + user.lastname + " " + user.email + + " " + user.username;
        return filterText ? (textToBeFiltered.toLowerCase().includes(filterText.toLowerCase())) : true
      });
    setFilteredSortedUsers(fsUsers)

  }, [users, ascending, sort, filterText])

  const handleClearTextFilter = () => {
    setFilterText("")
  }

  return (
    <div>
          <div className="actionBar">
            <div className="filler">Set filter:</div>
            By Name <input className="search-box" autoFocus value={filterText} onChange={changeText}/>
            <MdCancel className="filterCancelIcon larger" onClick={handleClearTextFilter}/>
          </div>
          <div>
            <div className="users-tableRow tableRow tableHeader">
              <div className="tableHeaderSortCell" onClick={sortByName}>
                Name
                {sort === "name" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                  <MdKeyboardArrowDown className="no-events"/>)}
              </div>
              <div className="tableHeaderSortCell" onClick={sortByUsername}>
                Username
                {sort === "username" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                  <MdKeyboardArrowDown className="no-events"/>)}
              </div>
              <div className="tableHeaderSortCell" onClick={sortByCreated}>
                Created
                {sort === "created" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                  <MdKeyboardArrowDown className="no-events"/>)}
              </div>
              <div className="tableHeaderSortCell" onClick={sortByActivated}>
                Active
                {sort === "active" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                  <MdKeyboardArrowDown className="no-events"/>)}
              </div>
              <div className="tableHeaderSortCell" onClick={sortByEmail}>
                Email
                {sort === "email" && (ascending ? <MdKeyboardArrowUp className="no-events"/> :
                  <MdKeyboardArrowDown className="no-events"/>)}
              </div>
            </div>
            {
              filteredSortedUsers
                .map((user) => (
                  <Link href={"administration/users/detail/"+user.id} className="users-tableRow tableRow tableData" key={user.id}>
                    <div>{user.firstname + " " + user.lastname}</div>
                    <div>{user.username}</div>
                    <div>{moment(user.createdAt).fromNow()}</div>
                    <div>{user.active ? "Yes" : "No"}</div>
                    <div>{user.email}</div>
                  </Link>
                ))
            }
          </div>
    </div>
  );
}
export default Users;
