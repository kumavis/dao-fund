var hg = require('mercury')
var web3 = global.web3

module.exports = Campaign


function Campaign(opts){
  opts = opts || {}
  // setup observable state
  this.state = hg.state(this.toState())
  this.contract = opts.contract
  // instantiating via id, needs to load data
  if (this.contract && !opts.data && 'id' in opts) {
    this.id = opts.id
    this.isLoaded = false
    this.update()
  // instantiating via data, all loaded
  } else if (opts.data) {
    this.id = opts.data.id
    this.data = opts.data
    this.isLoaded = true
  }
  // if id provided, subscribe to changes
  if (this.contract && 'id' in this) {
    // this.subscribe()
  }
}

Campaign.prototype.contribute = function(value){
  this.contract.contribute(this.id, {
    from: web3.eth.accounts[0],
    value: web3.toWei(value, 'ether'),
    gas: (950000 * 3),
    gasPrice: web3.eth.gasPrice,
  }, function(err, result){
    if (err) return console.error(err)
    console.log('contribution completed (?)')
  })
}

// base class methods?

Campaign.prototype.subscribe = function(){
  var options = { _cid: this.id }
  this.contract.onContribute(options).watch(function(err){
    if (err) return console.error(err)
    this.update()
  }.bind(this))
}

Campaign.prototype.update = function(){
  this.contract.campaigns(this.id, function(err, data){
    if (err) return console.error(err)
    this.data = data
    console.log(this.id+': updating...')
    this.state.set(this.toState())
    this.isLoaded = true
  }.bind(this))
}

Campaign.prototype.toState = function(){
  var raw = this.data

  if (raw) {
    var title = raw[0].toString()
    var website = raw[1].toString()
    var video = raw[2].toString()
    var owner = raw[3].toString()
    var beneficiary = raw[4].toString()
    var timelimit = raw[5].toNumber()
    var goal_bn = raw[6]
    var pledged_bn = raw[7]
    var category = raw[8].toNumber()
    var status = raw[9].toNumber()
    var backers = raw[10].toNumber()

    var goal = web3.fromWei(goal_bn, 'ether')
    var pledged = web3.fromWei(pledged_bn, 'ether')
    
    var progress =  parseFloat(pledged_bn.dividedBy(goal_bn).round(4))*100
    // if(progress > 100 || pledged_bn.greaterThan(goal_bn)) {
    //   progress = 100
    // }
    if(progress >= 100 && status != 1) {// Payout Campaign
      status = 2 
    }
    if(status == 1) { // Campaign payedout hack.
      pledged = goal
    }
    
    var daysToGo = daysBetween(new Date(), new Date(timelimit * 1000));
  }

  return {
    title: title,
    website: website,
    video: video,
    owner: owner,
    beneficiary: beneficiary,
    timelimit: timelimit,
    goal: goal,
    pledged: pledged,
    category: category,
    status: status,
    backers: backers,

    daysToGo: daysToGo,
    progress: progress,

    channels: {
      contributeOne: this.contribute.bind(this, 1),
    }
  }
}

function daysBetween(date1, date2){
  var oneDay = 24 * 60 * 60 * 1000 // hours * minutes * seconds * milliseconds
  return Math.round(Math.abs((date2.getTime() - date1.getTime())/(oneDay)))
}