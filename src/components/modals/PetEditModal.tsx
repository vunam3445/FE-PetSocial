import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";

import { PhotoCamera, Pets } from "@mui/icons-material";
import { useUpdatePet } from "../../hooks/profile/useUpdatePet";
interface PetEditModalProps {
  open: boolean;
  onClose: () => void;
  pet: {
    pet_id: string;
    avatar_url: string;
    name: string;
    type: string;
    breed: string;
    gender: string;
    birthday: string;
  };
  onUpdated? : ()=>void;
}

export const PetEditModal: React.FC<PetEditModalProps> = ({
  open,
  onClose,
  pet,
  onUpdated,
}) => {
  const [form, setForm] = useState({
    name: pet.name,
    type: pet.type,
    breed: pet.breed,
    gender: pet.gender,
    birthday: pet.birthday,
    avatarFile: null as File | null,
    avatarPreview: pet.avatar_url,
  });

  const { updatePet, loading, error } = useUpdatePet();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        avatarFile: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("_method", "PUT"); // Thêm dòng này
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("breed", form.breed);
    formData.append("gender", form.gender);
    formData.append("birthday", form.birthday);
    if (form.avatarFile) {
      formData.append("avatar_url", form.avatarFile);
    }

    updatePet(pet.pet_id, formData, () => {
      onUpdated?.();
      onClose(); // callback khi thành công
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textAlign: "center",
          py: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Pets sx={{ fontSize: 32 }} />
          <Typography variant="h4" component="div" fontWeight="700">
            Pet Information
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
          Add or update your pet's details
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Avatar Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "#f8f9ff",
                  borderRadius: 3,
                  border: "1px solid #e3e8ff",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  fontWeight="600"
                >
                  Pet Photo
                </Typography>

                {form.avatarPreview ? (
                  <Box
                    component="img"
                    src={form.avatarPreview}
                    alt="Pet"
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "20px auto",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "4px solid white",
                      boxShadow: "0 8px 24px rgba(102,126,234,0.15)",
                      display: "block",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "20px auto",
                      backgroundColor: "#e3e8ff",
                      border: "4px solid white",
                      boxShadow: "0 8px 24px rgba(102,126,234,0.15)",
                    }}
                  >
                    <Pets sx={{ fontSize: 48, color: "#667eea" }} />
                  </Avatar>
                )}

                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                      transform: "translateY(-1px)",
                      boxShadow: "0 6px 16px rgba(102,126,234,0.4)",
                    },
                  }}
                >
                  {pet.avatar_url ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
              </Paper>
            </Grid>

            {/* Form Fields */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Pet Name"
                    variant="outlined"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "#fafbff",
                        "&:hover": {
                          backgroundColor: "#f5f7ff",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Pet Type"
                    variant="outlined"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="e.g., Dog, Cat, Bird"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "#fafbff",
                        "&:hover": {
                          backgroundColor: "#f5f7ff",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Breed"
                    variant="outlined"
                    value={form.breed}
                    name="breed"
                    onChange={handleChange}
                    placeholder="e.g., Golden Retriever"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "#fafbff",
                        "&:hover": {
                          backgroundColor: "#f5f7ff",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Birthday"
                    type="date"
                    variant="outlined"
                    name="birthday"
                    value={form.birthday}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "#fafbff",
                        "&:hover": {
                          backgroundColor: "#f5f7ff",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "white",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        fontWeight: 500,
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
            borderColor: "#e0e0e0",
            color: "#666",
            "&:hover": {
              borderColor: "#ccc",
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(102,126,234,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              transform: "translateY(-1px)",
              boxShadow: "0 6px 16px rgba(102,126,234,0.4)",
            },
          }}
        >
          Save Pet Info
        </Button>
      </DialogActions>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </Dialog>
  );
};
