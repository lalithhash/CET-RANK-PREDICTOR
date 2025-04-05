import pandas as pd

# Load the Excel file
file_path = 'cet_colg_data.xlsx'  # Replace with your actual Excel file path
sheet_name = 'Sheet1'  # Replace with your actual sheet name if needed

# Read the Excel file
df = pd.read_excel(file_path, sheet_name=sheet_name)

# Print the column names to verify them
print("Columns in the file:", df.columns)

# Optionally, strip any whitespace from column names
df.columns = df.columns.str.strip()

# Filter rows where the Branch Code is either 'SE' or 'AE' and GM is not 0
filtered_df = df[(df['Branch code'].isin(['SE', 'AE'])) & (df['GM'] != 0)]

# Try selecting the College Name and GM columns
try:
    output_df = filtered_df[['College Name', 'GM']]

    # Sort the output by the 'GM' column in ascending order
    output_df_sorted = output_df.sort_values(by='GM', ascending=True)

    # Create a JavaScript array from the sorted 'College Name' column
    colleges = output_df_sorted['College Name'].tolist()
    js_content = f"const SE_AE = {colleges};\n"

    # Write the JavaScript array to a .js file
    js_file_path = 'se_ae_colleges.js'
    with open(js_file_path, 'w') as js_file:
        js_file.write(js_content)

    print(f"\nJavaScript file saved to: {js_file_path}")
except KeyError as e:
    print(f"Error: {e}")
