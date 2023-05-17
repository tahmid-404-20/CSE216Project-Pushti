Save merged_union_list.xlsx file as test.csv first

Then, you need to run the following scripts scrictly following the order
processingCsv.py(uses test.csv) -> Generates list_union_modified.txt --> convert it to .csv
listMaker.py -> Generates list of divisions, districts, upazillas and ups
sqlGenerator.py -> generates insertion codes, remove underscore from the files (Use regex)
Done
