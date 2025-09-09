import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

export default function ChangeLanguage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState('vi');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'vi';
    setLang(saved);
    i18n.changeLanguage(saved);
  }, [i18n]);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChange = (newLang: string) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
    handleClose();
  };

  const flagUrl =
    lang === 'vi' ? 'https://flagcdn.com/w20/vn.png' : 'https://flagcdn.com/w20/us.png';

  return (
    <>
      <Tooltip title="Change Language">
        <IconButton
          onClick={handleOpen}
          sx={{
            transform: 'scale(1.4)',
            p: 0,
            mr: 1,
          }}
        >
          <img src={flagUrl} alt={lang} />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleChange('vi')}>
          <img src="https://flagcdn.com/w20/vn.png" alt="vi" style={{ marginRight: 8 }} />
          Tiếng Việt
        </MenuItem>
        <MenuItem onClick={() => handleChange('en')}>
          <img src="https://flagcdn.com/w20/us.png" alt="en" style={{ marginRight: 8 }} />
          English
        </MenuItem>
      </Menu>
    </>
  );
}
