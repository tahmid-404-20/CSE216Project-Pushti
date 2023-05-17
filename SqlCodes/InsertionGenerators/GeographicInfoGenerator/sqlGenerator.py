import pandas as pd
from collections import OrderedDict

def getUniqueItems(iterable):
    result = []
    for item in iterable:
        if item not in result:
            result.append(item)
    return result

# Generate division_map
f_div = open('division_list.txt', 'r');
lines_div = f_div.readlines()
division_map = {}
for line in lines_div:
    arr = line.split(',')
    division_map[str(arr[1][0:-1])] = arr[0]

# Generate district_map
f_div = open('district_list.txt', 'r')
lines_dist = f_div.readlines()
district_map = {}
for line in lines_dist:
    arr = line.split(',')
    district_map[str(arr[1][0:-1])] = arr[0]

# Generate upazilla_map
f_div = open('upazilla_list.txt', 'r')
lines_upz = f_div.readlines()
upazilla_map = {}
for line in lines_upz:
    arr = line.split(',')
    upazilla_map[str(arr[1][0:-1])] = arr[0]

# Generate up_map
f_div = open('up_list.txt', 'r')
lines_up = f_div.readlines()
up_map = {}
for line in lines_up:
    arr = line.split(',')
    up_map[str(arr[1][0:-1])] = arr[0]

# Writing to file starts
data= pd.read_csv('list_union_modified.csv')

# write division info
f_division = open('sql_division_insertion.txt','w')
for line in lines_div:
    arr = line.split(',');
    f_division.write("INSERT INTO Division VALUES({},'{}');\n".format(arr[0],str(arr[1][0:-1])))


# write district info
dist_info_list = []
for i, row in data.iterrows():
    if (str(row['District']), str(row['Division'])) not in dist_info_list:
        dist_info_list.append((str(row['District']), str(row['Division'])))

f_district = open('sql_district_insertion.txt','w')
for dist in dist_info_list:
    f_district.write("INSERT INTO District VALUES({},'{}',{});\n".format(district_map[dist[0]], dist[0], division_map[dist[1]]))

#  write upazilla info
upz_info_list = []
for i, row in data.iterrows():
    if (str(row['Upazilla']), str(row['District'])) not in upz_info_list:
        upz_info_list.append((str(row['Upazilla']), str(row['District'])))

f_upz = open('sql_upazilla_insertion.txt','w')
for upz in upz_info_list:
    f_upz.write("INSERT INTO Upazilla VALUES({},'{}',{});\n".format(upazilla_map[upz[0]], upz[0], district_map[upz[1]]))

# write up up info
up_info_list = []
for i, row in data.iterrows():
    if (str(row['Union_Parishad']), str(row['Upazilla'])) not in up_info_list:
        up_info_list.append((str(row['Union_Parishad']), str(row['Upazilla'])))

f_up = open('sql_up_insertion.txt','w')
for up in up_info_list:
    f_up.write("INSERT INTO UnionParishad VALUES({},'{}', 50000000, {});\n".format(up_map[up[0]], up[0], upazilla_map[up[1]]))
