import seaborn as sns
import matplotlib.pyplot as plt

data = {
    "A": [1, 2, 3, 4, 5, 6],
    "B": [1, 2, 3, 4, 5, 6],
}



var = sns.relplot(
    data=data,
    x="A",
    y="B",
)

plt.show()