import * as React from "react";
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
import Auth from "../../utils/auth";
import { useLocation } from "react-router-dom";
import ShoppingCartModal from "../Shopping Cart/ShoppingCartModol";

function Header({ items, setItems, handleAddToCart, itemsInCart, setItemsInCart }) {
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "View cart", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const auth = new Auth();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    window.location.assign("/" + page);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = (event) => {
    event.preventDefault();
    auth.logout();
  };

  const renderOptions = (setting) => {
    if (setting === "Logout") {
      return (
        <Typography textAlign="center" onClick={(e) => logout(e)}>
          {setting}
        </Typography>
      );
    }

    if (setting === "View cart") {
      return (
        <ShoppingCartModal
          items={items}
          setItems={setItems}
          handleAddToCart={handleAddToCart}
          itemsInCart={itemsInCart}
          setItemsInCart={setItemsInCart}
        />
      );
    }
    return <Typography textAlign="center">{setting}</Typography>;
  };

  const navBar = (page) => {
    return (
      <Button
        key={page}
        onClick={() => handleCloseNavMenu(page)}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {page}
      </Button>
    );
  };

  const renderAvatar = () => {
    if (location.pathname === "/login") {
      return null;
    }

    if (!auth.getToken()) {
      return <a href="/login">Login</a>;
    }

    return (
      <>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <>{navBar(page)}</>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                {renderOptions(setting)}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </>
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            E-Designs
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {renderOptions()}
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            E-Designs
          </Typography>

          {renderAvatar()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
