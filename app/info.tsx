'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import { Github, Info, Dumbbell } from 'lucide-react';
import { Typography } from '@mui/material';

export default function InfoPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#122937',
        color: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            margin: 2,
          }}
        >
          <Link href="/">
            <Dumbbell style={{ width: 30, height: 30, color: '#f5f5f5' }} />
          </Link>
          <Typography variant="h5" sx={{ marginLeft: 2 }}>
            strong wrapped
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
            <Link
              href="https://github.com/caramurphyy/StrongWrappedApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github style={{ width: 30, height: 30, color: '#f5f5f5' }} />
            </Link>
            <Link href="/info">
              <Info style={{ width: 30, height: 30, color: '#f5f5f5' }} />
            </Link>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: 3,
          textAlign: 'center',
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <Typography variant="subtitle1">
          i am not affiliated w strong \b credit poly obj
        </Typography>
      </Box>
    </Box>
  );
}
