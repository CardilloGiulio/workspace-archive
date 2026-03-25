from pandas import read_csv
from sklearn.neighbors import KNeighborsClassifier

dataset = read_csv("iris_senza_uno_di_ognuno.csv")

values = dataset.values

parameters_number = values[0].size - 1

X = dataset.iloc[:, 0:parameters_number].astype(float).values
Y = values[:, parameters_number]

knn = KNeighborsClassifier()
knn.fit(X, Y)

data = [5.1, 3.5, 1.4, 0.2]

prediction = knn.predict([data])[0]

print(prediction)