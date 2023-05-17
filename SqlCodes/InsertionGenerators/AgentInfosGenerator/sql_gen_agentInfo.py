import csv
import sys
import pandas as pd
from collections import OrderedDict
import random


data=pd.read_csv('credentials.csv')

# trimming
data.replace('^\s+', '', regex=True, inplace=True) #front
data.replace('\s+$', '', regex=True, inplace=True) #end

#reading txt
f = open('names.txt', 'r');
names = f.readlines()
f.close()
nNames = len(names)

f = open('permanent_address.txt', 'r');
adress = f.readlines()
f.close()
nAdress = len(adress)

#reading csv
nOfUnion = 4552
count =1;
f_agent = open('sql_agent_insertion.txt','w')
for i, row in data.iterrows():
    if(count <= nOfUnion):
        id = row["id"]
        name = names[random.randint(0,nNames-1)]
        password = row["password"]
        dob = row["dob"]
        phone = str("0") + str(row["phoneNo"])
        adr = adress[random.randint(0,nAdress-1)]
        union_id = int(row["Union_id"])
        f_agent.write("INSERT INTO Agent VALUES({},'{}', '{}', '{}', '{}', '{}', {});\n".format(id,name[0:-1],password, dob, phone, adr[0:-1], union_id))
        count += 1
