// Applied Payment

db = db.getMongo().getDB('yager')

payments = [
  {
    _id: 'payment1',
    charge_date: '2011-09-03T03:00:00.000Z',
    payment_date: '2014-02-28T03:00:00.000Z'
  },
  {
    _id: 'payment2',
    extra_charge: 1667.77,
    charge_date: '2012-07-06T03:00:00.000Z',
    payment_date: '2012-07-07T03:00:00.000Z'
  },
  {
    _id: 'payment3',
    extra_charge: 1882.4, charge_date: '2019-07-13T03:00:00.000Z'
  },
  {
    _id: 'payment4',
    extra_charge: 687.29, charge_date: '2019-05-11T03:00:00.000Z'
  },
  {
    _id: 'payment5',
    extra_charge: 4490.81,
    charge_date: '2014-07-02T03:00:00.000Z',
    payment_date: '2015-08-27T03:00:00.000Z'
  },
  {
    _id: 'payment6',
    charge_date: '2019-04-04T03:00:00.000Z'
  },
  {
    _id: 'payment7',
    charge_date: '2011-07-06T03:00:00.000Z',
    payment_date: '2011-07-19T03:00:00.000Z'
  }
]

db.appliedPayments.insertMany(payments)