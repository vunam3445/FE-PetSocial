import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  CircularProgress,
  styled,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  Timeline as MetricIcon,
  Notes as NoteIcon,
} from "@mui/icons-material";

// --- Styled Components cho giao diện hiện đại ---
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  backgroundColor: "#fff",
  borderRadius: 24,
  boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
  outline: "none",
  overflow: "hidden",
}));

const ImageUploadBox = styled(Box)(({ theme }) => ({
  border: "2px dashed #ccc",
  borderRadius: 16,
  height: 150,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundColor: "#fafafa",
  transition: "all 0.3s",
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: "rgba(25, 118, 210, 0.04)",
  },
}));

// --- Types ---
export interface LogFormData {
  title: string;
  description: string | null;
  value: string | null;
  recorded_at: string;
  image_file?: File | null;
}

interface AddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  categoryType?: "metric" | "note" | "event" | "schedule";
  onSaveLog: (data: LogFormData) => void;
  isSaving: boolean;
}

export const AddLogModal: React.FC<AddLogModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  categoryType = "note",
  onSaveLog,
  isSaving,
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [recordedAt, setRecordedAt] = useState(today);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    if (!isOpen) {
      setRecordedAt(today);
      setValue("");
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setErrors({});
    }
  }, [isOpen]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
   // 1. Kiểm tra ngày tương lai
    if (recordedAt > today) {
      newErrors.recordedAt = "Ngày ghi nhận không được vượt quá ngày hiện tại";
    }

    // 2. CHỈ kiểm tra value nếu là loại metric ✅
    if (categoryType === "metric") {
      if (!value.trim()) {
        newErrors.value = "Vui lòng nhập giá trị đo lường";
      } else if (isNaN(Number(value))) {
        newErrors.value = "Giá trị phải là một con số (ví dụ: 5.5, 10)";
      }
    }

    // 3. Kiểm tra title cho event/schedule
    if (
      (categoryType === "event" || categoryType === "schedule") &&
      !title.trim()
    ) {
      newErrors.title = "Tên sự kiện không được để trống";
    }

    // 4. Kiểm tra description cho note
    if (categoryType === "note" && !description.trim()) {
      newErrors.description = "Nội dung ghi chú không được để trống";
    }

    // Nếu có lỗi thì set state và dừng lại
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; 
    }
    onSaveLog({
      title:
        categoryType === "metric" || categoryType === "note"
          ? categoryName
          : title,
      description: description || null,
      value: categoryType === "metric" ? value : null,
      recorded_at: recordedAt,
      image_file: imageFile,
    });
  };

  const renderIcon = () => {
    switch (categoryType) {
      case "metric":
        return <MetricIcon color="primary" />;
      case "event":
        return <EventIcon color="warning" />;
      default:
        return <NoteIcon color="action" />;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition>
      <ModalContainer>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#fcfcfc",
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            {renderIcon()}
            <Typography variant="h6" fontWeight="700">
              Thêm {categoryName}
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <form onSubmit={handleSubmit}>
          {/* Form Body */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ p: 3, maxHeight: "70vh", overflowY: "auto" }}
          >
            <Stack spacing={3}>
              {/* Ngày ghi nhận */}
              <TextField
                label="Ngày ghi nhận"
                type="date"
                fullWidth
                value={recordedAt}
                onChange={(e) => {
                  setRecordedAt(e.target.value);
                  if (errors.recordedAt)
                    setErrors((prev) => ({ ...prev, recordedAt: "" }));
                }}
                error={!!errors.recordedAt}
                helperText={errors.recordedAt}
                inputProps={{ max: today }} // Chặn chọn ngày tương lai trên trình duyệt
                InputLabelProps={{ shrink: true }}
              />

              {/* Metric cụ thể */}
              {categoryType === "metric" && (
                <TextField
                  label="Giá trị (VD: 5kg, 38 độ C)"
                  fullWidth
                  required
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (errors.value)
                      setErrors((prev) => ({ ...prev, value: "" })); // Xóa lỗi khi gõ
                  }}
                  error={!!errors.value}
                  helperText={errors.value}
                />
              )}

              {/* Event cụ thể */}
              {(categoryType === "event" || categoryType === "schedule") && (
                <TextField
                  label="Tên sự kiện / Lịch hẹn"
                  fullWidth
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title)
                      setErrors((prev) => ({ ...prev, title: "" }));
                  }}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              )}

              {/* Phần upload ảnh cho Event */}
              {categoryType === "event" && (
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    gutterBottom
                    color="text.secondary"
                  >
                    Hình ảnh đính kèm
                  </Typography>
                  {!imagePreview ? (
                    <Button component="label" fullWidth>
                      <ImageUploadBox sx={{ width: "100%" }}>
                        <UploadIcon
                          sx={{ fontSize: 40, color: "text.disabled", mb: 1 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          Tải ảnh lên
                        </Typography>
                      </ImageUploadBox>
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </Button>
                  ) : (
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: 4,
                        overflow: "hidden",
                        height: 180,
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(255,255,255,0.8)",
                          "&:hover": { bgcolor: "#ff1744", color: "#fff" },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              )}

              {/* Ghi chú chung */}
              <TextField
                label={
                  categoryType === "note" ? "Nội dung ghi chú" : "Ghi chú thêm"
                }
                fullWidth
                multiline
                rows={categoryType === "note" ? 4 : 2}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: "" }));
                }}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Stack>
          </Box>

          {/* Footer Actions */}
          <Box
            sx={{
              p: 2,
              px: 3,
              borderTop: "1px solid #eee",
              display: "flex",
              gap: 2,
              bgcolor: "#fcfcfc",
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              disabled={isSaving}
              sx={{ borderRadius: 3, textTransform: "none", fontWeight: 600 }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSaving}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                boxShadow: "none",
              }}
            >
              {isSaving ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Lưu Log"
              )}
            </Button>
          </Box>
        </form>
      </ModalContainer>
    </Modal>
  );
};
