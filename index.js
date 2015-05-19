var hg = require('mercury')
var render = require('./render.js')
var WeiFund = require('./weifund.js')
var Campaign = require('./lib/campaign.js')
require('./config.js')(WeiFund)
var web3 = global.web3


app = App()
campaignStore = []
var newCampaign = null
loadInitialCampaigns()

hg.app(document.body, app, render)

// debug
w = WeiFund


function App() {
  var state = hg.state({
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
  }

  function submitCampaign(state, event) {
    var formElement = event.target.parentNode.parentNode
    var data = parseForm(formElement)

    WeiFund.contract.newCampaign(
      data.title,
      data.website,
      data.video,
      data.beneficiary,
      data.goal,
      data.timelimit,
      data.category,
      {
        from: web3.eth.accounts[0],
        gas: this.defaultGas,
        gasPrice: web3.eth.gasPrice,
      },
    function(){

      debugger

    })

    state.showForm.set(false)
  }

  return state
}

function loadInitialCampaigns() {
  WeiFund.contract.numCampaigns(function(err, result){
    if (err) throw err

    var count = result.toNumber()
    var maxCount = 10
    count = (count > maxCount) ? maxCount : count
    for (var i = 0; i < count; i++) {
      var campaign = new Campaign({
        contract: WeiFund.contract,
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