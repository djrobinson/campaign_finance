export var TITLES: Title[] = [
    {"id": 1, "name": "Candidates", "link": "/candidates", "routes":
        [
            {"id": 1, "name": "/api/candidates/", "test": "/api/candidates"},
            {"id": 2, "name": "/api/candidates/{candidate_id}", "test": "/api/candidates/P00003392"},
            {"id": 3, "name": "/api/candidates/sort/{column_name}", "test": "/api/candidates/sort/cas_on_han_clo_of_per"},
            {"id": 4, "name": "/api/candidates/{candidate_id}/committees", "test": "/api/candidates/P00003392/committees"}
        ]
    },
    {"id": 2, "name": "Contributions", "link": "/contributions", "routes":
        [
            {"id": 1, "name": "/api/contributions/", "test": "/api/contributions"},
            {"id": 2, "name": "/api/contributions/{candidate_id}/candidate", "test": "/api/contributions/P00003392/candidate"},
            {"id": 3, "name": "/api/contributions/{committee_id}/committee", "test": "/api/contributions/C00571372/committee"}
        ]
    },
    {"id": 3, "name": "Committee Transfers", "link": "/candidates", "routes":
        [
            {"id": 1, "name": "/api/transfers/", "test": "/api/transfers"},
            {"id": 2, "name": "/api/transfers/{committee_id}/contributor", "test": "/api/transfers/C00571372/contributor"},
            {"id": 3, "name": "/api/transfers/{committee_id}/recipient", "test": "/api/contributions/C00571372/committee"}
        ]
    },
    {"id": 4, "name": "Committees", "link": "/committees", "routes":
        [
            {"id": 1, "name": "/api/committees/", "test": "/api/transfers"},
            {"id": 2, "name": "/api/committees/{committee_id}", "test": "/api/committees/C00571372"},
            {"id": 3, "name": "/api/committees/sort/{column_name}", "test": "/api/committees/sort/"}
        ]
    },
    {"id": 5, "name": "Disbursements", "link": "/candidates"},
    {"id": 6, "name": "Individual Contributions", "link": "/candidates"},
    {"id": 7, "name": "Committee Opex", "link": "/candidates"},
    {"id": 8, "name": "PAC Expenditures", "link": "/candidates"},
    {"id": 9, "name": "Congressional Votes", "link": "/candidates"},
    {"id": 10, "name": "Legislators", "link": "/candidates"}
];