var hg = require('mercury')
var h = require('mercury').h

module.exports = render


function render(state) {
  var content = [ appHeader(state) ]

  if (state.showForm) {
    content.push(newCampaignForm(state))
  }

  content.push(h('.campaigns-container', state.campaigns.map(CampaignListing)))

  return h('div', content)
}

function appHeader(state) {
  return h('.app-header', [
    h('h1.text-center', 'Dao ☯ Fund'),
    h('button.btn.btn-outline', { 'ev-click': state.channels.showNewCampaign }, 'start your project!'),
  ])
}

function newCampaignForm(app) {
  var state = app.newCampaign
  return h('.form.content-panel', [
    h('.campaign-header', [
      h('input', { name: 'title', type: 'text', value: state.title }),
    ]),
    h('progress', {value: '0', max: '100'}),
    h('.campaign-content', [
      h('table',[
        h('thead', ['funding progress', 'days remaining:', 'funding goal:', 'backers:'].map(function(label){ return h('th', label) })),
        h('tbody', 
          h('tr', [
            h('td', '0%'),
            h('td', h('input', { name: 'daysToGo', type: 'number', value: '100' })),
            h('td', [h('input', { name: 'goal', type: 'number', value: '100' }), 'ETH']),
            h('td', '0'),
          ])
        ),
      ]),
      h('button.btn.btn-outline', { 'ev-click': app.channels.submitCampaign }, 'submit project'),
    ]),
  ])
}

function CampaignListing(state) {
  return h('.content-panel.campaign-panel', [
    h('.campaign-header', [
      h('h2', state.title),
      h('button.btn.btn-outline', { 'ev-click': state.channels.contributeOne }, 'fund!'),
    ]),
    h('progress', {value: state.progress, max: '100'}),
    h('.campaign-content', [
      renderTable(
        ['funding progress', 'days remaining:', 'funding goal:', 'backers:'],
        [[state.progress+'%', state.daysToGo, state.goal+' ETH', state.backers]]
      ),
    ]),
  ])
}

function renderTable(labels, data) {
  return h('table',[
    h('thead', labels.map(function(label){
      return h('th', label)
    })),
    h('tbody', data.map(function(row){
      return h('tr', row.map(function(cell){
        var value = cell && cell.toString && cell.toString()
        return h('td', value)
      }))
    })),
  ])
}