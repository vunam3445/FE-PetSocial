import { TextField } from "@mui/material";
interface PostTextInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
}
export const PostTextInput: React.FC<PostTextInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <TextField
      multiline
      minRows={3}
      maxRows={8}
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="standard"
      InputProps={{
        disableUnderline: true,
        sx: {
          fontSize: "1.5rem",
          color: "#1c1e21",
          lineHeight: 1.3,
          "& textarea": {
            resize: "none",
          },
          "&::placeholder": {
            color: "#65676b",
            opacity: 1,
          },
        },
      }}
      sx={{ mb: 2 }}
    />
  );
};
