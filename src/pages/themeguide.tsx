// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

// CHANGE: Updated custom palette interface to match exact new theme structure
declare module '@mui/material/styles' {
  interface Palette {
    secondaryBeige: {
      light: string;
      medium: string;
      dark: string;
    };
    gradient: {
      linear: string;
      radial: string;
    };
  }

  interface PaletteOptions {
    secondaryBeige?: {
      light?: string;
      medium?: string;
      dark?: string;
    };
    gradient?: {
      linear?: string;
      radial?: string;
    };
  }

  // CHANGE: Extended secondary palette to include lighter variant
  interface PaletteColor {
    lighter?: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }

  // CHANGE: Extended common palette to include textWhite, textDark, and slateD
  interface CommonColors {
    textWhite: string;
    textDark: string;
    slateD: string;
    slateM: string;
    slateL: string;
    backdrop: string;
  }
}

// CHANGE: Added custom typography variants to module declaration
declare module '@mui/material/styles' {
  interface TypographyVariants {
    h3S: React.CSSProperties;
    body1B: React.CSSProperties;
    body1R: React.CSSProperties;
    body2R: React.CSSProperties;
    body2RCaps: React.CSSProperties;
    small1: React.CSSProperties;
    small2: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    h3S?: React.CSSProperties;
    body1B?: React.CSSProperties;
    body1R?: React.CSSProperties;
    body2R?: React.CSSProperties;
    body2RCaps?: React.CSSProperties;
    small1?: React.CSSProperties;
    small2?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h3S: true;
    body1B: true;
    body1R: true;
    body2R: true;
    body2RCaps: true;
    small1: true;
    small2: true;
    body1: false;
    body2: false;
    body3: false;
    body4: false;
    body5: false;
    body6: false;
  }
}

