'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Github, Info, Dumbbell } from 'lucide-react'
import {  Typography } from '@mui/material'
import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import InstructionsStepper from './instructions'
import { ResultsType } from '../types/results'
import DumbbellAnimation from './dumbbell';


export default function Home() {

  const [results, setResults] = useState<ResultsType | null>(null);


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

      <Box sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
     <Box sx={{display:'flex', flexDirection:'row', alignItems:'flex-start',justifyContent: 'flex-start', margin:2}}>
     <Link href="/">
     <motion.div
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
        >
          <Dumbbell style={{ width: 30, height: 30, color: '#f5f5f5' }} />
          </motion.div>
        </Link>
        <Typography variant="h5" sx={{marginLeft:2}} >
      
          strong wrapped
    
        </Typography>
     </Box>
    <Box sx={{display:'flex',justifyContent: 'flex-end', margin:2}}>
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
        <Link href="https://github.com/caramurphyy/StrongWrappedApp" target="_blank" rel="noopener noreferrer">
          <Github style={{ width: 30, height: 30, color: '#f5f5f5' }} />
        </Link>
        <Link href="/info">
          <Info style={{ width: 30, height: 30, color: '#f5f5f5' }} />
        </Link>
      </Box>
     </Box>
     </Box>
     {!results && (
      <Box
        sx={{
   
          textAlign: 'center',  
          flexDirection:'column', 
           display:'flex',
            alignItems: 'center',


        }}
      >
        {/* <DumbbellAnimation/> */}
   <Typography variant="h5" >Ready to see your 2024 in the gym? </Typography>
        <InstructionsStepper results={results} setResults={setResults}/>


      </Box>
    )}

      
      {results && (

<motion.div
initial={{ opacity: 0, scale: 0 }}
animate={{ opacity: 1, scale: 1 }}
transition={{
    duration: 0.4,
    scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
}} style={container}>
        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8}}
        >
            <div style={{ ...splash, backgroundColor: '#00aaff'}} />
            <motion.div style={card} variants={cardVariants}>
            {results.num_workouts}
            </motion.div>
        </motion.div>

        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8}}
        >
            <div style={{ ...splash,backgroundColor: '#00aaff' }} />
            <motion.div style={card} variants={cardVariants}>
             {results.most_common_day}
            </motion.div>
        </motion.div>

        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8}}
        >
            <div style={{ ...splash, backgroundColor: '#00aaff' }} />
            <motion.div style={card} variants={cardVariants}>
            <Typography variant="body1">Top Exercises:</Typography>
            <ul>
      {Object.entries(results.top_exercises).map(([exercise, count]) => (
        <li key={exercise}>
          {exercise}: {count} times
        </li>
      ))}
    </ul>
            </motion.div>
        </motion.div>

        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.8}}
        >
            <div style={{ ...splash, backgroundColor: '#00aaff' }} />
            <motion.div style={card} variants={cardVariants}>
            <Typography variant="body1">
      Total Weight Lifted: {results.total_weight_lifted.toFixed(2)}
    </Typography>
            </motion.div>
        </motion.div>
</motion.div>

  )}
  </Box>
)}





const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};



const hue = (h: number) => `hsl(${h}, 100%, 50%)`

/**
* ==============   Styles   ================
*/

const container: React.CSSProperties = {
  margin: "100px auto",
  maxWidth: 500,
  paddingBottom: 100,
  width: "100%",
}

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
}

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
  fontSize: 164,
  width: 300,
  height: 430,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "white",
transformOrigin: "10% 60%",
}




