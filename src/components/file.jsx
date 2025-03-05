"use client";

import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";

const pages = [
  { name: "HomePage", link: "/" },
  { name: "About Us", link: "/about" },
  { name: "Events", link: "/event" },
  { name: "Profile", link: "/profile" },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#4C585B" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src="/logo/header-logo.png"
            alt="Local Skills Hub"
            width={60}
            height={60}
            className="rounded-lg object-cover hidden md:flex mr-1"
          />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Local Skills Hub
          </Typography>
          {/* Responsive Menu for smaller screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              id="menu-button"
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              aria-labelledby="menu-button"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name}>
                  <Link href={page.link} passHref>
                    <Typography sx={{ textAlign: "center" }}>
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo or App Name */}
          <Image
            src="/logo/header-logo.png"
            alt="Local Skills Hub"
            width={60}
            height={60}
            className="rounded-lg object-cover flex md:hidden mr-1"
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Local Skills Hub
          </Typography>

          {/* Navigation buttons for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "#D1E2EB",
                  display: "block",
                  "&:hover": {
                    color: "#508c9b",
                  },
                }}
              >
                <Link href={page.link} passHref>
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>
          {/* User Action (Sign In, Sign Up or User Profile) */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User Actions">
              <SignedOut>
                <SignInButton className="bg-[#134b70] text-white px-4 py-2 rounded-lg hover:bg-[#508c9b] hover:scale-105 transition duration-300 cursor-pointer">
                  Sign In
                </SignInButton>
                <SignUpButton className="bg-[#134b70] text-white px-4 py-2 rounded-lg hover:bg-[#508c9b] hover:scale-105 transition duration-300 cursor-pointer">
                  Sign Up
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton className="cursor-pointer" />
              </SignedIn>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
