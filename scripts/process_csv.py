import sys
import json
import pandas as pd
from datetime import datetime, timedelta

def process_csv(file_path):

    # Initialize the result container
    results = {}

    # Read the CSV file into a pandas DataFrame
    data = pd.read_csv(file_path, sep=',')  

    # Drop columns that are entirely empty
    data = data.dropna(axis=1, how='all')

    # Convert 'Date' column to datetime
    data['Date'] = pd.to_datetime(data['Date'], format='%Y-%m-%d %H:%M:%S')

    today = datetime.now()
    one_year_ago = today - timedelta(days=365)

    # Filter the data for the past year
    data_past_year = data[(data['Date'] >= one_year_ago) & (data['Date'] <= today)]

    # Condense to unique workout dates
    unique_workouts = data_past_year[['Date']].drop_duplicates()

    # 1. Count the number of unique workouts (days with workouts)
    results['num_workouts'] = len(unique_workouts)

    # 2. Find and rank the top 3 exercises by frequency
    top_exercises = data_past_year['Exercise Name'].value_counts().head(3).to_dict()
    results['top_exercises'] = top_exercises

    # 3. Calculate the total weight lifted (Weight * Set Order summed for all rows)
    data_past_year.loc[:, 'Weight'] = pd.to_numeric(data_past_year['Weight'], errors='coerce')
    data_past_year.loc[:, 'Set Order'] = pd.to_numeric(data_past_year['Set Order'], errors='coerce')

    # Explicitly create a copy of the DataFrame slice to avoid setting on a view
    data_past_year = data[(data['Date'] >= one_year_ago) & (data['Date'] <= today)].copy()
    data_past_year['Weight'] = pd.to_numeric(data_past_year['Weight'], errors='coerce')
    data_past_year['Set Order'] = pd.to_numeric(data_past_year['Set Order'], errors='coerce')

    # Now you can safely modify data_past_year without the warning
    data_past_year['Weight_SetOrder_Product'] = data_past_year['Weight'] * data_past_year['Set Order']

    results['total_weight_lifted'] = data_past_year['Weight_SetOrder_Product'].sum()

    # 4. Find the most common day of the week for unique workout dates
    unique_workouts['Day of Week'] = unique_workouts['Date'].dt.day_name()
    results['most_common_day'] = unique_workouts['Day of Week'].mode()[0]

    # 5. Find the most common time of day for workouts
    def categorize_time_of_day(hour):
        if 5 <= hour < 12:
            return 'Morning'
        elif 12 <= hour < 17:
            return 'Afternoon'
        else:
            return 'Night'

    data_past_year['Time of Day'] = data_past_year['Date'].dt.hour.apply(categorize_time_of_day)
    results['most_common_time_of_day'] = data_past_year['Time of Day'].mode()[0]

    return results

if __name__ == "__main__":
    file_path = sys.argv[1]
    results = process_csv(file_path)
    print(json.dumps(results, indent=4))  # Indented for better readability in the console
