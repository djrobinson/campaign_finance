API Notes for App:

Presidential Candidate Overview:
http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/totals.json

Presidential Canidate Details:
http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/candidates/clinton.json

Electronic Filing Search:
http://api.nytimes.com/svc/elections/us/v3/finances/2016/filings/search.json?query=C00540997
//will return the required filing IDs to return each id with the next query

Presidential Filing Details:
http://api.nytimes.com/svc/elections/us/v3/finances/2016/filings/1020114.json


Independent Expenditure only committees (lists superpacs):
http://api.nytimes.com/svc/elections/us/v3/finances/2016/committees/superpacs.json

Presidential Independent Expenditures: Shows major expenditures by candidate:
http://api.nytimes.com/svc/elections/us/v3/finances/2016/president/independent_expenditures.json?

Committee Contributions to a Candidate:
http://api.nytimes.com/svc/elections/us/{version}/finances/{campaign-cycle}/committees/{fec-id}/contributions/candidates/{candidate-id}[.response-format]?api-key={your-API-key}[&callback={callback-function}]

Top 20 Individual Contributions by presidential filing:
http://api.nytimes.com/svc/elections/us/{version}/finances/{campaign-cycle}/contributions/filing/{filing-id}[.response-format]?api-key={your-API-key}[&callback={callback-function}]

Contributions Opposing or supporting a candidate:
http://api.nytimes.com/svc/elections/us/v3/finances/2016/candidates/P60006111/independent_expenditures.json

Committe Details:
http://api.nytimes.com/svc/elections/us/v3/finances/2016/committees/C00581777.json

Individual contributions to a candidate (w/ ted cruz) (returns the filing IDs to use in Pres Filing Details):
http://api.nytimes.com/svc/elections/us/v3/finances/2016/contributions/candidate/P60006111.json

Contributions to a Committe (or PAC. Showing Koch industries):
http://api.nytimes.com/svc/elections/us/v3/finances/2016/contributions/committee/C00236489.json

Independent expenditures for a given race by committee:
http://api.nytimes.com/svc/elections/us/{version}/finances/{campaign-cycle}/committees/{fec-id}/independent_expenditures/races[.response-format]?api-key={your-API-key}[&callback={callback-function}]

