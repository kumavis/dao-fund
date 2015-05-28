var hg = require('mercury')
var render = require('./render.js')
var DaoFund = require('./dao-fund.js')
var Campaign = require('./lib/campaign.js')
var web3 = global.web3

var app = App()
var campaignStore = []
var newCampaign = null
loadInitialCampaigns()

hg.app(document.body, app, render)

// debug
global.DaoFund = DaoFund
global.app = app
global.campaignStore = campaignStore


function App() {
  return hg.state({
    campaigns: hg.array([]),
    showForm: hg.value(false),
    newCampaign: hg.value(null),
    channels: {
      showNewCampaign: showNewCampaign,
      submitCampaign: submitCampaign,
    }
  })

  function showNewCampaign(state) {
    newCampaign = new Campaign()
    state.newCampaign.set(newCampaign.state)
    state.showForm.set(true)
    // empty all campaigns early so it looks intentional : P
    // when we just load everything over again later
    app.campaigns.set([])
  }

  function submitCampaign(state, event) {
    var formElement = event.target.parentNode.parentNode
    var data = parseForm(formElement)

    DaoFund.contract.newCampaign(
      data.title,
      data.website,
      data.video,
      data.beneficiary,
      data.goal,
      data.timelimit,
      data.category,
      {
        from: web3.eth.accounts[0],
        gasPrice: web3.eth.gasPrice,
      },
    function(){

      // im lazy
      loadInitialCampaigns()
      state.showForm.set(false)

    })

  }
}

function loadInitialCampaigns() {
  DaoFund.contract.numCampaigns(function(err, result){
    if (err) throw err
    if (typeof result === 'undefined') throw new Error('Bad contract address? '+DaoFund.address)

    var count = result.toNumber()
    var maxCount = 100
    count = (count > maxCount) ? maxCount : count
    for (var i = 0; i < count; i++) {
      var campaign = new Campaign({
        contract: DaoFund.contract,
        id: i,
      })
      campaignStore.push(campaign)
      app.campaigns.push(campaign.state)
    }
  })
}

function parseForm(formElement) {
  var entries = [].slice.call(formElement.getElementsByTagName('input'))
  var formData = {}
  entries.forEach(function(entry){
    var Type = (entry.type === 'number') ? Number : String
    formData[entry.name] = Type(entry.value)
  })
  var deadline = (new Date()).setDate(new Date().getDate() + formData.daysToGo)
  var timelimit = Math.floor(+deadline/1000)
  var data = {
    title: formData.title,
    website: 'https://website.com',
    beneficiary: web3.eth.accounts[0],
    goal: goal = web3.toWei(formData.goal, 'ether'),
    timelimit: timelimit,
    category: 1,
    video: 'https://youtube.com/a_cool_video',
  }
  return data
}