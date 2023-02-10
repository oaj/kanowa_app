"use client"
import React from 'react'
import {Button, Grid, IconButton, Stack, Tooltip} from "@mui/material";
import Link from "next/link";
import {MdEdit, MdHighlightOff} from "react-icons/md";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
    return (
      <Grid container height="80%" alignItems="center" justifyContent="center" direction="column">
          <h1 className="text-blue-500">Using Material UI with Next.js 13</h1>
          <h4 className="text-red-500">(with Tailwind CSS)</h4>
          <Stack direction="row" columnGap={1}>
              <Button variant="text" className="text-red-500">
                  Text
              </Button>
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Tooltip title="Edit" placement="top-end">
                  <MdEdit className="larger"/>
              </Tooltip>

              <Link href="/administration/users" passHref>
                  <Button variant="contained" color="secondary">Users</Button>
              </Link>
              <Tooltip title="Delete">
                  <IconButton>
                      <MdHighlightOff className="larger" />Delete
                  </IconButton>
              </Tooltip>
          </Stack>
          {/*<div style={{backgroundColor: "blue"}}>*/}
          <Stack direction="row" alignItems="center" columnGap={1}>
              <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="delete" size="small">
                  <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete" size="large">
                  <DeleteIcon />
              </IconButton>
              <IconButton aria-label="delete" size="large">
                  <DeleteIcon fontSize="inherit" />
              </IconButton>
          </Stack>
          {/*</div>*/}
      </Grid>
  )
}
