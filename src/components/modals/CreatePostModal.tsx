import React, { useState, useEffect } from 'react';

import {
  Modal,
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  IconButton,
  Paper,
  type SelectChangeEvent
} from '@mui/material';
import {
  Public,
  People,
  Lock,
  PhotoCamera,
  Videocam,
  Close,
  KeyboardArrowDown,
  PlayArrow
} from '@mui/icons-material';

// TypeScript interfaces
interface PostFormData {
  text: string;
  images: File[];
  videos: File[];
  visibility: string;
}

import type { SubmitData } from '../../types/Post';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: SubmitData) => void;
  avatarURL:string;
  userName:string;
}

interface VisibilityOption {
  value: string;
  label: string;
  icon: React.ReactElement;
}

interface MediaItem {
  file: File;
  type: 'image' | 'video';
}

interface MediaPreviewProps {
  media: MediaItem;
  index: number;
  totalCount: number;
  onRemove: () => void;
}

// Media Preview Component
const MediaPreview: React.FC<MediaPreviewProps> = ({ 
  media, 
  index, 
  totalCount, 
  onRemove 
}) => {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (media.file) {
      const url = URL.createObjectURL(media.file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [media.file]);

  const getGridStyle = (): React.CSSProperties => {
    if (totalCount === 1) {
      return { width: '100%', height: '300px' };
    } else if (totalCount === 2) {
      return { width: '49%', height: '200px' };
    } else if (totalCount === 3) {
      if (index === 0) {
        return { width: '58%', height: '250px' };
      } else {
        return { width: '40%', height: '122px' };
      }
    } else {
      return { width: '49%', height: '150px' };
    }
  };

  const showMoreOverlay: boolean = totalCount > 4 && index === 3;
  return (
    <Box
      sx={{
        position: 'relative',
        ...getGridStyle(),
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#f0f2f5',
        cursor: 'pointer',
        '&:hover .remove-btn': {
          opacity: 1
        }
      }}
    >
      {media.type === 'image' ? (
        <img
          src={preview}
          alt={media.file.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <video
            src={preview}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <PlayArrow
            sx={{
              position: 'absolute',
              fontSize: 48,
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: '50%',
              p: 1
            }}
          />
        </Box>
      )}
      
      {showMoreOverlay && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 600
          }}
        >
          +{totalCount - 4} more
        </Box>
      )}

      <IconButton
        className="remove-btn"
        onClick={onRemove}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          opacity: 0,
          transition: 'opacity 0.2s',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.8)'
          }
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
};

