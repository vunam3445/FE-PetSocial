import React from "react";

import {
  Box,
  Typography,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { KeyboardArrowDown, Public, People, Lock } from "@mui/icons-material";
import { PostTextInput } from "./PostTextInput";
import type { Pet } from "../../types/Post";

interface PostHeaderProps {
  avatarURL: string;
  userName: string;
  visibility: string;
  onVisibilityChange: (value: string) => void;
  caption?: string;
  onCaptionChange: (text: string) => void;
  pets?: Pet[];
  selectedProfileId?: string;
  onProfileChange?: (event: SelectChangeEvent<unknown>) => void;
  originalUser?: { name: string; avatar: string };
}

interface VisibilityOption {
  value: string;
  label: string;
  icon: React.ReactElement;
}
const visibilityOptions: VisibilityOption[] = [
  {
    value: "public",
    label: "Public",
    icon: <Public fontSize="small" />,
  },
  // {
  //   value: "friends",
  //   label: "Friends",
  //   icon: <People fontSize="small" />,
  // },
  {
    value: "private",
    label: "Private",
    icon: <Lock fontSize="small" />,
  },
];
export const PostHeaderModal: React.FC<PostHeaderProps> = ({
  avatarURL,
  userName,
  visibility,
  onVisibilityChange,
  caption,
  onCaptionChange,
  pets,
  selectedProfileId,
  onProfileChange,
  originalUser,
}) => {
  return (
    <Box sx={{ px: 3, pt: 2, pb: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          mb: 2,
        }}
      >
        <Avatar
          src={avatarURL}
          sx={{
            width: 44,
            height: 44,
            backgroundColor: "#1877f2",
            fontSize: "1.1rem",
            fontWeight: 600,
          }}
        ></Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: "#1c1e21",
              fontSize: "0.95rem",
              mb: 0.5,
            }}
          >
            {userName}
          </Typography>
          <FormControl>
            <Select
              value={visibility}
              onChange={(e) => onVisibilityChange(e.target.value)}
              size="small"
              IconComponent={KeyboardArrowDown}
              sx={{
                backgroundColor: "#f0f2f5",
                border: "none",
                borderRadius: 2,
                minWidth: 100,
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiSelect-select": {
                  py: 0.5,
                  px: 1.5,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#65676b",
                },
              }}
            >
              {visibilityOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    py: 1,
                  }}
                >
                  {React.cloneElement(option.icon, {
                    sx: { color: "#65676b" },
                  })}
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {option.label}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {pets?.length > 0 && onProfileChange && originalUser && (
            <Select
              value={selectedProfileId}
              onChange={onProfileChange}
              size="small"
              variant="standard"
              disableUnderline
              sx={{
                bgcolor: "#e4e6eb", // Màu đậm hơn chút để phân biệt
                borderRadius: 1,
                px: 1,
                fontSize: "0.8rem",
                fontWeight: 600,
                height: 24,
                minWidth: 100, // Đặt độ rộng tối thiểu để tên không bị ép
                "& .MuiSelect-select": {
                  py: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                },
              }}
            >
              {/* Option: User Chính */}
              <MenuItem value="user">
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {/* Avatar nhỏ trong menu dropdown */}
                  <Avatar
                    src={originalUser.avatar}
                    sx={{ width: 20, height: 20 }}
                  />
                  <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                    {originalUser.name} (Tôi)
                  </Typography>
                </Box>
              </MenuItem>

              {/* List Pets */}
              {pets?.map((pet) => (
                <MenuItem key={pet.pet_id} value={pet.pet_id}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      src={pet.avatar_url}
                      sx={{ width: 20, height: 20 }}
                    ></Avatar>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 120 }}>
                      {pet.name}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      </Box>

      {/* Text input */}
      <PostTextInput
        value={caption || ""}
        onChange={onCaptionChange}
        placeholder="Viết những gì bạn đang nghĩ..."
      />
    </Box>
  );
};
