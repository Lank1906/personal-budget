import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBoxProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export default function SearchBox({
  placeholder = 'Tìm kiếm...',
  onSearch,
  debounceMs = 300,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query.trim());
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearch]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: 50,
        px: 2,
        py: 0.5,
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
      }}
    >
      <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
      <TextField
        fullWidth
        variant="standard"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          disableUnderline: true,
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setQuery('')} edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
