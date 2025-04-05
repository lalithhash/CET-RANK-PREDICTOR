import pandas as pd
import json

# Load the Excel file
file_path = "cet_colg_data.xlsx"  # Replace with your file path
df = pd.read_excel(file_path)

# Fetch the first row of the DataFrame
first_row = df.iloc[0]

# Convert the first row to a dictionary
first_row_dict = first_row.to_dict()

# Convert the dictionary to JSON format
first_row_json = json.dumps(first_row_dict, indent=4)

# Save to a JSON file in the current directory
output_file = "first_row.json"
with open(output_file, 'w') as f:
    f.write(first_row_json)

print(f"JSON file saved as {output_file}")
