import pandas as pd
from collections import OrderedDict

def getUniqueItems(iterable):
    result = []
    for item in iterable:
        if item not in result:
            result.append(item)
    return result

data= pd.read_csv('list_union_modified.csv')

# division writer
division_list = data['Division'].tolist();
division_list_unique = getUniqueItems(division_list);
f_div = open('division_list.txt', "w")
id = 1
for div in division_list_unique:
    f_div.write(str(id) + ',' + div + "\n")
    id += 1

#district writer
district_list = data['District'].tolist();
district_list_unique = getUniqueItems(district_list);
f_dist = open('district_list.txt', "w")
id = 1
for div in district_list_unique:
    f_dist.write(str(id) + ',' + div + "\n")
    id += 1

# upazilla writer
upazilla_list = data['Upazilla'].tolist();
upazilla_list_unique = getUniqueItems(upazilla_list);
f_upazilla = open('upazilla_list.txt', "w")
id = 1
for div in upazilla_list_unique:
    f_upazilla.write(str(id) + ',' + div + "\n")
    id += 1

# up writer
up_list = data['Union_Parishad'].tolist();
up_list_unique = getUniqueItems(up_list);
f = open('up_list.txt', "w")
id = 1
for div in up_list_unique:
    f.write(str(id) + ',' + div + "\n")
    id += 1
