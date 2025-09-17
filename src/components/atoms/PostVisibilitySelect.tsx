// components/posts/PostVisibilitySelect.tsx
import React from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import { KeyboardArrowDown, Public, People, Lock } from '@mui/icons-material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const options = [
  { value: 'public', label: 'Public', icon: <Public fontSize="small" /> },
  { value: 'friends', label: 'Friends', icon: <People fontSize="small" /> },
  { value: 'private', label: 'Private', icon: <Lock fontSize="small" /> }
];

const PostVisibilitySelect: React.FC<Props> = ({ value, onChange }) => (
  <FormControl>
    <Select
      value={value}
      onChange={onChange}
      size="small"
      IconComponent={KeyboardArrowDown}
      sx={{
        backgroundColor: '#f0f2f5',
        border: 'none',
        borderRadius: 2,
        minWidth: 100,
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
      }}
    >
      {options.map(opt => (
        <MenuItem key={opt.value} value={opt.value} sx={{ display: 'flex', gap: 1.5 }}>
          {React.cloneElement(opt.icon, { sx: { color: '#65676b' } })}
          <Typography variant="body2">{opt.label}</Typography>
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default PostVisibilitySelect;
