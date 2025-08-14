// components/posts/MediaPreview.tsx
import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { Close, PlayArrow } from '@mui/icons-material';
import { MediaItem } from '../../types/Post';

interface Props {
  media: MediaItem;
  index: number;
  totalCount: number;
  onRemove: () => void;
}

const MediaPreview: React.FC<Props> = ({ media, index, totalCount, onRemove }) => {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (media.file) {
      const url = URL.createObjectURL(media.file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    if (media.url) {
      setPreview(media.url);
    }
  }, [media.file, media.url]);

  const getGridStyle = (): React.CSSProperties => {
    if (totalCount === 1) return { width: '100%', height: '300px' };
    if (totalCount === 2) return { width: '49%', height: '200px' };
    if (totalCount === 3) return index === 0
      ? { width: '58%', height: '250px' }
      : { width: '40%', height: '122px' };
    return { width: '49%', height: '150px' };
  };

  const showMoreOverlay = totalCount > 4 && index === 3;

  return (
    <Box sx={{
      position: 'relative',
      ...getGridStyle(),
      borderRadius: 2,
      overflow: 'hidden',
      backgroundColor: '#f0f2f5',
      '&:hover .remove-btn': { opacity: 1 }
    }}>
      {media.type === 'image' ? (
        <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <video src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <PlayArrow sx={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 48, color: 'white',
            backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '50%', p: 1
          }} />
        </Box>
      )}

      {showMoreOverlay && (
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: '1.5rem', fontWeight: 600
        }}>
          +{totalCount - 4} more
        </Box>
      )}

      <IconButton
        className="remove-btn"
        onClick={onRemove}
        sx={{
          position: 'absolute', top: 8, right: 8,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white', opacity: 0, transition: 'opacity 0.2s',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' }
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default MediaPreview;
