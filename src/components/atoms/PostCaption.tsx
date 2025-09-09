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

  // Tách caption thành mảng text + hashtag
  const parts = displayText.split(/(#[\p{L}0-9_]+)/u); 
  // Regex này sẽ bắt #kytu, hỗ trợ cả tiếng Việt (nhờ flag `u` và \p{L})

  return (
    <CardContent sx={{ pt: 0, pb: 2 }}>
      <Typography
        variant="body1"
        sx={{ lineHeight: 1.6, whiteSpace: "pre-line" }}
        component="div"
      >
        {parts.map((part, index) =>
          part.startsWith("#") ? (
            <Link
              key={index}
              href={`/tags/${part.substring(1)}`} // điều hướng theo tag
              underline="hover"
              color="primary"
              sx={{ fontWeight: 500 }}
              onClick={(e) => e.stopPropagation()} // tránh click vào card
            >
              {part}
            </Link>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
        {isLong && "... "}
        {isLong && (
          <Link
            component="button"
            variant="body2"
            sx={{ ml: 1 }}
            onClick={(e) => {
              e.stopPropagation();
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
