import { Box, ButtonBase, Divider, Drawer, SvgIcon } from "@mui/material";
import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import Stack from "@mui/material/Stack";

import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import SimpleBar from "simplebar-react";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import React, { Children } from "react";
import { useLocation } from "react-router-dom";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import CartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
const Scrollbar = styled(SimpleBar)``;
export default ({ children }: { children: React.ReactNode }) => {
  const pathname = useLocation();
  const [open, setOpen] = React.useState(false);

  //   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed">
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{
              minHeight: 64,
              px: 2,
            }}
          >
            <Stack alignItems="center" direction="row" spacing={2}>
              <Stack alignItems="center" direction="row" spacing={2}>
                <IconButton color="inherit" onClick={() => setOpen((s) => !s)}>
                  <SvgIcon fontSize="small">
                    <Bars3Icon />
                  </SvgIcon>
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </AppBar>
      </Box>

      <Drawer
        onBlur={() => setOpen((s) => !s)}
        anchor="left"
        open={open}
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="temporary"
      >
        <Scrollbar
          sx={{
            height: "100%",
            "& .simplebar-content": {
              height: "100%",
            },
            "& .simplebar-scrollbar:before": {
              background: "neutral.400",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  height: 100,
                  width: "100%",
                }}
              >
                <Link to="/">
                  <img src="/Logo.png" width="100%" />
                </Link>
              </Box>
            </Box>
            <Divider sx={{ borderColor: "neutral.700" }} />
            <Box
              component="nav"
              sx={{
                flexGrow: 1,
                px: 2,
                py: 3,
              }}
            >
              <Stack
                component="ul"
                spacing={0.5}
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                }}
              >
                {[
                  {
                    title: "Dashboard",
                    path: "/",
                    icon: (
                      <SvgIcon fontSize="small">
                        <ChartBarIcon />
                      </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                  },
                  {
                    title: "Exhibitors",
                    path: "/exhibitors",
                    icon: (
                      <SvgIcon fontSize="small">
                        <UsersIcon />
                      </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                  },
                  {
                    title: "Visitors",
                    path: "/visitors",
                    icon: (
                      <SvgIcon fontSize="small">
                        <UsersIcon />
                      </SvgIcon>
                    ),
                    disabled: false,
                    external: false,
                  },
                  // {
                  //   title: "Stall",
                  //   path: "/Stall",
                  //   disabled: false,
                  //   external: false,
                  //   icon: (
                  //     <SvgIcon fontSize="small">
                  //       <CartIcon />
                  //     </SvgIcon>
                  //   ),
                  // },
                ].map((item) => {
                  const active = item.path
                    ? pathname.pathname === item.path
                    : false;
                  const { disabled, external, icon, path, title } = item;
                  const linkProps = path
                    ? external
                      ? {
                          component: Link,
                          to: path,
                          target: "_blank",
                        }
                      : {
                          component: Link,
                          to: path,
                        }
                    : {};
                  return (
                    <li>
                      <ButtonBase
                        sx={{
                          alignItems: "center",
                          borderRadius: 1,
                          display: "flex",
                          justifyContent: "flex-start",
                          pl: "16px",
                          pr: "16px",
                          py: "20px",
                          textAlign: "left",
                          width: "100%",
                          ...(active && {
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                          }),
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                          },
                        }}
                        {...linkProps}
                      >
                        {icon && (
                          <Box
                            component="span"
                            sx={{
                              alignItems: "center",
                              color: "neutral.400",
                              display: "inline-flex",
                              justifyContent: "center",
                              mr: 2,
                              ...(active && {
                                color: "primary.main",
                              }),
                            }}
                          >
                            {icon}
                          </Box>
                        )}
                        <Box
                          component="span"
                          sx={{
                            color: "neutral.400",
                            flexGrow: 1,
                            fontFamily: (theme) => theme.typography.fontFamily,
                            fontSize: 14,
                            fontWeight: 600,
                            lineHeight: "24px",
                            whiteSpace: "nowrap",
                            ...(active && {
                              color: "common.white",
                            }),
                            ...(disabled && {
                              color: "neutral.500",
                            }),
                          }}
                        >
                          {title}
                        </Box>
                      </ButtonBase>
                    </li>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Scrollbar>
      </Drawer>
      <Box
        sx={{
          pt: "64px",
        }}
      >
        {children}
      </Box>
    </>
  );
};
