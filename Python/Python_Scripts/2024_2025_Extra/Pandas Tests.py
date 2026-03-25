import pandas as pd

data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age':  [25, 30, 35],
    'City': ['New York', 'Paris', 'London'],
}
data2 = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age':  [25, 30, 35],
    'City': ['New York', 'Paris', None],
}
data_list = [1, 2, 3, 4, 5]

def test_Pandas():
    scheme1 = pd.DataFrame(data)
    scheme2 = pd.DataFrame(data2)
    list1 = pd.Series(data_list, index=['a', 'b', 'c', 'd', 'e'])
    print(scheme1)
    print(list1)
    print(list1.head(2))
    print(list1.tail(2))
    print(scheme1.info())
    print(scheme1.describe())
    print(scheme1 + scheme2)
    print(list1 + list1)
    print(list1 + 10)   
    print(scheme1.loc[0])
    print(scheme1.iloc[0:2])
    print(scheme1.loc[:, 'Name'])
    print(scheme2)
    print(scheme2.isnull())
    print(scheme2.fillna('Unknown'))
    print(scheme2)

test_Pandas()