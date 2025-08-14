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
} from '@mui/material';
import api from "../../lib/axios";
 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const genderOptions = ['male', 'female', 'unknown'];

export const CreatePetModal = ({ open, handleClose, handleCreate }: { open: boolean; handleClose: () => void; handleCreate: (data: any) => void; }) => {
  const [form, setForm] = useState({
    name: '',
    type: '',
    breed: '',
    gender: '',
    birthday: '',
    avatar_url: null,
  });



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };


 const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("type", form.type);
  formData.append("breed", form.breed);
  formData.append("gender", form.gender);
  formData.append("birthday", form.birthday);
  formData.append("avatar_url", form.avatar_url); // Đây là File

  api.post("/pets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => {
      handleCreate(response.data.pet);
    })
    .catch((error) => {
      console.error("Error creating pet", error);
    })
    .finally(() => {
      handleClose();
    });
};


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>
          Create Pet
        </Typography>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={form.name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Type"
          name="type"
          fullWidth
          margin="normal"
          value={form.type}
          onChange={handleChange}
          required
        />
        <TextField
          label="Breed"
          name="breed"
          fullWidth
          margin="normal"
          value={form.breed}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={form.gender}
            label="Gender"
            onChange={handleChange}
            required
          >
            {genderOptions.map((option) => (
              <MenuItem value={option} key={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Birthday"
          name="birthday"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={form.birthday}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Upload Avatar
          <input
            type="file"
            name="avatar_url"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create
        </Button>
      </Box>
    </Modal>
  );
}