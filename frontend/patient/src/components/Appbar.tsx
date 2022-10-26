import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { signOut } from "../services/session";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const LANDING_PAGE_URL = "/";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#052b6c",
    },
  },
});

function Profile({ user, setUser }: { user: any; setUser: Function }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate(LANDING_PAGE_URL);
    handleClose();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Typography>{user.accessToken.payload.username}</Typography>
      <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
    </>
  );
}

export default function CustomAppBar({
  user,
  setUser,
}: {
  user: any;
  setUser: Function;
}) {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar
        sx={{
          marginBottom: "20px",
        }}
        position="static"
        color="transparent"
        enableColorOnDark
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { md: "flex" },
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            <Typography variant='h6' sx={{ml: 1}}>Clinic Appointment</Typography>
          </Typography>

          {user ? (
            <Profile user={user} setUser={setUser} />
          ) : (
            <Button href="/" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
