import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Close, Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import { useChangePassword } from "../../hooks/auth/useChangePassword";
import { useNavigate } from "react-router-dom";
interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  // 1. Lấy userId từ store (hoặc từ props tùy logic của bạn)
  const userId = localStorage.getItem('user_id');
  
  // 2. Sử dụng hook
  const { handleChangePassword, isLoading, error, isSuccess, resetStatus } = useChangePassword();

  const [showPasswords, setShowPasswords] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "", // Đổi tên key cho khớp với backend Laravel
    new_password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setFormData({ old_password: "", new_password: "", confirm_password: "" });
    resetStatus();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate nhanh tại client
    if (formData.new_password !== formData.confirm_password) {
      return; // Error message sẽ hiển thị thông qua logic confirmation bên dưới
    }

    try {
      if (!userId) return;
      
      await handleChangePassword(userId, formData);
      
      // Nếu thành công, có thể đóng modal sau 1.5 giây để user kịp thấy message thành công
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, 1500);
    } catch (err) {
      // Lỗi đã được hook xử lý vào biến `error`
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="change-password-title">
      <Box sx={style}>
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LockOutlined color="primary" />
            <Typography id="change-password-title" variant="h6" fontWeight={700}>
              Đổi mật khẩu
            </Typography>
          </Stack>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Stack>

        {/* Thông báo trạng thái */}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {isSuccess && <Alert severity="success" sx={{ mb: 2 }}>Đổi mật khẩu thành công!</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Mật khẩu hiện tại"
              name="old_password"
              type={showPasswords ? "text" : "password"}
              value={formData.old_password}
              onChange={handleChange}
              required
            />

            <TextField
              fullWidth
              label="Mật khẩu mới"
              name="new_password"
              type={showPasswords ? "text" : "password"}
              value={formData.new_password}
              onChange={handleChange}
              required
              error={formData.new_password.length > 0 && formData.new_password.length < 6}
              helperText={formData.new_password.length > 0 && formData.new_password.length < 6 ? "Tối thiểu 6 ký tự" : ""}
            />

            <TextField
              fullWidth
              label="Xác nhận mật khẩu mới"
              name="confirm_password"
              type={showPasswords ? "text" : "password"}
              value={formData.confirm_password}
              onChange={handleChange}
              required
              error={formData.confirm_password !== "" && formData.new_password !== formData.confirm_password}
              helperText={formData.confirm_password !== "" && formData.new_password !== formData.confirm_password ? "Mật khẩu không khớp" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPasswords(!showPasswords)} edge="end">
                      {showPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ pt: 1 }}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading || isSuccess}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.2,
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Cập nhật mật khẩu"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};