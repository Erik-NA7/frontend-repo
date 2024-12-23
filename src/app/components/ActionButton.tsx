"user client";
import { Button } from "@mui/material";

export default function ActionButton({ handler, children }:
  {
    handler: () => void,
    children: React.ReactNode
}) {
  const onButtonClick = () => {
    handler();
  }

  return (
    <Button
      onClick={onButtonClick}
      variant="contained"
      sx={{ marginTop: 2 }}
    >
      { children }
    </Button>
  )
}