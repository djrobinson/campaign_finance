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
            {"id": 3, "name": "/api/committees/sort/{column_name}", "test": "/api/committees/sort/tot_con"}
        ]
    },
    {"id": 5, "name": "Disbursements", "link": "/candidates", "routes":
        [
            {"id": 1, "name": "/api/disbursements/", "test": "/api/transfers"},
            {"id": 2, "name": "/api/disbursements/{candidate_id}/candidate", "test": "/api/disbursements/S6AL00013/candidate"},
            {"id": 3, "name": "/api/disbursements/type/{category_code}", "test": "/api/disbursements/type/1"},
            {"id": 4, "name": "/api/disbursements/{candidate_id}/candidate/type", "test": "/api/disbursements/S6AL00013/candidate/type"},
            {"id": 5, "name": "/api/disbursements/{candidate_id}/candidate/purpose", "test": "/api/disbursements/S6AL00013/candidate/purpose"},
            {"id": 6, "name": "/api/disbursements/{candidate_id}/candidate/purpose", "test": "/api/disbursements/S6AL00013/candidate/purpose"},
            {"id": 7, "name": "/api/disbursements/aggregate/type", "test": "/api/disbursements/aggregate/type"},
            {"id": 8, "name": "/api/disbursements/aggregate/purpose", "test": "/api/disbursements/aggregate/purpose"},
        ]
    },
    {"id": 6, "name": "Individual Contributions", "link": "/individuals", "routes":
        [
            {"id": 1, "name": "/api/individuals/", "test": "/api/individuals"},
            {"id": 2, "name": "/api/individuals/{committee_id}/recipient", "test": "/api/individuals/C00571372/recipient"},
            {"id": 3, "name": "/api/individuals/employer", "test": "/api/individuals/employer"},
            {"id": 4, "name": "/api/individuals/occupation", "test": "/api/individuals/occupation"},
            {"id": 5, "name": "/api/individuals/committee/{committee_id}", "test": "/api/individuals/committee/C00571372"}

        ]
    },
    {"id": 7, "name": "Committee Opex", "link": "/candidates", "routes":
        [
            {"id": 1, "name": "/api/opex/", "test": "/api/opex"},
            {"id": 2, "name": "/api/opex/committee/{committee_id}", "test": "/api/opex/committee/C00571372"},
            {"id": 3, "name": "/api/opex/recipients", "test": "/api/opex/recipients"}
        ]
    },
    {"id": 8, "name": "PAC Expenditures", "link": "/pacs", "routes":
        [
            {"id": 1, "name": "/api/pac/", "test": "/api/pac"},
            {"id": 2, "name": "/api/pac/{candidate_id}/candidate", "test": "/api/pac/P00003392/candidate"},
            {"id": 3, "name": "/api/pac/{committee_id}/committee", "test": "/api/pac/C00571372/committee"},
            {"id": 4, "name": "/api/pac/{candidate_id}/support", "test": "/api/pac/P00003392/support"},
            {"id": 5, "name": "/api/pac/{candidate_id}/oppose", "test": "/api/pac/P00003392/oppose"},
            {"id": 6, "name": "/api/pac/{committee_id}/oppose/committee", "test": "/api/pac/C00571372/oppose/committee"},
            {"id": 7, "name": "/api/pac/{committee_id}/support/committee", "test": "/api/pac/C00571372/support/committee"},
            {"id": 8, "name": "/api/pac/aggregate", "test": "/api/pac/aggregate"},
            {"id": 9, "name": "/api/pac/aggregate/{candidate_id}", "test": "/api/pac/aggregate/P00003392"}

        ]
    },
    {"id": 9, "name": "Congressional Votes", "link": "/candidates"},
    {"id": 10, "name": "Legislators", "link": "/candidates"}
];