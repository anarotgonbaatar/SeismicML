import pandas as pd
import os

# Folder containing CSV files
folder_path = os.path.join(os.getcwd(), "seismic_data", "source-data-files")

# Get all CSV files in the folder
csv_files = [f for f in os.listdir(folder_path) if f.endswith(".csv")]

# Print found CSV files
print("Found CSV files:", csv_files)

# Check if any files were found
if not csv_files:
    print("No CSV files found. Please check the folder path and file extensions.")
    exit()

# Read and combine CSV files
df_list = [pd.read_csv(os.path.join(folder_path, file)) for file in csv_files]
combined_df = pd.concat(df_list, ignore_index=True)

# Save the combined dataset
combined_df.to_csv("combined_dataset.csv", index=False)

print("✅ Combined dataset saved as 'combined_dataset.csv'")
