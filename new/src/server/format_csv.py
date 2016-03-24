import csv

csv.register_dialect('pipes', delimiter='|')
out = open('test.csv', 'wt')
writer = csv.writer(out)

with open('candidateMaster.txt', 'r') as f:
    reader = csv.reader(f, dialect='pipes')
    for row in reader:
        writer.writerow(row)