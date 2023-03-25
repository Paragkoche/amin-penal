import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Card, CardHeader } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Link from "@mui/material/Link";

import TextField from "@mui/material/TextField";
import { Login } from "../../Api";
import React from "react";
export default () => {
  const [fromData, setFromData] = React.useState({
    email: "",
    password: "",
  });
  const [load, setLoad] = React.useState(false);
  const [error, setError] = React.useState<{
    email: string | null;
    password: string | null;
  }>({
    password: null,
    email: null,
  });
  console.log(fromData);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        background: "#6366F1",
      }}
    >
      <Card>
        <CardContent>
          <img src="/Logo.png" width="200" />
          <Typography variant="h4" sx={{ m: 1 }} textAlign={"center"}>
            Login
          </Typography>

          {load ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "20px 0px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                setLoad(true);
                e.preventDefault();
                Login(fromData)
                  .then(async (e) => {
                    let es = await e.json();
                    if (es.status) {
                      localStorage.setItem("token", es.token);
                      window.location.reload();
                    } else {
                      setError({
                        password:
                          (es.message as string).indexOf("Password") != -1
                            ? (es.message as string)
                            : null,
                        email:
                          (es.message as string).indexOf("Email") != -1
                            ? (es.message as string)
                            : null,
                      });
                    }
                  })
                  .finally(() => {
                    setLoad(false);
                  });
              }}
              noValidate
              style={{ padding: "20px" }}
            >
              <Stack spacing={3}>
                <TextField
                  error={error.email != null}
                  fullWidth
                  helperText={error.email}
                  label="Email Address"
                  name="email"
                  // onBlur={formik.handleBlur}
                  onChange={(e) =>
                    setFromData((s) => ({ ...s, email: e.target.value }))
                  }
                  type="email"
                  value={fromData.email}
                />
                <TextField
                  style={{ outline: "none" }}
                  error={error.password != null}
                  fullWidth
                  helperText={error.password}
                  label="Password"
                  name="password"
                  onChange={(e) =>
                    setFromData((s) => ({
                      ...s,
                      password: e.target.value,
                    }))
                  }
                  // onBlur={formik.handleBlur}
                  // onChange={formik.handleChange}
                  type="password"
                  value={fromData.password}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
