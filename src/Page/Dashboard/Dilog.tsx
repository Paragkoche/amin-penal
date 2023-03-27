import {
  Button,
  Dialog,
  DialogActions,
  Snackbar,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { deleteVisitor } from "../../Api";

export default (props: any) => {
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const [pop, setPop] = React.useState(false);
  const [message, setMessage] = React.useState("");
  return (
    <>
      <TableRow hover key={props.id} onClick={() => setOpen((s) => !s)}>
        <TableCell>{props.name || ""}</TableCell>
        <TableCell>{props.email}</TableCell>
        <TableCell>
          {props.city || ""}, {props.state}, {props.country}
        </TableCell>
        <TableCell>{props.mobile_no}</TableCell>
      </TableRow>
      <Dialog
        open={open}
        style={{ padding: "20px" }}
        fullWidth={true}
        maxWidth="xl"
      >
        <Table style={{ padding: "20px" }}>
          <TableHead>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableHead>
          {Object.keys(props).map((v) => (
            <TableRow hover key={props["id"]}>
              <TableCell>{v}</TableCell>
              <TableCell>{props[v]}</TableCell>
            </TableRow>
          ))}
        </Table>

        <DialogActions>
          <Button onClick={() => setOpen((s) => !s)}>OK</Button>
          <Button
            color="error"
            onClick={() => {
              deleteVisitor(localStorage.getItem("token") || "", props.id)
                .then(
                  async (d) => {
                    var data = await d.json();
                    setMessage(data.message);
                    setPop((s) => !s);
                  },
                  async (d) => {
                    var data = await d.json();
                    setMessage(data.message);
                    setPop((s) => !s);
                  }
                )
                .finally(() => setOpen((s) => !s));
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={pop}
        onClose={() => setPop((a) => !a)}
        message={message}
        key={"Top" + "right"}
      />
    </>
  );
};
