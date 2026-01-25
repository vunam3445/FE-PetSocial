import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  CircularProgress,
} from '@mui/material';
import api from "../../lib/axios";
import ErrorToast from "../toasts/ErrorToast";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 400 },
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const genderOptions = [
  { value: 'male', label: 'Đực' },
  { value: 'female', label: 'Cái' },
  { value: 'unknown', label: 'Chưa rõ' },
];

const initialForm = {
  name: '',
  type: '',
  breed: '',
  gender: '',
  birthday: '',
  avatar_url: null,
};

export const CreatePetModal = ({ open, handleClose, handleCreate }: { 
  open: boolean; 
  handleClose: () => void; 
  handleCreate: (data: any) => void; 
}) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ open: false, message: '' });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    try {
      const response = await api.post("/pets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      handleCreate(response.data.pet);
      setForm(initialForm); // Reset form sau khi thành công
      handleClose();
    } catch (err: any) {
      console.error("Error creating pet", err);
      setError({
        open: true,
        message: err.response?.data?.message || "Không thể tạo thú cưng. Vui lòng thử lại!"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal open={open} onClose={!loading ? handleClose : undefined}>
        <Box sx={style} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" mb={2} fontWeight="bold">
            Thêm thú cưng mới
          </Typography>

          <TextField
            label="Tên thú cưng"
            name="name"
            fullWidth
            margin="dense"
            value={form.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Loại (VD: Chó, Mèo...)"
            name="type"
            fullWidth
            margin="dense"
            value={form.type}
            onChange={handleChange}
            required
          />

          <TextField
            label="Giống loài"
            name="breed"
            fullWidth
            margin="dense"
            value={form.breed}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="dense" required>
            <InputLabel>Giới tính</InputLabel>
            <Select
              name="gender"
              value={form.gender}
              label="Giới tính"
              onChange={handleChange}
            >
              {genderOptions.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Ngày sinh"
            name="birthday"
            type="date"
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            value={form.birthday}
            onChange={handleChange}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mt: 2, mb: 1, textTransform: 'none' }}
          >
            {form.avatar_url ? (form.avatar_url as File).name : "Chọn ảnh đại diện"}
            <input
              type="file"
              name="avatar_url"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button 
              variant="text" 
              fullWidth 
              onClick={handleClose}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? "Đang tạo..." : "Tạo ngay"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <ErrorToast 
        open={error.open} 
        text={error.message} 
        onClose={() => setError({ ...error, open: false })} 
      />
    </>
  );
};