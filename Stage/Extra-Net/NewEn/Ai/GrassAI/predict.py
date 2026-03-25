import sys
from joblib import load

knn = load("NeuralNetworks/" + sys.argv[1])

data = list(map(float, sys.argv[2:]))

prediction = knn.predict([data])[0]

print(prediction)