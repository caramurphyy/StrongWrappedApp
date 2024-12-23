import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const text = await file.text();
    const { data } = Papa.parse(text, { header: true });
    
    // Process the CSV data in memory
    const results = processCSVData(data);
    
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error processing CSV:', error);
    return NextResponse.json(
      { error: 'Error processing CSV' },
      { status: 500 },
    );
  }
}

function getTopExercises(data: any[]) {
  // Count exercise frequencies
  const exerciseCounts: { [key: string]: number } = {};
  data.forEach(row => {
    const exercise = row['Exercise Name'];
    exerciseCounts[exercise] = (exerciseCounts[exercise] || 0) + 1;
  });

  // Sort and get top 3
  return Object.entries(exerciseCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .reduce((obj, [key, value]) => ({
      ...obj,
      [key]: value
    }), {});
}

function calculateTotalWeight(data: any[]) {
  return data.reduce((total, row) => {
    const weight = parseFloat(row.Weight) || 0;
    const setOrder = parseFloat(row['Set Order']) || 0;
    return total + (weight * setOrder);
  }, 0);
}

function getMostCommonDay(dates: string[]) {
  const dayCount: { [key: string]: number } = {};
  dates.forEach(date => {
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    dayCount[day] = (dayCount[day] || 0) + 1;
  });

  return Object.entries(dayCount)
    .sort(([, a], [, b]) => b - a)[0][0];
}

function getMostCommonTimeOfDay(data: any[]) {
  const categorizeTimeOfDay = (dateStr: string) => {
    const hour = new Date(dateStr).getHours();
    if (hour >= 5 && hour < 12) return 'Morning';
    if (hour >= 12 && hour < 17) return 'Afternoon';
    return 'Night';
  };

  const timeCount: { [key: string]: number } = {};
  data.forEach(row => {
    const timeOfDay = categorizeTimeOfDay(row.Date);
    timeCount[timeOfDay] = (timeCount[timeOfDay] || 0) + 1;
  });

  return Object.entries(timeCount)
    .sort(([, a], [, b]) => b - a)[0][0];
}

function processCSVData(data: any[]) {
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Filter data for past year
  const dataPastYear = data.filter(row => {
    const date = new Date(row.Date);
    return date >= oneYearAgo && date <= today;
  });

  // Get unique workout dates
  const uniqueWorkouts = [...new Set(dataPastYear.map(row => row.Date))];

  // Calculate statistics
  const results = {
    num_workouts: uniqueWorkouts.length,
    top_exercises: getTopExercises(dataPastYear),
    total_weight_lifted: calculateTotalWeight(dataPastYear),
    most_common_day: getMostCommonDay(uniqueWorkouts),
    most_common_time_of_day: getMostCommonTimeOfDay(dataPastYear)
  };

  return results;
}