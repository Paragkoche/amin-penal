import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import { styled, useTheme } from "@mui/material/styles";
const Scrollbar = styled(SimpleBar)``;
const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getAllExhibitor, getAllVisitor } from "../../Api";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export const CustomersTable = () => {
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");

  const [exhibitor, setExhibitor] = React.useState<any[]>([]);
  const [loding, setLoading] = React.useState(true);
  const theme = useTheme();
  React.useEffect(() => {
    getAllExhibitor(token)
      .then(
        async (data) => {
          let d = await data.json();
          setExhibitor(d.data.rows);
        },
        (e) => {
          console.log(e);
        }
      )
      .finally(() => setLoading(false));
  }, []);
  const {
    count = 0,

    onPageChange = () => {},
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = {};

  const selectedSome =
    selected.length > 0 && selected.length < exhibitor.length;
  const selectedAll =
    exhibitor.length > 0 && selected.length === exhibitor.length;
  console.log(exhibitor);

  return loding ? (
    <CircularProgress />
  ) : (
    <Card style={{ margin: "100px 0 0 20px " }}>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                      } else {
                      }
                    }}
                  />
                </TableCell>

                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Signed Up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exhibitor.map((customer) => {
                const isSelected = false;
                // const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>

                    <TableCell>{customer.email}</TableCell>
                    <TableCell>
                      {customer.city || ""}, {customer.state},{" "}
                      {customer.country}
                    </TableCell>
                    <TableCell>{customer.mobile_no}</TableCell>
                    <TableCell>{customer.createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default CustomersTable;
