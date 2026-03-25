import numpy as np

array = np.array([1, 2], [3, 4], [5, 6],)

a, b = np.array_split(array, 2)

print(a)
print(b)