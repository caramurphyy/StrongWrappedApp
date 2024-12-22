import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ResultsType } from '../types/results';

export default function FileUploadForm({results, setResults}) {
    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0])
      }
    }

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
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <label
        htmlFor="file-upload"
        style={{
          display: 'inline-block',
          backgroundColor: '#00aaff',
          color: '#f5f5f5',
          padding: '10px 20px',
          borderRadius: 5,
          cursor: 'pointer',
          textAlign: 'center',
          marginBottom: '10px',
        }}
      >
        Choose CSV File
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{
            display: 'none', // Hides the input but retains its functionality
          }}
        />
      </label>
      {file && (
        <Box
          sx={{
            marginBottom: '20px',
            marginTop:'0px',
            borderRadius: 5,
            width: '100%',
            textAlign: 'center',
          }}
        >
          {file.name} selected
        </Box>
      )}
      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: '#00aaff',
          '&:hover': { backgroundColor: '#0088cc' },
        }}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Process CSV'}
      </Button>
    </form>
  );
}
