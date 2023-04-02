import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import {
  ConformExhibitor,
  deleteExhibitor,
  deleteVisitor,
  disapproveExhibitor,
} from "../../Api";
import { useNavigate } from "react-router-dom";

const D = (props: any) => {
  return (
    <Dialog open={props.open_confirm}>
      <DialogTitle>{props.title_confirm}</DialogTitle>
      <DialogContent>{props.message_confirm}</DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            props
              .Yes()
              .then(
                async (d: any) => {
                  var data = await d.json();
                  props.setMessage(data.message);
                  props.setPop((s: any) => !s);
                },
                async (d: any) => {
                  var data = await d.json();
                  props.setMessage(data.message);
                  props.setPop((s: any) => !s);
                }
              )
              .finally(() => {
                props.refresh();
                props.No();
                // props.setSnackbar((s: any) => !s);
              })
          }
        >
          Yes
        </Button>
        <Button onClick={() => props.No()}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default (props: any) => {
  const navigate = useNavigate();
  console.log(props);
  const [open, setOpen] = React.useState(false);
  const [pop, setPop] = React.useState(false);
  const [open_confirm, setOpenConfirm] = React.useState(false);
  const [message_confirm, setMessageConfirm] = React.useState("");
  const [title_confirm, setTitleConfirm] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [yes, setYes] = React.useState(() => {});
  return (
    <>
      <TableRow key={props.id}>
        <TableCell
          onClick={() => setOpen((s) => !s)}
          style={{ cursor: "pointer" }}
        >
          {props.company_repName || ""}
        </TableCell>
        <TableCell>{props.email}</TableCell>
        <TableCell>{props.company_name}</TableCell>
        <TableCell>{props.mobile_no}</TableCell>
        <TableCell>
          {props.is_confirmed == 0 ? (
            <Button
              color="warning"
              onClick={async () => {
                setYes(
                  () => () =>
                    ConformExhibitor(
                      localStorage.getItem("token") || "",
                      props.id
                    )
                );

                setOpenConfirm(true);
                setTitleConfirm("Alert");
                setMessageConfirm(
                  `Do you want to confirm the details of ${props.company_repName}, the exhibitor ?`
                );
              }}
            >
              Confirm
            </Button>
          ) : props.stall.length == 0 ? (
            <Button
              color="warning"
              onClick={async () => {
                setYes(() => () => navigate("/stall/" + props.id));

                setOpenConfirm(true);
                setTitleConfirm("Alert");
                setMessageConfirm(
                  `Do you want to confirm the details of ${props.company_repName}, the exhibitor ?`
                );
              }}
            >
              Assign Stall
            </Button>
          ) : (
            <Button
              color="warning"
              onClick={async () => {
                setYes(() => () => navigate("/stall/update/" + props.id));

                setOpenConfirm(true);
                setTitleConfirm("Alert");
                setMessageConfirm(
                  `Do you want to confirm the details of ${props.company_repName}, the exhibitor ?`
                );
              }}
            >
              Update Stall
            </Button>
          )}
          <Button
            color="error"
            onClick={async () => {
              setYes(
                () => () =>
                  disapproveExhibitor(
                    localStorage.getItem("token") || "",
                    props.id
                  )
              );

              setOpenConfirm(true);
              setTitleConfirm("Alert");
              setMessageConfirm(
                `Are you sure you want to disapprove the details of this exhibitor?`
              );
            }}
          >
            Disapprove
          </Button>
          <Button
            color="error"
            onClick={async () => {
              setYes(
                () => () =>
                  deleteExhibitor(localStorage.getItem("token") || "", props.id)
              );

              setOpenConfirm(true);
              setTitleConfirm("Alert");
              setMessageConfirm(
                `Are you sure you want to delete the details of this exhibitor?`
              );
            }}
          >
            Delete
          </Button>
        </TableCell>
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
          {[
            "company_repName",
            "mobile_no",
            "address_line1",
            "address_line2",
            "address_line3",
            "designation",
            "city",
            "state",
            "country",
            "pro_category",
            "is_confirmed",
          ].map((v: any) =>
            v != "password" && v != "refresh" ? (
              v != "stall" ? (
                <TableRow hover key={props["id"]}>
                  <TableCell>{v}</TableCell>
                  <TableCell>{props[v]}</TableCell>
                </TableRow>
              ) : (
                <></>
              )
            ) : (
              <></>
            )
          )}
          {/* {props.stall.map((stall: any) =>
            Object.keys(stall).map((v) => (
              <TableRow hover key={stall["id"]}>
                <TableCell>stall_{v}</TableCell>
                <TableCell>{stall[v]}</TableCell>
              </TableRow>
            ))
          )} */}
        </Table>

        <DialogActions>
          <Button onClick={() => setOpen((s) => !s)}>Close</Button>
        </DialogActions>
      </Dialog>
      <D
        message_confirm={message_confirm}
        open_confirm={open_confirm}
        title_confirm={title_confirm}
        Yes={yes}
        No={() => setOpenConfirm(false)}
        setOpen={setOpenConfirm}
        refresh={props.refresh}
        setMessage={setMessage}
        setPop={setPop}
      />
      <Snackbar
        onBlur={() => setOpen((s) => !s)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={pop}
        onClose={() => setPop((a) => !a)}
        message={message}
        key={"Top" + "right"}
      />
    </>
  );
};
