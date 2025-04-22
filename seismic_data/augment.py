import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Load preprocessed earthquake data
df = pd.read_csv("c:/Users/anaro/Desktop/Projects/seismic-ml-react/seismic_data/preprocessed_data.csv")

# === CONFIGURABLE VARIABLES ===
NUM_NO_QUAKE_SAMPLES = 10000  # How many fake "no-quake" entries to generate
MAX_ATTEMPTS = NUM_NO_QUAKE_SAMPLES * 10  # How many tries before giving up
ROUND_MATCH = 2  # How many decimals to round lat/lon for uniqueness check
DEFAULT_HOUR_RANGE = (0, 23)  # Hour range for fake entries

# === BOUNDARY INFO FROM DATA ===
lat_min, lat_max = df['latitude'].min(), df['latitude'].max()
lon_min, lon_max = df['longitude'].min(), df['longitude'].max()
year_min, year_max = df['year'].min(), df['year'].max()

date_start = datetime(year_min, 1, 1)
date_end = datetime(year_max, 12, 31)
date_range_days = (date_end - date_start).days

# Use a fast lookup to avoid duplicates
real_quake_keys = set(zip(
    df['year'], df['month'], df['day'],
    df['latitude'].round(ROUND_MATCH), df['longitude'].round(ROUND_MATCH)
))

# === GENERATE FAKE SAMPLES ===
no_quake_rows = []
tries = 0

while len(no_quake_rows) < NUM_NO_QUAKE_SAMPLES and tries < MAX_ATTEMPTS:
    tries += 1

    rand_date = date_start + timedelta(days=random.randint(0, date_range_days))
    year, month, day = rand_date.year, rand_date.month, rand_date.day
    latitude = round(random.uniform(lat_min, lat_max), 5)
    longitude = round(random.uniform(lon_min, lon_max), 5)

    key = (year, month, day, round(latitude, ROUND_MATCH), round(longitude, ROUND_MATCH))
    if key in real_quake_keys:
        continue

    no_quake_rows.append({
        'latitude': latitude,
        'longitude': longitude,
        'year': year,
        'month': month,
        'day': day,
        'hour': random.randint(*DEFAULT_HOUR_RANGE),
        'nst': 0,
        'gap': 360,
        'dmin': 10,
        'rms': 0.0,
        'horizontalError': 5.0,
        'depthError': 5.0,
        'magNst': 0,
        'mag': 0.0
    })

# === COMBINE AND SAVE ===
no_quake_df = pd.DataFrame(no_quake_rows)
augmented_df = pd.concat([df, no_quake_df], ignore_index=True)
augmented_df.to_csv("augmented_data.csv", index=False)
print(f"✅ Augmented dataset created with {len(augmented_df)} total rows.")