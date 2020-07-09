// Applied Payment

db = db.getMongo().getDB('yager')

payments = [
  {
    _id: 'payment1',
    chargeDate: '2011-09-03T03:00:00.000Z',
    paymentDate: '2014-02-28T03:00:00.000Z'
  },
  {
    _id: 'payment2',
    extraCharge: 1667.77,
    chargeDate: '2012-07-06T03:00:00.000Z',
    paymentDate: '2012-07-07T03:00:00.000Z'
  },
  {
    _id: 'payment3',
    extraCharge: 1882.4, chargeDate: '2019-07-13T03:00:00.000Z'
  },
  {
    _id: 'payment4',
    extraCharge: 687.29, chargeDate: '2019-05-11T03:00:00.000Z'
  },
  {
    _id: 'payment5',
    extraCharge: 4490.81,
    chargeDate: '2014-07-02T03:00:00.000Z',
    paymentDate: '2015-08-27T03:00:00.000Z'
  },
  {
    _id: 'payment6',
    chargeDate: '2019-04-04T03:00:00.000Z'
  },
  {
    _id: 'payment7',
    chargeDate: '2011-07-06T03:00:00.000Z',
    paymentDate: '2011-07-19T03:00:00.000Z'
  }
]

db.appliedPayments.insertMany(payments)