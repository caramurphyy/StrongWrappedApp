import pandas as pd
from datetime import datetime, timedelta

# Load the CSV file into a DataFrame
file_path = '/Users/caramurphy/StrongWrapped/strong.csv'  # Replace with the actual path to your CSV file
data = pd.read_csv(file_path, sep=',')  # Adjust delimiter if necessary

data = data.dropna(axis=1, how='all')

print(data.columns)



# Step 2: Convert the 'Date' column to datetime format (ignore time)
data['Date'] = pd.to_datetime(data['Date'], format='%Y-%m-%d %H:%M:%S')





# Get today's date and calculate the date one year ago
today = datetime.now()
one_year_ago = today - timedelta(days=365)

# Filter for rows where the date is within the past year
data_past_year = data[(data['Date'] >= one_year_ago) & (data['Date'] <= today)]

# Condense to unique workout dates
unique_workouts = data_past_year[['Date']].drop_duplicates()
# 1. Count the number of unique workouts (days with workouts)
num_workouts = len(unique_workouts)

# 2. Find and rank the top 3 exercises by frequency
top_exercises = data_past_year['Exercise Name'].value_counts().head(3)

# 3. Calculate the total weight lifted (Weight * Set Order summed for all rows)
data_past_year['Weight'] = pd.to_numeric(data_past_year['Weight'], errors='coerce')
data_past_year['Set Order'] = pd.to_numeric(data_past_year['Set Order'], errors='coerce')

data_past_year['Weight_SetOrder_Product'] = data_past_year['Weight'] * data_past_year['Set Order']
total_weight_lifted = data_past_year['Weight_SetOrder_Product'].sum()

# 2. Find the most common day of the week for unique workout dates
unique_workouts['Day of Week'] = pd.to_datetime(unique_workouts['Date']).dt.day_name()
most_common_day = unique_workouts['Day of Week'].mode()[0]

# Output results
print("Number of workouts in the past year:",data['Date'])
print("\nTop 3 Exercises in the past year:")
print(top_exercises)
print("\nTotal weight lifted in the past year:", total_weight_lifted)
print("\nMost common day of the week for workouts in the past year:", most_common_day)