const TypographySample: React.FC = () => {
  // CHANGE: Updated variants to match new typography system
  const variants = [
    'h1',
    'h2',
    'h3',
    'h3S',
    'h4',
    'h5',
    'body1B',
    'body1R',
    'body2R',
    'body2RCaps',
    'small1',
    'small2',
  ] as const;

  return (
    <Box mb={6}>
      <Typography variant="h2" gutterBottom>
        Typography
      </Typography>
      <Stack spacing={4}>
        {variants.map((v) => (
          <Box key={v}>
            <Typography variant="h5" gutterBottom sx={{ textDecoration: 'underline' }}>
              {v}
            </Typography>
            <Typography variant={v} sx={{ bgcolor: 'background.paper', p: 1, borderRadius: 1 }}>
              The quick brown fox jumps over the lazy dog. ({v})
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const ColorSwatch: React.FC<{
  name: string;
  value: string;
  onLightText?: boolean;
}> = ({ name, value, onLightText }) => (
  <Paper
    elevation={1}
    sx={{
      width: 120,
      height: 120,
      position: 'relative',
      borderRadius: 2,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      p: 1,
      bgcolor: value,
      color: onLightText ? 'text.primary' : '#fff',
    }}
  >
    <Box sx={{ fontSize: 12, fontWeight: 600 }}>{name}</Box>
    <Box sx={{ fontSize: 10 }}>{value}</Box>
  </Paper>
);

// CHANGE: Added GradientSwatch component for gradient colors
const GradientSwatch: React.FC<{
  name: string;
  value: string;
}> = ({ name, value }) => (
  <Paper
    elevation={1}
    sx={{
      width: 120,
      height: 120,
      position: 'relative',
      borderRadius: 2,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      p: 1,
      background: value,
      color: '#fff',
    }}
  >
    <Box sx={{ fontSize: 12, fontWeight: 600 }}>{name}</Box>
    <Box sx={{ fontSize: 10 }}>gradient</Box>
  </Paper>
);

const PaletteSection: React.FC = () => {
  const theme = useTheme();

  // CHANGE: Updated to handle new palette structure with lighter variant
  const getShades = (key: 'primary' | 'secondary') => {
    const pal: any = theme.palette[key] || {};
    const shades = [
      { name: `${key}.main`, value: pal.main || '' },
      { name: `${key}.light`, value: pal.light || pal.main || '' },
    ];

    // Add dark variant for secondary palette
    if (key === 'secondary' && pal.dark) {
      shades.push({ name: `${key}.dark`, value: pal.dark });
    }

    // Add lighter variant for secondary palette
    if (key === 'secondary' && pal.lighter) {
      shades.push({ name: `${key}.lighter`, value: pal.lighter });
    }

    return shades;
  };

  // CHANGE: Updated function to get grey palette variants matching new structure
  const getGreyShades = () => {
    const grey: any = theme.palette.grey || {};
    return [
      { name: 'grey.main', value: grey.main || '' },
      { name: 'grey.light', value: grey.light || '' },
      { name: 'grey.dark', value: grey.dark || '' },
      { name: 'grey.faded', value: grey.faded || '' },
    ];
  };

  return (
    <Box mb={6}>
      <Typography variant="h2" gutterBottom>
        Color Palette
      </Typography>

      {/* CHANGE: Added primary and secondary palette sections */}
      {(['primary', 'secondary'] as const).map((key) => (
        <Box key={key} mb={4}>
          <Typography variant="h4" gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {getShades(key).map((s) => (
              <ColorSwatch key={s.name} name={s.name} value={s.value} onLightText={false} />
            ))}
          </Stack>
        </Box>
      ))}

      {/* CHANGE: Added Grey palette section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Grey
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {getGreyShades().map((s) => (
            <ColorSwatch
              key={s.name}
              name={s.name}
              value={s.value}
              onLightText={s.name.includes('light')}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* CHANGE: Separated Error colors into their own section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Error
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <ColorSwatch name="error.main" value={theme.palette.error.main} />
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* CHANGE: Separated Common colors into their own section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Common
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <ColorSwatch
            name="common.textWhite"
            value={theme.palette.common.textWhite}
            onLightText={true}
          />
          <ColorSwatch name="common.textDark" value={theme.palette.common.textDark} />
          <ColorSwatch name="common.slateD" value={theme.palette.common.slateD} />
          <ColorSwatch
            name="common.slateM"
            value={theme.palette.common.slateM}
            onLightText={true}
          />
          <ColorSwatch
            name="common.slateL"
            value={theme.palette.common.slateL}
            onLightText={true}
          />
          <ColorSwatch name="common.backdrop" value={theme.palette.common.backdrop} />
        </Stack>
      </Box>

      {/* <Divider sx={{ my: 4 }} /> */}

      {/* CHANGE: Updated semantic section to only include slate and backdrop colors */}
      {/* <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Semantic / Other
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="flex-start">
         
        </Stack>
      </Box> */}

      <Divider sx={{ my: 4 }} />

      {/* CHANGE: Added Secondary Beige palette section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Secondary Beige
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <ColorSwatch
            name="secondaryBeige.light"
            value={theme.palette.secondaryBeige.light}
            onLightText={true}
          />
          <ColorSwatch
            name="secondaryBeige.medium"
            value={theme.palette.secondaryBeige.medium}
            onLightText={true}
          />
          <ColorSwatch
            name="secondaryBeige.dark"
            value={theme.palette.secondaryBeige.dark}
            onLightText={true}
          />
        </Stack>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* CHANGE: Added Gradient palette section */}
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          Gradients
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <GradientSwatch name="gradient.linear" value={theme.palette.gradient.linear} />
          <GradientSwatch name="gradient.radial" value={theme.palette.gradient.radial} />
        </Stack>
      </Box>
    </Box>
  );
};

const ButtonVariants: React.FC = () => {
  return (
    <Box mb={6}>
      <Typography variant="h2">Buttons</Typography>
      <Stack spacing={4}>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          {/* CHANGE: Added button examples to showcase theme button styles */}
          <Button variant="contained" color="primary" size="small">
            Primary Small
          </Button>
          <Button variant="contained" color="primary">
            Primary Medium
          </Button>
          <Button variant="contained" color="primary" size="large">
            Primary Large
          </Button>
          <Button variant="contained" color="secondary" size="small">
            Secondary Small
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Medium
          </Button>
          <Button variant="contained" color="secondary" size="large">
            Secondary Large
          </Button>
          <Button variant="contained" disabled>
            Disabled
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const StyleGuidePage: React.FC = () => {
  const router = useRouter();
  // const { locale = 'en' } = router as { locale?: Locale };
  // const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      <Head>
        <title>Style Guide</title>
        <meta name="description" content="Design system / style guide" />
      </Head>
      {/* <ThemeProvider theme={themeFactory(dcrTheme, dir, locale)}> */}
      <CssBaseline />
      <Box
        component="main"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          py: 8,
          px: 4,
        }}
      >
        <Typography variant="h1" gutterBottom>
          Style Guide
        </Typography>
        <Typography variant="body1R" gutterBottom>
          Living documentation of typography, colors, and component variations.
        </Typography>

        <Divider sx={{ my: 6 }} />

        <TypographySample />
        <Divider sx={{ my: 6 }} />
        <PaletteSection />
        <Divider sx={{ my: 6 }} />
        <ButtonVariants />
      </Box>
      {/* </ThemeProvider> */}
    </>
  );
};

export default StyleGuidePage;
