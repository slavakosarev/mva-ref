import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Entry } from "../Button";
import { NavLink } from "react-router-dom";
import logo from "../images/logo_orange_little.png";
import "./Header.css";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { ChakraProvider } from "@chakra-ui/react";
import { Box as BoxSwitcher, useColorMode } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../Switcher/ColorModeSwitcher";
import { PrimarySearchAppBar } from "./PrimarySearchAppBar";
import { PropsHeader } from "./HeaderProps";
import { useState } from "react";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */

  children: React.ReactElement;
}

const drawerWidth = 240;
const navItems = [
  { name: "Главная", link: "/" },
  { name: "О нас", link: "/aboutus" },
  { name: "Услуги", link: "/services" },
  { name: "Подарки", link: "/gifts" },
];

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export function HeaderPublic(props: PropsHeader) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const { colorMode } = useColorMode();

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", width: "100%" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Меню
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} href={item.link}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem key={"выход"} disablePadding>
        <ListItemButton sx={{ textAlign: "center" }}>
          <ListItemText primary={"выход"} />
        </ListItemButton>
      </ListItem>
      <Entry />
      <ChakraProvider>
        <BoxSwitcher py={2} bg={colorMode === "dark" ? "gray.600" : "none"}>
          <ColorModeSwitcher bg="none" />
        </BoxSwitcher>
      </ChakraProvider>
    </Box>
  );

  return (
    <Box sx={{ boxSizing: "border-box" }}>
      <HideOnScroll {...props}>
        <AppBar
          component="nav"
          color="transparent"
          sx={{
            borderBottomStyle: 0,
            backdropFilter: "blur(4px)",
            boxSizing: "border-box",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              width: "100%",
              boxSizing: "border-box",
              justifyContent: { xs: "end", sm: "center" },
              flexGrow: 1,
              height: 128,
            }}
          >
            <Box
              component={NavLink}
              to={"/"}
              title="Home"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <img src={logo} alt="Our Wishlist Logo" />
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexGrow: 1,
                justifyContent: { xs: "end", sm: "center" },
              }}
            >
              {navItems.map((item: any) => (
                <NavLink
                  key={item.name}
                  to={item.link}
                  className="header_wrap-main-nav"
                >
                  {item.name}
                </NavLink>
              ))}
            </Box>
            <IconButton
              size="large"
              color="warning"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { xs: "flex", sm: "none" } }}
            >
              <MenuIcon sx={{ height: 40, width: 40 }} />
            </IconButton>
            <Box
              sx={{
                flexGrow: 0,
                ml: "auto",
                display: { xs: "none", sm: "flex" },
              }}
            >
              <Entry />
              <ChakraProvider>
                <BoxSwitcher
                  py={2}
                  bg={colorMode === "dark" ? "gray.600" : "none"}
                >
                  <ColorModeSwitcher bg="none" />
                </BoxSwitcher>
              </ChakraProvider>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar sx={{ boxSizing: "border-box" }} />
      <Box component="nav" sx={{ width: "unset" }}>
        <Drawer
          anchor="right"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar sx={{ boxSizing: "border-box" }} />
      </Box>
    </Box>
  );
}

export function Header({ session }: PropsHeader) {
  if (session) {
    return <PrimarySearchAppBar session={session} />;
  } else {
    return <HeaderPublic session={session} />;
  }
}
