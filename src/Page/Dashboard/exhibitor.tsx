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
import Dilog2 from "./Dilog.2";

export const CustomersTable = () => {
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");

  const [exhibitor, setExhibitor] = React.useState<any[]>([{}]);
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
  const refreshData = () => {
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
  };
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
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exhibitor.map((customer: any) => {
                const isSelected = false;
                // const createdAt = format(customer.createdAt, "dd/MM/yyyy");

                return <Dilog2 {...customer} refresh={refreshData} />;
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default CustomersTable;
