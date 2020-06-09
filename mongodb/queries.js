db = db.getMongo().getDB('yager')

// Contratos com alguma cláusula milionária
const clauses_millionaire_charge = db.clauses.find({
    "payment.base_charge": {
        $regex: /R\$ [0-9]{7,9}\.[0-9]{2}/g
    }
},
    { _id: 1 }
)

let millionaire_clauses_id = []
clauses_millionaire_charge.forEach(clause => {
    millionaire_clauses_id.push(clause._id)
})

const result1 = db.contracts.find({
    applied_clauses: {
        $elemMatch: {
            clause_id: {
                $in: millionaire_clauses_id
            }
        }
    }
})

// Contratos sem cobranças aplicadas (applied_payment)
const clauses_no_ap = db.clauses.find({
    $or: [
        {
            appliedPayments: {
                $exists: false
            }
        },
        {
            appliedPayments: {
                $eq: []
            }
        },
    ]
}, { _id: 1 })

let clauses_no_ap_ids = []
clauses_no_ap.forEach(clause => {
    clauses_no_ap_ids.push(clause._id)
})

const result2 = db.contracts.find({
    applied_clauses: {
        $elemMatch: {
            clause_id: {
                $in: clauses_no_ap_ids
            }
        }
    }
})

// Contratos sem cobranças previstas (base_charge)
const clauses_no_bc = db.clauses.find({
    "payment.base_charge": {
        $exists: false
    }
}, { _id: 1 })

let clauses_no_bc_ids = []
clauses_no_bc.forEach(clause => {
    clauses_no_bc_ids.push(clause._id)
})

const result3 = db.contracts.find({
    applied_clauses: {
        $elemMatch: {
            clause_id: { $in: clauses_no_bc_ids }
        }
    }
})


// Número de contratos com extensões de vigência
result4 = db.contracts.aggregate([
    {
        $match: {
            extensions: {
                $exists: true,
                $ne: []
            }
        }
    },
    {
        $count: "Number of contracts that have been extended"
    }
])

// Número de contratos em que cada parte participa
result5 = db.contracts.aggregate([
    {
        $facet: {
            party_a_count: [{ $sortByCount: "$party_a" }],
            party_b_count: [{ $sortByCount: "$party_b" }]
        }
    },
    {
        $project: {
            party_count: { $concatArrays: ["$party_a_count", "$party_b_count"] }
        }
    },
    {
        $unwind: "$party_count"
    },
    {
        $project: {
            _id: "$party_count._id",
            count: "$party_count.count"
        }
    },
    {
        $group: {
            _id: "$_id",
            contracts: { $sum: "$count" }
        }
    },
    {
        $sort: { _id: 1 }
    }
])

result = result5
while (result.hasNext()) {
    printjson(result.next())
}