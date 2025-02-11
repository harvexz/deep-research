import csv


def calculate_cost(file_path='tokens.csv'):
    total_input_tokens = 0
    total_output_tokens = 0

    try:
        with open(file_path, mode='r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header

            for row in reader:
                if len(row) >= 2:
                    # Convert to float first, then to int after truncation
                    total_input_tokens += int(float(row[0]))
                    total_output_tokens += int(float(row[1]))

        print(f"Input: {total_input_tokens}")
        print(f"Output: {total_output_tokens}")
        input_cost = (total_input_tokens / 1_000_000) * 1.10
        output_cost = (total_output_tokens / 1_000_000) * 4.40
        cost = input_cost + output_cost

        print(f"Total Cost: ${cost:.4f}")
        return cost

    except FileNotFoundError:
        print("tokens.csv file not found.")
        return 0


if __name__ == "__main__":

    print("\n#################### Cost This Run ####################")
    this_run = calculate_cost(file_path='tokens.csv')
    print("########################################################")
    
    print("\n##################### Cost Total ######################")
    total = calculate_cost(file_path='total.csv')
    print("########################################################")
