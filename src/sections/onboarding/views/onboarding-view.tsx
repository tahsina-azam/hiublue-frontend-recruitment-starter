'use client';

import AppBar from "@/components/layout/AppBar";
import Sidebar from "@/components/layout/SideBar";
import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import OfferForm from "@/components/common/OfferForm";

export default function OnboardingView() {
   const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
  return <><Box>
    <CssBaseline/>
    <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
    <OfferForm/>
    </Box></>;
}
