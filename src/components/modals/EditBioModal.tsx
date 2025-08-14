import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import api from "../../lib/axios";
import { useParams } from "react-router-dom";
interface EditBioModalProps {
  open: boolean;
  onClose: () => void;
  currentBio: string;
  onSave: (newBio: string) => void;
}

const EditBioModal: React.FC<EditBioModalProps> = ({
  open,
  onClose,
  currentBio,
  onSave,
}) => {
  const [bio, setBio] = useState(currentBio);
  const { id } = useParams();
  // Cập nhật khi currentBio thay đổi từ bên ngoài
  React.useEffect(() => {
    setBio(currentBio);
  }, [currentBio]);


  const handleSave = async () => {
    const formData = new FormData();
    formData.append("bio", bio);
    try{
        const res = await api.post(`/users/${id}/updateProfile`, formData);
        if(res.status == 200){
            onSave(bio);

        }
    }catch(error){
        console.log(error);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Chỉnh sửa giới thiệu</DialogTitle>
      <DialogContent>
        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBioModal;
