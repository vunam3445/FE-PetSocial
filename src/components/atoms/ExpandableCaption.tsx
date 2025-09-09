import { useState } from "react";
import { Typography } from "@mui/material";

export default function ExpandableCaption({
  caption,
  maxLength = 200,
}: {
  caption: string;
  maxLength?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = caption.length > maxLength;

  if (!shouldTruncate) {
    return <Typography variant="body1">{caption}</Typography>;
  }

  return (
    <Typography variant="body1">
      {isExpanded ? caption : `${caption.substring(0, maxLength)}...`}
      <Typography
        component="span"
        sx={{
          color: "primary.main",
          cursor: "pointer",
          fontWeight: 500,
          ml: 0.5,
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? " See less" : " See more"}
      </Typography>
    </Typography>
  );
}
