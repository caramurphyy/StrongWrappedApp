'use client';

import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Github, Info, Dumbbell } from 'lucide-react';
import { Grid, Grow, Paper, Typography } from '@mui/material';
import * as motion from 'motion/react-client';
import type { Variants } from 'motion/react';
import InstructionsStepper from './instructions';
import { ResultsType } from '../types/results';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnimatedLine from './animatedLine';
import { ConveyorBelt } from './conveyorBelt';

export default function Home() {
  const [results, setResults] = useState<ResultsType | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const topRef = useRef(null);

  useEffect(() => {
    // Scroll to the referenced element
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0e3c58',
        color: '#f5f5f5',
        fontFamily: 'Trebuchet MS, sans-serif',
        marginBottom: 10,
      }}
      ref={topRef}
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
          <Link href="/" onClick={() => setResults(null)}>
            <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
              <Dumbbell style={{ width: 30, height: 30, color: '#f5f5f5' }} />
            </motion.div>
          </Link>
          <Typography variant="h5" sx={{ marginLeft: 2 }}>
            strong wrapped
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              href="https://github.com/caramurphyy/StrongWrappedApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github style={{ width: 30, height: 30, color: '#f5f5f5' }} />
            </Link>
            {/* <Link href="/info">
              <Info style={{ width: 30, height: 30, color: '#f5f5f5' }} />
            </Link> */}
          </Box>
        </Box>
      </Box>
      {!results && (
        <Box
          sx={{
            textAlign: 'center',
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center',
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f5f5f5',
              width: '100%',
              padding: 5,
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                textAlign: 'left',
                flexWrap: 'nowrap',
                gap: 2,
              }}
            >
              <Typography
                variant="h1"
                fontWeight="bold"
                color="#0e3c58"
                sx={{
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                  flex: '1 1 300px',
                  fontFamily: 'Trebuchet MS, sans-serif',
                }}
              >
                READY TO SEE <br />
                YOUR <span style={{ color: '#00aaff' }}>2024</span>
                <br /> IN THE GYM?
              </Typography>
              <Box
                component="img"
                src="/strongGraphic.svg"
                alt="Dumbbell graphic"
                sx={{
                  width: { xs: '100%', sm: '50%', md: '40%' },
                  maxWidth: '500px',
                  flex: '0 0 auto',
                  marginLeft: { xs: 0, sm: 2 }, // Ensures spacing when screen size allows
                  display: { xs: 'none', sm: 'block' }, // Hides the image at xs screen sizes
                }}
              />
            </Box>
            <motion.div
              whileHover={{ scale: 1.5 }}
              style={{ marginTop: 20, cursor: 'pointer' }} // Add cursor pointer for better UX
              onClick={() => {
                const element = document.getElementById('instructions-stepper');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <ExpandMoreIcon style={{ fontSize: 80, color: '#0e3c58' }} />
            </motion.div>
          </Box>

          <Box
            id="instructions-stepper"
            sx={{
              padding: 2,
              margin: 5,
              borderRadius: 5,
              backgroundColor: '#082B3F',
            }}
          >
            <InstructionsStepper results={results} setResults={setResults} />
          </Box>
        </Box>
      )}

      {results && results.num_workouts!=null && (
        <Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 5,
                marginRight: 2,
                backgroundColor: '#042C46',
                borderRadius: 10,
                padding: 5,
              }}
            >
              <Typography variant="h4" color="#f5f5f5">
                You lifted
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', sm: '5rem', md: '7rem', lg: '10rem' },
                  fontWeight: 'bold',
                  color: '#00aaff',
                  marginBottom: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'baseline',
                  }}
                >
                  <CountUp
                    end={parseFloat(results.total_weight_lifted.toFixed(0))}
                    duration={3}
                    separator=","
                    onEnd={() => setAnimationComplete(true)}
                  />{' '}
                  <span style={{ fontSize: '2rem' }}>lbs</span>
                </Box>
              </Typography>
              <Typography variant="h6" color="#f5f5f5">
                in 2024. That's equivalent to {results.total_weight_lifted / 45}{' '}
                plates!
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 5,
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                <Box
                  component="img"
                  src="./elephant.svg"
                  alt="African Elephant"
                  sx={{
                    maxWidth: { xs: '100%', sm: '75%', md: '50%', lg: '350px' },
                    width: '100%',
                    flex: '1 1 auto',
                  }}
                />
              </motion.div>
              <Typography
                variant="h6"
                color="#f5f5f5"
                sx={{
                  flex: '1 1 auto',
                  minWidth: '200px',
                  maxWidth: '400px',
                }}
              >
                {results.total_weight_lifted > 13000
                  ? "You've lifted the weight of this elephant! But have you hit 225..."
                  : "Keep going! Maybe next year you'll be able to say you lifted this elephant in weight."}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
              }}
              style={{
                minWidth: '300px',
              }}
            >
              <motion.div
                style={cardContainer}
                initial="offscreen"
                whileInView="onscreen"
              >
                <div style={{ backgroundColor: '#00aaff' }} />
                <motion.div style={card} variants={cardVariants}>
                  <div
                    style={{
                      color: '#0e3c58',
                      fontSize: '3rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    You hit the gym <br />
                    <span style={{ color: '#00aaff', fontSize: '6rem' }}>
                      {results.num_workouts}
                    </span>
                    <br />
                    times this year!
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </Box>
          {/* <AnimatedLine /> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 20,
              marginLeft: 5,
              marginRight: 5,
              gap: 5,
              flexWrap: 'wrap',
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{ ...timeCard, flexDirection: 'row', flex: '1 1 35%' }}
            >
              <Box
                component="img"
                src="/calendar.svg"
                alt="calendar graphic"
                sx={{
                  flex: '1 1 30%',
                  maxWidth: '150px',
                  marginRight: 2,
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h1"
                  style={{ fontSize: '3rem', fontWeight: 'bold' }}
                  color="#00aaff"
                >
                  {results.most_common_day}'s
                </Typography>
                <Typography variant="h6" color="#0e3c58">
                  are your favorite day to workout!
                </Typography>
              </Box>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{ ...timeCard, flex: '1 1 35%' }}
            >
              <Box
                component="img"
                src="/clock.svg"
                alt="clock graphic"
                sx={{
                  flex: '1 1 30%',
                  maxWidth: '150px',
                  marginRight: 2,
                }}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {results.most_common_time_of_day == 'Morning' && (
                  <Typography variant="h6" color="#0e3c58">
                    <span
                      style={{
                        fontSize: '2.1rem',
                        fontWeight: 'bold',
                        color: '#0e3c58',
                      }}
                    >
                      The early bird gets the worm!
                    </span>
                    <br /> You tended to workout most in the mornings.
                  </Typography>
                )}
                {results.most_common_time_of_day == 'Afternoon' && (
                  <Typography variant="h6" color="#00aaff">
                    <span
                      style={{
                        fontSize: '2.1rem',
                        fontWeight: 'bold',
                        color: '#0e3c58',
                      }}
                    >
                      {' '}
                      "Hey, can I work in?"
                    </span>{' '}
                    <br />
                    Sound familiar? Your favorite time to workout was the
                    Afternoon!
                  </Typography>
                )}
                {results.most_common_time_of_day == 'Night' && (
                  <Typography variant="h6" color="#0e3c58">
                    <span
                      style={{
                        fontSize: '2.1rem',
                        fontWeight: 'bold',
                        color: '#0e3c58',
                      }}
                    >
                      {' '}
                      Are you a nightowl?
                    </span>{' '}
                    <br />
                    Night workouts appear to be your favorite!
                  </Typography>
                )}
              </Box>
            </motion.div>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              margin: 5,
            }}
          >
            <Box
              sx={{
                maxWidth: '50rem',
                margin: 5,
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden', // Add this line to ensure the content doesn't overflow
              }}
            >
              <ConveyorBelt />
              <Box sx={{ padding: 5 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: '2.1rem',
                    fontWeight: 'bold',
                    color: '#00aaff',
                  }}
                >
                  You performed these exercises the most:
                </Typography>
                <Box component="ul" sx={{ marginTop: 2 }}>
                  {Object.entries(results.top_exercises).map(
                    ([exercise, count], index) => (
                      <Box key={index} component="li">
                        <Typography
                          variant="h3"
                          sx={{
                            fontSize: '1.5rem',
                            marginBottom: 2,
                            color: '#0e3c58',
                          }}
                        >
                          <span style={{ fontWeight: 'bold' }}>
                            {exercise}:{' '}
                          </span>
                          <span style={{ color: '#00aaff' }}>{count}</span>{' '}
                          times
                        </Typography>
                      </Box>
                    ),
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

const cardVariants: Variants = {
  offscreen: {
    y: -300,
  },
  onscreen: {
    y: 0,
    transition: {
      type: 'bounce',
      bounce: 0.8,
      duration: 1.2,
    },
  },
};

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const cardContainer: React.CSSProperties = {
  overflow: 'hidden',
  display: 'flex',
  position: 'relative',
  paddingTop: 20,
  marginBottom: -120,
};

const card: React.CSSProperties = {
  fontSize: 164,
  width: '100%',
  padding: 25,
  margin: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  background: 'white',
};

const timeCard: React.CSSProperties = {
  fontSize: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 20,
  background: 'white',
  padding: 20,
};
