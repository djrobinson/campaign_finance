import csv
import requests
from BeautifulSoup import BeautifulSoup

# url = 'http://fec.gov/finance/disclosure/metadata/MetadataforCommitteeReportbyReportSummary.shtml'
# url = 'http://fec.gov/finance/disclosure/metadata/metadataforcandidatesummary.shtml'
# url = 'http://fec.gov/finance/disclosure/metadata/metadataforcommitteesummary.shtml'
# url = 'http://fec.gov/finance/disclosure/metadata/electioneeringcommunications.shtml'
# url = 'http://fec.gov/finance/disclosure/metadata/metadataforindependentexpenditures.shtml'
url = 'http://fec.gov/finance/disclosure/metadata/metadataLeadershipPacList.shtml'
response = requests.get(url)
html = response.content

soup = BeautifulSoup(html)
table = soup.find('table')

list_of_rows = []
for row in table.findAll('tr'):
    list_of_cells = []
    for cell in row.findAll('td'):
        text = cell.text.replace('&nbsp;', '')
        list_of_cells.append('table.string(\''+text+'\');')
    list_of_rows.append(list_of_cells)

outfile = open("./leadershipPacs.csv", "wb")
writer = csv.writer(outfile)
writer.writerows(list_of_rows)