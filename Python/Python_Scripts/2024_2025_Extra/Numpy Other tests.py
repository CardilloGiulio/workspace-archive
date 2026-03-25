import numpy as np

data = np.array([
    [1971, 0.74], [1921, 0.64],
])
years, values = data.T
years = years + values
values = values + years
print(years, values)