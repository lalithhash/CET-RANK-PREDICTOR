import pandas as pd
import json

# Load the Excel file
file_path = "cet_colg_data.xlsx"  # Replace with your file path
df = pd.read_excel(file_path)

# Get unique branch names and branch codes``
unique_branches = df[['Branch Name', 'Branch code']].drop_duplicates()

# Convert to JSON format
branch_json = unique_branches.to_dict(orient='records')

# Save to a JSON file in the current directory
output_file = "unique_branches.json"
with open(output_file, 'w') as f:
    json.dump(branch_json, f, indent=4)

print(f"JSON file saved as {output_file}")
