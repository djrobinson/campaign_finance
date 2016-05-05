export var TITLES: Title[] = [
    {"id": 1, "name": "Candidates", "link": "/candidates", "routes":
        [
            {"id": 1, "name": "/api/candidates/"},
            {"id": 2, "name": "/api/candidates/{candidate_id}"},
            {"id": 3, "name": "/api/candidates/sort/{column_name}"},
            {"id": 4, "name": "/api/candidates/{candidate_id}/committees"}
        ]
    },
    {"id": 2, "name": "Contributions", "link": "/candidates"},
    {"id": 3, "name": "Committee Transfers", "link": "/candidates"},
    {"id": 4, "name": "Committees", "link": "/candidates"},
    {"id": 5, "name": "Disbursements", "link": "/candidates"},
    {"id": 6, "name": "Individual Contributions", "link": "/candidates"},
    {"id": 7, "name": "Committee Opex", "link": "/candidates"},
    {"id": 8, "name": "PAC Expenditures", "link": "/candidates"},
    {"id": 9, "name": "Congressional Votes", "link": "/candidates"},
    {"id": 10, "name": "Legislators", "link": "/candidates"}
];