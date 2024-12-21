'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Github, Info } from 'lucide-react'
import { List, ListItem, ListItemText, Typography } from '@mui/material'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  type ResultsType = {
    num_workouts: number;
    top_exercises: { [exercise: string]: number }; // A dictionary mapping exercise names to counts
    total_weight_lifted: number;
    most_common_day: string; // Name of the day
  };

  const [results, setResults] = useState<ResultsType | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
  
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/process-csv', {
        method: 'POST',
        body: formData,
      });
      const data: ResultsType = await response.json(); // Type assertion
      setResults(data); // Type-safe assignment
    } catch (error) {
      console.error('Error processing file:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#122937',
        fontFamily: 'Roboto', // Add your font here
        color: '#f5f5f5',
      }}
    > <Box sx={{display:'flex',justifyContent: 'flex-end', margin:2}}>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Link href="https://github.com/yourusername/your-repo" target="_blank" rel="noopener noreferrer">
          <Github style={{ width: 24, height: 24, color: '#f5f5f5' }} />
        </Link>
        <Link href="/info">
          <Info style={{ width: 24, height: 24, color: '#f5f5f5' }} />
        </Link>
      </Box>
     </Box>
      <Box
        sx={{
          padding: 3,
          textAlign: 'center',  
          flexDirection:'column',
           display:'flex',
            alignItems: 'center',
          justifyContent: 'center',
          alignContent:'center'
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 1 }}>
          Strong Wrapped
        </Typography>
        <Typography variant="subtitle1">
          Upload your Strong CSV file to see
        </Typography>
        <List sx={{ marginLeft: 2, listStyleType: 'disc',}}>
  <ListItem>
    <ListItemText primary="How much you lifted this year" />
  </ListItem>
  <ListItem>
    <ListItemText primary="Your favorite exercises" />
  </ListItem>
  <ListItem>
    <ListItemText primary="The day you worked out most often" />
  </ListItem>
</List>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{
              backgroundColor: '#122937',
              color: '#f5f5f5',
              border: '1px solid #00aaff',
              borderRadius: 4,
              padding: 8,
            }}
          />
          <Button variant="contained" color="primary" type="submit">
            {isLoading ? 'Processing...' : 'Process CSV'}
          </Button>
        </form>
      </Box>

      
      {results && (
  <Box
    sx={{
      marginTop: 4,
      backgroundColor: '#1e3a4f',
      border: '1px solid #00aaff',
      borderRadius: 4,
      padding: 3,
      width: '100%',
      maxWidth: 600,
    }}
  >
    <Typography variant="h5" sx={{ marginBottom: 2 }}>
      Results
    </Typography>
    <Typography variant="body1">
      Total Workouts: {results.num_workouts}
    </Typography>
    <Typography variant="body1">
      Most Common Day: {results.most_common_day}
    </Typography>
    <Typography variant="body1">Top Exercises:</Typography>
    <ul>
      {Object.entries(results.top_exercises).map(([exercise, count]) => (
        <li key={exercise}>
          {exercise}: {count} times
        </li>
      ))}
    </ul>
    <Typography variant="body1">
      Total Weight Lifted: {results.total_weight_lifted.toFixed(2)}
    </Typography>
  </Box>
)}

    </Box>
  )
}
