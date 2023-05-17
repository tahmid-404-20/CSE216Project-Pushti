import csv
import sys
import pandas as pd
from collections import OrderedDict

def getUniqueItems(iterable):
    result = []
    for item in iterable:
        if item not in result:
            result.append(item)
    return result


data=pd.read_csv('test.csv')

# trimming
data.replace('^\s+', '', regex=True, inplace=True) #front
data.replace('\s+$', '', regex=True, inplace=True) #end


print(type(data['Division']))

indexes = [];
for i, row in data.iterrows():
    if(row['Division'] == 'Division'):
        indexes.append(i)

data = data.drop(data.index[indexes])

f = open("list_union_modified.txt", "w")
# divisions_file = open('')

f.write('Division' + ',' + 'District' + ',' + 'Upazilla' + ',' + 'Union_Parishad' + "\n")
for i, row in data.iterrows():
    f.write(str(row['Division']).upper() + ',' + str(row['District']).upper() + ',' + str(row['Upazilla_Name']).upper() + ',' + str(row['Union_Parishad_Name']).upper() + "\n")

# print(data)

# print(data[data.columns[0]])
# print(type(data[data.columns[0]]))

# x = data[data.columns[0]].tolist();
x = data['Division'].tolist();

# for row in x:
#     if row == 'Division':
#         x.remove(row)


# print(data['Division'])
# print(type(data['Division']))
# x= data['Division']
#
# print(x);

# divisions = list(set(x))
divisions = getUniqueItems(x);
# for p in x:
#     if p not in divisions:
#         divisions.append(x)

print(divisions);
# count = 1;
# for row in csv_file:
#     #if current rows 2nd value is equal to input, print that row
#     if 'Division' == row[0]:
#          print (count + " " + row)
#          count += 1;
#
#     print(row);
