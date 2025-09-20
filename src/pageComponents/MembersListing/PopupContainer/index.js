'use client';
import React from 'react';
import { useEffect } from 'react';
import { Box, Modal } from '@mui/material';

const PopupContainer = ({
  children,
  isPopupOpen,
  className,
  handleBackdropClick,
  style = { zIndex: 200, backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  showShadow = false,
  innerShadowContent = null,
}) => {
  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add('body-overflow-hidden');
    } else {
      document.body.classList.remove('body-overflow-hidden');
    }
  }, [isPopupOpen]);

  return (
    // <Dialog
    //   onClose={handleBackdropClick}
    //   fullScreen
    //   sx={style}

    //   open={isPopupOpen}
    //   className={clsx(styles['PopupContainer'], className)}
    // >
    //   {children}
    // </Dialog>
    <Modal
      className={className}
      // aria-labelledby="transition-modal-title"
      // aria-describedby="transition-modal-description"
      open={isPopupOpen}
      onClose={handleBackdropClick}
      // closeAfterTransition
      // slotProps={{}}
      // slots={{ backdrop: Backdrop }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(17, 17, 17, 0.8)', // Change the opacity as needed
        },
      }}
      sx={{
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'top',
      }}
    >
      <Box
        sx={{
          width: '100%',
          // maxWidth: 600, // Optional: to limit the max-width of the content
          mx: 'auto', // Center horizontally
          maxHeigth: '100vh',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default PopupContainer;
