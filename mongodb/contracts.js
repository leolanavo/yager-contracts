
db = db.getMongo().getDB('yager');

contracts = [
  {
    "party_a": 2,
    "party_b": 6,
    "start_date": "2014-09-15T00:00:00.000Z",
    "end_date": "2016-04-25T00:00:00.000Z",
    "extensions": [
      {
        "date": "2015-06-24T00:00:00.000Z",
        "new_end_date": "2017-01-05T00:00:00.000Z"
      }
    ],
    "applied_clauses": [
      {
        "application_date": "2014-09-15T00:00:00.000Z",
        "delay_tolerance": 21,
        "recisory": false,
        "clause_id": "clause2",
      },
      {
        "application_date": "2015-07-17T00:00:00.000Z",
        "number_notifications": 2,
        "recisory": false,
        "clause_id": "clause7",
        "notifications": [
          {
            "notification_date": "2015-10-23T00:00:00.000Z"
          }
        ]
      }
    ]
  },
  {
    "party_a": 3,
    "party_b": 1,
    "start_date": "2016-05-12T00:00:00.000Z",
    "end_date": "2018-06-29T00:00:00.000Z",
    "applied_clauses": [
      {
        "application_date": "2018-12-03T00:00:00.000Z",
        "number_notifications": 2,
        "recisory": true,
        "clause_id": "clause18",
        "notifications": [
          {
            "notification_date": "2016-05-20T00:00:00.000Z"
          }
        ]
      }
    ]
  },
  {
    "party_a": 1,
    "party_b": 6,
    "start_date": "2014-03-25T00:00:00.000Z",
    "end_date": "2020-09-15T00:00:00.000Z",
    "applied_clauses": [
      {
        "application_date": "2014-03-25T00:00:00.000Z",
        "recisory": true,
        "clause_id": "clause3",
      },
      {
        "application_date": "2018-12-03T00:00:00.000Z",
        "recisory": true,
        "clause_id": "clause16",
      }
    ]
  },
  {
    "party_a": 4,
    "party_b": 2,
    "start_date": "2019-01-01T00:00:00.000Z",
    "end_date": "2019-07-01T00:00:00.000Z",
    "extensions": [
      {
        "date": "2019-06-01T00:00:00.000Z",
        "new_end_date": "2020-01-01T00:00:00.000Z"
      }
    ],
    "applied_clauses": [
      {
        "application_date": "2019-01-01T00:00:00.000Z",
        "number_notifications": 1,
        "recisory": false,
        "clause_id": "clause5",
      }
    ]
  },
  {
    "party_a": 4,
    "party_b": 6,
    "start_date": "2018-01-15T00:00:00.000Z",
    "end_date": "2019-06-15T00:00:00.000Z",
    "applied_clauses": [
      {
        "application_date": "2018-01-15T00:00:00.000Z",
        "number_notifications": 1,
        "recisory": true,
        "clause_id": "clause12",
      }
    ]
  },
  {
    "party_a": 2,
    "party_b": 1,
    "start_date": "2019-01-01T00:00:00.000Z",
    "end_date": "2019-07-01T00:00:00.000Z",
    "extensions": [
      {
        "date": "2019-06-01T00:00:00.000Z",
        "new_end_date": "2020-01-01T00:00:00.000Z"
      },
      {
        "date": "2019-11-01T00:00:00.000Z",
        "new_end_date": "2022-01-01T00:00:00.000Z"
      }
    ],
    "applied_clauses": [
      {
        "application_date": "2019-01-01T00:00:00.000Z",
        "number_notifications": 1,
        "recisory": false,
        "clause_id": "clause13",
      }
    ]
  },
  {
    "party_a": 6,
    "party_b": 3,
    "start_date": "2020-01-01T00:00:00.000Z",
    "end_date": "2025-01-01T00:00:00.000Z",
    "applied_clauses": [
      {
        "application_date": "2020-01-01T00:00:00.000Z",
        "number_notifications": 1,
        "recisory": true,
        "clause_id": "clause14",
      }
    ]
  },
]

db.contracts.insertMany(contracts)