'use client';

import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import AppBar from "@/components/layout/AppBar";
import Sidebar from "@/components/layout/SideBar";

export default function DashboardView() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  );
}