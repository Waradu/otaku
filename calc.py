def calculate_chances(input_string):
    rarities = [float(rarity.strip()) for rarity in input_string.split(',')]
    total_rarity = sum(rarities)
    percentages = [(rarity / total_rarity) * 100 for rarity in rarities]

    return percentages


if __name__ == "__main__":
    input_string = input(
        "Enter rarities separated by commas (e.g., 1, .5, 2.3, .4): ")

    chances = calculate_chances(input_string)
    for i, chance in enumerate(chances):
        expected_frequency = (chance / 100) * 10
        print(
            f"Rarity {i+1}: {chance:.2f}% - Expected to appear {expected_frequency:.2f} out of 10 times")
