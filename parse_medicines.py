import csv
import json

# List of all your CSV files
files = [
    "Product List_11_4_2025 @ 22_10_17.csv",
    "Product List_11_4_2025 @ 22_10_8.csv",
    "Product List_11_4_2025 @ 22_10_0.csv",
    "Product List_11_4_2025 @ 22_9_55.csv",
    "Product List_11_4_2025 @ 22_9_48.csv",
    "Product List_11_4_2025 @ 22_9_10.csv",
    "Product List_11_4_2025 @ 22_8_23.csv"
]

# List to store all medicine names
medicine_names = []

# Go through each file
for file_name in files:
    try:
        with open(file_name, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                # Update column name based on your CSV format
                name = row.get("Generic Name")  # or "Product Name" if applicable
                if name:
                    medicine_names.append(name.strip())
    except FileNotFoundError:
        print(f"❌ File not found: {file_name}")
    except Exception as e:
        print(f"⚠️ Error in {file_name}: {e}")

# Print result
#print("✅ Total medicines collected:", len(medicine_names))
#print("🧪 Sample medicine names:")
#for med in medicine_names[:10]:  # Print first 10 as a sample
 #   print("-", med)

# Save the list to a JSON file
with open("medicine_names.json", "w", encoding="utf-8") as json_file:
    json.dump(medicine_names, json_file, indent=2, ensure_ascii=False)

print("💾 Medicine names saved to 'medicine_names.json'")
