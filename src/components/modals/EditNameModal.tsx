import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

import api from "../../lib/axios";
import { useParams } from "react-router-dom";

// Props interface for the EditNameModal component
interface EditNameModalProps {
  open: boolean;
  onClose: () => void;
  currentName: string;
  onChange: (newName: string) => void;
}

// EditNameModal functional component
const EditNameModal: React.FC<EditNameModalProps> = ({
  open,
  onClose,
  currentName,
  onChange,
}) => {
  const [username, setUsername] = useState<string>(currentName || "");
  const [error, setError] = useState<string>("");
  const { id } = useParams();
  // Reset username when modal opens with new currentName

  // Handle save action with validation
  const handleSave = async () => {
    // Basic validation
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (username.trim().length > 20) {
      setError("Username must be less than 20 characters");
      return;
    }
    const formData = new FormData();
    formData.append("name", username);
    try {
      const res = await api.post(`/users/${id}/updateProfile`, formData);
      if (res.status === 200) {
        localStorage.setItem('user_name',username);
        onChange(username.trim());
        onClose();
      }
    } catch (error) {
      setError("Failed to update username. Please try again.");
      console.log(error);
    }

    // Call onSave with the new username
    onClose();
  };

  // Handle cancel action
  const handleCancel = (): void => {
    setUsername(currentName || "");
    setError("");
    onClose();
  };

  // Handle keyboard shortcuts
  const handleKeyPress = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      handleSave();
    }
    if (event.key === "Escape") {
      handleCancel();
    }
  };

  // Handle input change
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUsername(event.target.value);
    setError(""); // Clear error when user types
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          padding: "8px",
          minHeight: "280px",
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 600,
          fontSize: "1.5rem",
          color: "#333",
          paddingBottom: "8px",
        }}
      >
        Chỉnh sửa tên người dùng
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            autoFocus
            fullWidth
            label="Tên"
            variant="outlined"
            value={username}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            error={!!error}
            helperText={error || "Nhập tên mới( tối thiểu 3, tối đa 20 ký tự"}
            sx={{
              mt: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            inputProps={{
              maxLength: 20,
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2, gap: 1 }}>
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="inherit"
          sx={{
            minWidth: "80px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 24px",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={!username.trim() || username.trim() === currentName}
          sx={{
            minWidth: "80px",
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 24px",
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditNameModal;
