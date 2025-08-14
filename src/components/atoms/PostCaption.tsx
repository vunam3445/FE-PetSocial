// PostCaption.tsx
import { CardContent, Typography, Link } from "@mui/material";

export const PostCaption = ({
  caption,
  maxChars,
  onExpand,
}: {
  caption: string;
  maxChars: number;
  onExpand: () => void;
}) => {
  if (!caption) return null;

  const isLong = caption.length > maxChars;
  const displayText = isLong ? caption.slice(0, maxChars) : caption;

  return (
    <CardContent sx={{ pt: 0, pb: 2 }}>
      <Typography
        variant="body1"
        sx={{ lineHeight: 1.6, whiteSpace: "pre-line" }}
      >
        {displayText}
        {isLong && "... "}
        {isLong && (
          <Link
            component="button"
            variant="body2"
            sx={{ ml: 1 }}
            onClick={(e) => {
              e.stopPropagation(); // tránh click vào Card gây mở ngoài ý muốn
              onExpand();
            }}
          >
            Xem thêm
          </Link>
        )}
      </Typography>
    </CardContent>
  );
};
