import os
import shutil
import re


def rename_and_copy_files(source_dir, output_dir):
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Regex to match the filename pattern and extract parts
    pattern = re.compile(r".*_(\d{3})_(\d+).png")

    # List to hold the speed data
    speeds = []

    # Sort files to ensure they're processed in numerical order
    for filename in sorted(os.listdir(source_dir)):
        match = pattern.match(filename)
        if match:
            frame_number, speed = match.groups()

            # Create new filename and copy it to the output directory
            new_filename = f"{frame_number}.png"
            shutil.copyfile(os.path.join(source_dir, filename),
                            os.path.join(output_dir, new_filename))

            # Append speed data to the list
            speeds.append({'speed': int(speed)})

    # Print the speeds in console
    print(speeds)


# Reading paths from the user
source_dir = input("Enter the path to the source directory: ")
output_dir = input("Enter the path to the output directory: ")


rename_and_copy_files(source_dir, output_dir)
""" rename_and_copy_files(source_dir+"\\C_happy", output_dir+"\\happy\\1")
rename_and_copy_files(source_dir+"\\C_Nomal", output_dir+"\\normal\\1")
rename_and_copy_files(source_dir+"\\C_Ill", output_dir+"\\ill\\1") """
