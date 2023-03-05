"use client"
import React from 'react'
import {Button, Grid, IconButton, Tooltip} from "@mui/material";
import Link from "next/link";
import {MdEdit, MdHighlightOff} from "react-icons/md";

export default function Home() {
    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-blue-500">Using Material UI with Next.js 13</h1>
            <h4 className="text-red-500">(with Tailwind CSS)</h4>
            <div className="flex gap-2 items-center">
                <Button variant="text" className="text-red-500">
                    Text
                </Button>
                <Button variant="contained">Contained</Button>
                <Button variant="outlined">Outlined</Button>
                <Link href="/administration/users" passHref>
                    <Button variant="contained" color="secondary">Users</Button>
                </Link>
                <Tooltip title="Delete">
                    <IconButton>
                        <MdHighlightOff className="larger"/>Delete
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    )
}
