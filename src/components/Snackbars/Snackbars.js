import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

export default function DirectionSnackbar() {
  let [authMode] = useState("signin");

  function TransitionUp(props) {
    console.log(authMode);
    if (authMode === "signin") {
      return <Slide {...props} direction="up" />;
    }
  }

  const [open, setOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  TransitionUp();

  const handleClick = (Transition) => () => {
    setTransition(() => Transition);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick(TransitionUp)}>Up</Button>
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={transition}
        message="I love snacks"
        key={transition ? transition.name : ""}
      />
    </div>
  );
}