// Main Component
const CreatePostModal: React.FC<CreatePostModalProps> = ({ 
  open, 
  onClose, 
  onSubmit,
  avatarURL,
  userName,
}) => {
  const [formData, setFormData] = useState<PostFormData>({
    text: '',
    images: [],
    videos: [],
    visibility: 'public'
  });

  const visibilityOptions: VisibilityOption[] = [
    { 
      value: 'public', 
      label: 'Public', 
      icon: <Public fontSize="small" /> 
    },
    { 
      value: 'friends', 
      label: 'Friends', 
      icon: <People fontSize="small" /> 
    },
    { 
      value: 'private', 
      label: 'Private', 
      icon: <Lock fontSize="small" /> 
    }
  ];

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setFormData(prev => ({ ...prev, text: event.target.value }));
  };

  const handleVisibilityChange = (event: SelectChangeEvent<string>): void => {
    setFormData(prev => ({ ...prev, visibility: event.target.value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);
    const validImages = files.filter(file => 
      ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    );
    
    if (validImages.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...validImages].slice(0, 10) // Max 10 images
      }));
    }
    // Reset input
    event.target.value = '';
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const files = Array.from(event.target.files || []);
    const validVideos = files.filter(file => file.type === 'video/mp4');
    
    if (validVideos.length > 0) {
      setFormData(prev => ({ 
        ...prev, 
        videos: [...prev.videos, ...validVideos].slice(0, 5) // Max 5 videos
      }));
    }
    // Reset input
    event.target.value = '';
  };

  const handleSubmit = (): void => {
    const submitData: SubmitData = {
      caption: formData.text,
      visibility: formData.visibility,
      ...(formData.images.length > 0 && { images: formData.images }),
      ...(formData.videos.length > 0 && { videos: formData.videos })
    };

    onSubmit(submitData);
    handleClose();
  };

  const handleClose = (): void => {
    setFormData({
      text: '',
      images: [],
      videos: [],
      visibility: 'public'
    });
    onClose();
  };

  const removeMedia = (type: 'images' | 'videos', index: number): void => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const allMedia: MediaItem[] = [
    ...formData.images.map(img => ({ file: img, type: 'image' as const })), 
    ...formData.videos.map(vid => ({ file: vid, type: 'video' as const }))
  ];

  const isSubmitDisabled: boolean = !formData.text.trim() && allMedia.length === 0;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Paper
        sx={{
          width: 548,
          maxWidth: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: 3,
          outline: 'none',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            pb: 2,
            borderBottom: '1px solid #e4e6ea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: '#1c1e21',
              fontSize: '1.25rem'
            }}
          >
            Tạo bài viết mới
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ 
              backgroundColor: '#f0f2f5',
              width: 36,
              height: 36,
              '&:hover': { backgroundColor: '#e4e6ea' }
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* User info section */}
        <Box sx={{ px: 3, pt: 2, pb: 1 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 2,
            mb: 2
          }}>
            <Avatar
             src={avatarURL}
              sx={{ 
                width: 44, 
                height: 44,
                backgroundColor: '#1877f2',
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ 
                  fontWeight: 600, 
                  color: '#1c1e21',
                  fontSize: '0.95rem',
                  mb: 0.5
                }}
              >
                {userName}
              </Typography>
              <FormControl>
                <Select
                  value={formData.visibility}
                  onChange={handleVisibilityChange}
                  size="small"
                  IconComponent={KeyboardArrowDown}
                  sx={{
                    backgroundColor: '#f0f2f5',
                    border: 'none',
                    borderRadius: 2,
                    minWidth: 100,
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                    '& .MuiSelect-select': {
                      py: 0.5,
                      px: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      color: '#65676b'
                    }
                  }}
                >
                  {visibilityOptions.map((option) => (
                    <MenuItem 
                      key={option.value} 
                      value={option.value}
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        py: 1
                      }}
                    >
                      {React.cloneElement(option.icon, { 
                        sx: { color: '#65676b' }
                      })}
                      <Typography 
                        variant="body2"
                        sx={{ fontWeight: 500 }}
                      >
                        {option.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Text input */}
          <TextField
            multiline
            minRows={3}
            maxRows={8}
            fullWidth
            placeholder="What's on your mind, John?"
            value={formData.text}
            onChange={handleTextChange}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: '1.5rem',
                color: '#1c1e21',
                lineHeight: 1.3,
                '& textarea': {
                  resize: 'none'
                },
                '&::placeholder': {
                  color: '#65676b',
                  opacity: 1
                }
              }
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Media preview area */}
        {allMedia.length > 0 && (
          <Box
            sx={{
              mx: 3,
              mb: 2,
              p: 2,
              backgroundColor: '#f8f9fa',
              borderRadius: 3,
              border: '1px solid #e4e6ea'
            }}
          >
            <Typography
              variant="body2"
              sx={{ 
                mb: 2, 
                color: '#65676b', 
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              {allMedia.length} {allMedia.length === 1 ? 'item' : 'items'} selected
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: allMedia.length === 3 ? 'space-between' : 'flex-start'
              }}
            >
              {allMedia.slice(0, 4).map((media, index) => {
                const isImage = media.type === 'image';
                const mediaIndex = isImage ? 
                  formData.images.indexOf(media.file) : 
                  formData.videos.indexOf(media.file);
                
                return (
                  <MediaPreview
                    key={`${media.type}-${index}`}
                    media={media}
                    index={index}
                    totalCount={allMedia.length}
                    onRemove={() => removeMedia(isImage ? 'images' : 'videos', mediaIndex)}
                  />
                );
              })}
            </Box>
          </Box>
        )}

        {/* Media upload options */}
        <Box
          sx={{
            mx: 3,
            mb: 3,
            p: 2.5,
            border: '1px solid #e4e6ea',
            borderRadius: 3,
            backgroundColor: '#fafbfc'
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 2
          }}>
            <Typography
              variant="body2"
              sx={{ 
                color: '#1c1e21', 
                fontWeight: 600,
                fontSize: '0.95rem'
              }}
            >
              Add to your post
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* Image upload */}
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageUpload}
                multiple
                style={{ display: 'none' }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <IconButton
                  component="span"
                  sx={{
                    backgroundColor: '#e7f3ff',
                    width: 44,
                    height: 44,
                    '&:hover': { 
                      backgroundColor: '#d0e9ff',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <PhotoCamera sx={{ color: '#1877f2', fontSize: 20 }} />
                </IconButton>
              </label>

              {/* Video upload */}
              <input
                type="file"
                accept=".mp4"
                onChange={handleVideoUpload}
                multiple
                style={{ display: 'none' }}
                id="video-upload"
              />
              <label htmlFor="video-upload">
                <IconButton
                  component="span"
                  sx={{
                    backgroundColor: '#ffe7e7',
                    width: 44,
                    height: 44,
                    '&:hover': { 
                      backgroundColor: '#ffd0d0',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  <Videocam sx={{ color: '#f44336', fontSize: 20 }} />
                </IconButton>
              </label>
            </Box>
          </Box>
        </Box>

        {/* Submit button */}
        <Box sx={{ p: 3, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#1877f2',
              '&:hover': { 
                backgroundColor: '#166fe5',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)'
              },
              '&:disabled': { 
                backgroundColor: '#e4e6ea',
                color: '#bcc0c4'
              },
              textTransform: 'none',
              fontWeight: 600,
              py: 1.5,
              fontSize: '0.95rem',
              borderRadius: 2,
              transition: 'all 0.2s'
            }}
          >
            Đăng bài
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default CreatePostModal;