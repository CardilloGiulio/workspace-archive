import os
import uuid
import sys
from pandas import read_csv
from sklearn.neighbors import KNeighborsClassifier
from joblib import dump

dataset = read_csv(sys.argv[1])
values = dataset.values
parameters_number = values[0].size - 1

X = dataset.iloc[:, 0:parameters_number].astype(float).values
Y = values[:, parameters_number]

knn = KNeighborsClassifier()
knn.fit(X, Y)

os.makedirs("NeuralNetworks", exist_ok=True)

model_name = str(uuid.uuid4()) + ".joblib"
dump(knn, "NeuralNetworks/" + model_name)

print(model_name)
