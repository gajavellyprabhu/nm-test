import { createTheme } from '@mui/material';


const MUITheme = (lang) => {
  // const labelFontSize = `${12 / 0.75}px`;
  const direction = lang?.startsWith('en') ? 'ltr' : 'rtl';

  const customBreakpoints = {
    values: {
      xs: 0,
      sm: 769,
      md: 1025,
      lg: 1280,
      xl: 1920,
    },
  };

  // const isAR = direction === 'rtl';
  return createTheme({
    direction: direction,
    breakpoints: customBreakpoints,
    // direction: 'rtl',

    palette: {
      error: {
        main: '#B3261E',
      },
      primary: {
        main: '#111111', // $color-black
        light: '#000000', // $color-black2
      },
      secondary: {
        main: '#B28B31', // $color-gold
        light: '#e6d9bd', // $color-gold2
        lighter: '#d9c59a', // $color-gold-light
        dark: 'rgba(17, 17, 17, 0.8)', // $secondary-color-hover
      },
      grey: {
        main: '#999999', // $color-primary-slate-m
        light: '#f9f9f9', // $color-grey
        dark: '#7b7b7b', // $color-grey-faded2
        faded: 'rgba(79, 79, 79, 0.7)', // $color-grey-faded
      },
      common:{
        textWhite: '#FFFFFF', // $color-white
        textDark: '#4F4F4F', // $text-dark
        slateD: '#111111', // $color-black
        slateM: '#999999', // $color-primary-slate-m
        slateL: '#D9D9D9', // $color-primary-slate-l
        backdrop: 'rgba(17, 17, 17, 0.8)', // $backdrop-popup
      },
      secondaryBeige: {
        light: '#ece2cc', // $color-secondary-beij-1
        medium: '#f7f3eb', // $color-secondary-beij-2
        dark: '#fbf9f5', // $color-secondary-beij-3
      },
      gradient: {
        linear: 'linear-gradient(90deg, #d9c59a -1.11%, #b28b31 80.67%)', // $color-gradient-linear-1
        radial: 'radial-gradient(48.96% 51.11% at 50% 50%, #d9c59a 0%, #b28b31 80%)', // $color-gradient-radial
      },
    },
    typography: {
      h1: {
        fontFamily: 'New Murabba CYB15 ExtraBold',
        fontSize: '60px',
        textTransform: 'uppercase',
      },
      h2: {
        fontFamily: 'New Murabba CYB15 ExtraBold',
        fontSize: '40px',
        textTransform: 'uppercase',
      },
      h3: {
        fontFamily: 'New Murabba CYB15 ExtraBold',
        fontSize: '30px',
        textTransform: 'uppercase',
      },
      h3S: {
        fontFamily: 'New Murabba CYB15 ExtraBold',
        fontSize: '30px',
        textTransform: 'capitalize',
      },
      h4: {
        fontFamily: 'New Murabba CYB15 Regular',
        fontSize: '30px',
        textTransform: 'capitalize',
      },
      h5: {
        fontFamily: 'New Murabba CYB15 ExtraBold',
        fontSize: '24px',
        textTransform: 'uppercase',
      },
      body1B: {
        fontFamily: 'New Murabba CYB15 SemiBold',
        fontSize: '20px',
        textTransform: 'capitalize',
      },
      body1R: {
        fontFamily: 'New Murabba CYB15 Regular',
        fontSize: '20px',
        textTransform: 'capitalize',
      },
      body2R: {
        fontFamily: 'New Murabba CYB15 Regular',
        fontSize: '16px',
        textTransform: 'capitalize',
      },
      body2RCaps: {
        fontFamily: 'New Murabba CYB15 Regular',
        fontSize: '16px',
        textTransform: 'uppercase',
      },
      small1: {
        fontFamily: 'New Murabba CYB15 Regular',
        fontSize: '14px',
        textTransform: 'capitalize',
      },
      small2: {
        fontFamily: 'New Murabba CYB15 Regular',
        fontSize: '12px',
        textTransform: 'uppercase',
      },
    },
    components: {
      MuiFormLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.primary.main,
            '&.MuiFormLabel-filled + .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
              borderRadius: 0,
            },
            '&.MuiFormLabel-filled + .MuiInputBase-root .MuiSelect-iconOpen + .MuiOutlinedInput-notchedOutline':
              {
                borderColor: theme.palette.secondary.main,
                borderRadius: 0,
              },
            '&.Mui-focused + .MuiInputBase-root .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main,
              borderRadius: 0,
            },
          }),
        },
      },
      // MuiAutocomplete:{
      //   styleOverrides:{
      //     root: ({ theme }) => ({
      //       '&.Mui-expanded . ': {
      //         borderColor: theme.palette.primary.main,
      //         borderRadius: 0,
      //       },
      //     }),
      //   }
      // },

      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            // '& .MuiOutlinedInput-notchedOutline legend': {
            //   ...(isAR && { fontSize: labelFontSize }),
            // },
            // color: 'red',
            // '&::placeholder': {
            //   opacity: 1,
            //   color: '#111',
            // },
            borderRadius: 0,
            // '&': {
            //   borderRadius: 0,
            // },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey,
              borderRadius: 0,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main,
              borderRadius: 0,
              borderWidth: 1,
            },
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: `${theme.palette.grey} !important`,
            },
            // '.MuiInputBase-input': {
            //   color: '#111',
            //   '&::placeholder': {
            //     opacity: 1,
            //     color: '#999',
            //   },
            // },
          }),
          // input: ({ theme }) => ({
          //   // '& .MuiOutlinedInput-notchedOutline legend': {
          //   //   ...(isAR && { fontSize: labelFontSize }),
          //   // },

          // }),
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiFormControlLabel-root': {
              marginLeft: 0,
            },
            '& .MuiSvgIcon-root': {
              color: `${theme.palette.grey}`,
              strokeWidth: 1,
            },
          }),
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderColor: theme.palette.secondary.main,
            borderWidth: 1,
            // borderTopWidth: 0,
            borderStyle: 'solid',
            borderRadius: 0,
          }),
          list: ({ theme }) => ({
            '& .MuiFormControlLabel-root': {
              marginLeft: 14,
            },
            '& .MuiMenuItem-root.Mui-selected': {
              background: 'none',
            },
          }),
        },
      },

      // MuiInputBase: {
      //   styleOverrides: {
      //     root: ({ theme }) => ({
      //       '& fieldset': {
      //         borderColor: theme.palette.error, // Set the border color
      //       },
      //       '&:hover fieldset': {
      //         borderColor: theme.palette.error, // Set the hover border color
      //       },
      //       '&.Mui-focused': {
      //         borderColor: theme.palette.secondary.main, // Set the focused border color
      //       },
      //     }),
      //   },
      // },
      // CHANGE: Adding button styles
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8, // Example of adding a new style
            textTransform: 'none', // Prevents automatic capitalization
            padding: '10px 20px', // Default padding
          },
          sizeLarge: {
            padding: '12px 24px', // Larger padding for large buttons
          },
          sizeSmall: {
            padding: '8px 16px', // Smaller padding for small buttons
          },
          containedPrimary: {
            backgroundColor: '#B28B31', // Primary button color
            '&:hover': {
              backgroundColor: '#D9C59A', // Hover color
            },
          },
          containedSecondary: {
            backgroundColor: '#111111', // Secondary button color
            '&:hover': {
              backgroundColor: '#999999', // Hover color
            },
          },
        },
      },
    },
  });
};
export default MUITheme;
