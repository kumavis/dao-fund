var _ = require('underscore')
var BigNumber = require('bignumber.js')
var moment = require('moment')

var DefaultEtherUnit = 'ether'

/**
The WeiFund class containing helper functions
@class WeiFund
@constructor
**/

var WeiFund = {}

module.exports = WeiFund;

/**
The main account that will be used for transactions and setup as the from parameter.
@method (from)
**/

WeiFund.from = function(){
    return web3.eth.accounts[this.account];
};

/**
Get the number of campaigns on WeiFund, returns string.
@method (numCampaigns)
**/

WeiFund.numCampaigns = function(){
    return this.contract.numCampaigns().toNumber(10);
};


/**
Is a valid campaign id.
@method (isCampaign)
**/

WeiFund.isCampaign = function(cid){
    if(isBigNumber(cid))
        cid = cid.toNumber();
    
    if(!_.isNumber(cid))
    return false;

  if(cid < 0 || cid >= this.numCampaigns())
    return false;

    return true;
};


/**
Is valid value for donation.
@method (isValue)
**/

WeiFund.isValue = function(value){            
    if(isBigNumber(value)) // is big num
        if(value.greaterThanOrEqualTo(0))
            return true;
    
    if(!_.isUndefined(value) && _.isNumber(value) && value > 0)
        return true;
    
    return false;
};


/**
Is valid timestamp. For testing incoming timestamp data.
@method (isTimestamp)
**/

WeiFund.isTimestamp = function(value){
    if(!_.isUndefined(value))
        if(isBigNumber(value))
            value = value.toNumber();
        
    return (_.isNumber(value) && value > 0 && moment.unix(value).isValid());
};


/**
Is category id number.
@method (isCategory)
**/

WeiFund.isCategory = function(id){
    if(isBigNumber(id))
        id = id.toNumber();
    
    if(_.isUndefined(id) || !_.isNumber(id) || id < 0)
        return false;
    else
        id = parseInt(id);
    
        if(id >= 0 || id < this.numCampaigns())
            return true;
};


/**
Will return category name or id number (i.e. the array index).
@method (category)
**/

WeiFund.category = function(id_or_name){
    if(isBigNumber(id_or_name))
        id_or_name = id_or_name.toNumber();
    
    if(_.isString(id_or_name))
        return this.categories.indexOf(id_or_name);
    
    if(_.isNumber(id_or_name))
        if(id_or_name >= 0 && id_or_name < this.categories.length)
            return this.categories[id_or_name];
    
    return false;
};


/**
Deploy the WeiFund contract.
@method (deploy)
**/

WeiFund.deploy = function(){    
    var address = web3.eth.sendTransaction({from: this.from(), code: this.hex, gas: this.defaultGas, gasPrice: web3.eth.gasPrice});
    return address;
};


/**
Setup the WeiFund Contract object and instance.
@method (setup)
**/

WeiFund.setup = function(){    
    if(!_.isArray(this.abi) || !web3.isAddress(this.address))
        return false;
    
    var WeiFundObject = web3.eth.contract(this.abi);    
    this.contract = WeiFundObject.at(this.address);
};

/**
Create a new campaign.
WeiFund.newCampaign(name, website, beneficiary, goal, timelimit, category);
@method (newCampaign)
**/

WeiFund.newCampaign = function(name, website, beneficiary, goal, timelimit, category, video, config){
    // Convert Goal from Ether to Wei then BigNum
    goal = web3.toWei(goal, DefaultEtherUnit);
    goal = new BigNumber(goal);
    
    if(_.isString(timelimit))
        timelimit = parseInt(timelimit);
    
    if(_.isString(category))
        category = parseInt(category);
    
    if(_.isUndefined(beneficiary))
        beneficiary = this.from();
    
    if(!_.isString(name)
       || !_.isString(video)
       || !_.isString(website)
       || !web3.isAddress(beneficiary)
       || (!_.isEmpty(config) && !web3.isAddress(config))
       || !this.isValue(goal)
       || !_.isNumber(timelimit) 
       || !this.isCategory(category))
        throw Error('rarrr');
    
    if(timelimit <= moment().unix())
        throw Error('rarrr');
    
    if(name.length < 3 || name.length > 32 || website < 4 || website.length > 32)
        throw Error('rarrr');
    
  this.contract.newCampaign(name, website, video, beneficiary, goal.toNumber(), timelimit, category, config, {from: this.from(), gas: this.defaultGas, gasPrice: web3.eth.gasPrice});
};


/**
Donate to a campaign with id#.
@method (contribute)
**/

WeiFund.contribute = function(cid, value){
    if(_.isString(cid))
        cid = parseInt(cid);
    
    if(_.isString(value))
        value = parseInt(value);
    
    if(!this.isCampaign(cid) || !this.isValue(value))
        return false;
    
    var ether_value = web3.toWei(value, DefaultEtherUnit);
        
    this.contract.contribute(cid, {
        from: this.from(),
        value: ether_value,
        gas: (this.defaultGas * 3),
        gasPrice: web3.eth.gasPrice,
    });
    
    console.log('Transaction Data', {from: this.from(), value: ether_value, gas: this.defaultGas, gasPrice: web3.eth.gasPrice});
    
    return true;
};


/**
Refund out campaign funds from a specific campaign.
@method (refund)
**/

WeiFund.refund = function(address, cid){
    if(_.isString(cid))
        cid = parseInt(cid);
    
    if(!this.isCampaign(cid) || !web3.isAddress(address))
        return false;
    
    this.contract.sendTransaction({from: address, gas: this.defaultGas, gasPrice: web3.eth.gasPrice}).refund(cid);
    return true;
};


/**
Payout campaign contributions to benificiary address.
@method (payout)
**/

WeiFund.payout = function(cid){
    if(_.isString(cid))
        cid = parseInt(cid);
    
    if(!this.isCampaign(cid))
        return false;
    
    this.contract.sendTransaction({from: this.from(), gas: this.defaultGas, gasPrice: web3.eth.gasPrice}).payout(cid);
    return true;
};


/**
Get a specific campaign that a user has started
@method (userCampaign)
**/

WeiFund.userCampaign = function(address, u_cid){
    if(_.isNumber(u_cid) && web3.isAddress(address)){
        u_cid = parseInt(u_cid);
        var cid = this.contract.userCampaigns(address, u_cid).toNumber();
        
        if(!this.isCampaign(cid))
            return false;
        
        return this.campaign(cid);
    }
};


/**
Returns a user object, that can be used to get the users campain information.
@method (user)
**/

WeiFund.user = function(address){
    if(!web3.isAddress(address)) return false
        
    var numCampaigns = this.contract.users(address);

    if(_.isUndefined(raw) || !_.isObject(raw)) return false

    var hasCampaigns = numCampaigns > 0 ? true : false;
    
    var return_object = {
        address: address,
        numCampaigns: numCampaigns,
        hasCampaigns: hasCampaigns,
        campaign: function(u_cid){
            if(hasCampaigns && this.isCid(u_cid))
                return this.userCampaign(address, u_cid);        
        }.bind(this),
        latest: function(){
            if(hasCampaigns)
                return this.userCampaign(address, (numCampaigns - 1));
        }.bind(this),
    };
    return return_object;
}


/**
The days between two dates.
@method (days_between)
**/

WeiFund.days_between = function(date1, date2){
    var oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    return Math.round(Math.abs((date2.getTime() - date1.getTime())/(oneDay)));
};


/**
Add an http prefix to a url string.
@method (addhttp)
**/

WeiFund.addhttp = function(url){
   if (!/^(f|ht)tps?:\/\//i.test(String(url)))
      url = "http://" + String(url);
   
   return url;
};


/**
Clean up a url for dispay.
@method (cleanURL)
**/

WeiFund.cleanURL = function(string_url){
    return String(string_url).replace("http://", "").replace("https://", "").replace("www.", "");
};


/**
Will nicely display ethereum currency units from wei to a set of options.
@method (weiDisplay)
**/

WeiFund.weiDisplay = function(number, displayOption) {
    var isBigNumber = true;

    if(displayOption == undefined || displayOption === false || displayOption == null)
        displayOption = 2;    

    if(!number)
        return number;

    if(typeof number === 'string' && number.indexOf('0x') === 0)
        number = toDecimal(number);

    if(!(number instanceof BigNumber)) {
        isBigNumber = false;
        number = new BigNumber(number.toString()); // toString to prevent errors, the user have to handle giving correct bignums themselves
    }

    //var arr = ['wie', ['kwei', 1000], ['mwei', 1000000], ['gwei', 1000000000], ['szabo', 1000000000000], ['finney', 1000000000000000], ['ether', 1000000000000000000], ['kether', 1000000000000000000000], ['mether', 1000000000000000000000000], ['gether', 1000000000000000000000000000], ['tether', 1000000000000000000000000000000]];
    var arr1 = ['w', 'Mw', 'Sz', 'Fi', 'E', 'gE', 'tE']; // 1 letter display
    var arr4 = ['wie', 'mwei', 'szb', 'fin', 'eth', 'geth', 'teth']; // 4 letter display
    var arr = [['wie', 1], ['mwei', 1000000], ['szabo', 1000000000000], ['finney', 1000000000000000], ['ether', 1000000000000000000], ['gether', 1000000000000000000000000000], ['tether', 1000000000000000000000000000000]]; // full display
    var den = '';

    if(parseInt(number) > 0){
        for(var i = arr.length - 1; i >= 0; i --)
        {
            var num = number.dividedBy(arr[i][1]);
            if(num >= 1){
                den = String(Math.round(num * 1000) / 1000) + ' ' + (displayOption == 0 ? arr1[i][0] : (displayOption == 1 ? arr4[i][0] : arr[i][0]));
                break;
            }
        }
    }else{
        den = '0 ether';  
    }

    return den;
};

/**
Get WeiFund campaign data and return it as an object.
@method (onNewCampaign)
**/

WeiFund.onNewCampaign = function(from, eventFunction){
    var options = {}; //{_cid: cid};

    if(!_.isUndefined(from) && _.isString(from) && web3.isAddress(from))
        options._from = from;

    WeiFund.contract.onNewCampaign(options, {from: WeiFund.from()}).watch(_.bind(function(eventFunction){ 
        var user = WeiFund.user(WeiFund.from());
        var latestCampaign = user.latest();
        
        eventFunction(latestCampaign);
    }, this, eventFunction));
};

/**
Get WeiFund campaign data and return it as an object.
@method (campaign)
**/

WeiFund.campaign = function(cid){    
    if(_.isString(cid))
        cid = parseInt(cid);
    
    if(!this.isCampaign(cid))
        return false;
    
    var raw = this.contract.campaigns(cid);
    
    if(_.isUndefined(raw) || !_.isArray(raw))
        return false;
        
    //raw.unshift(chance.sentence({words: 2}) + ' Campaign', 'http://' + chance.domain());
    
    if(raw.length < 9)
        return false;

    /*
    00 bytes32 name;
    01 bytes32 website;
    02 bytes32 video;
    03 address owner;
    04 address beneficiary;
    05 uint timelimit;
    06 uint fundingGoal;
    07 uint amount;
    08 uint category;
    09 uint status;
    10 uint numFunders;
    */
    
    var name = _.escape(raw[0].toString());
    var website = _.escape(this.cleanURL(raw[1].toString()));
    var video = _.escape(this.cleanURL(raw[2].toString()));
    
    var owner = raw[3].toString();
    var beneficiary = _.escape(raw[4].toString())
    
    var timelimit = raw[5].toNumber();
    var goal_bn = raw[6];
    var pledged_bn = raw[7];
    var category = raw[8].toNumber();
    var status = raw[9].toNumber();
    var backers = raw[10].toNumber()

    var pledged = web3.fromWei(pledged_bn, unit);
    var goal = web3.fromWei(goal_bn, unit);
    
    var progress =  parseFloat(pledged_bn.dividedBy(goal_bn).round(4))*100;
    if(progress > 100 || pledged_bn.greaterThan(goal_bn)) {
        progress = 100;
    }
    if(progress >= 100 && status != 1) {// Payout Campaign
        status = 2; 
    }
    if(status == 1) { // Campaign payedout hack.
        pledged = goal;
    }
    
    var daysToGo = this.days_between(new Date(), new Date(timelimit * 1000));
    var expired = (moment.unix() > timelimit) ? true : false;
    var unit = DefaultEtherUnit;
    
    var endDateDisplay = moment.unix(timelimit).format('MMMM Do YYYY');
    var by = "Nick Dodson";    
    
    if(!this.isCategory(category)
       || !this.isValue(goal_bn.toNumber(10))
       || !this.isTimestamp(timelimit)
       || !_.isNumber(status)
       || daysToGo < 0
       || progress < 0
       || name.length < 3 || name.length > 32
       || website.length < 3 || website.length > 32)
       return false;

    var return_data = {
        id: cid,
        name: name,
        website: website,
        websiteUrl: _.escape(this.addhttp(website)),
        videoValid: video.valid,
        videoType: video.type,
        videoUrl: video.url,
        videoSrc: video.src,
        benificiary: beneficiary,
        goal: goal.toNumber(10),
        goalDisplay: goal.toString(10) + ' ' + unit,
        backers: backers,
        pledged: pledged.round().toNumber(10),
        pledgedDisplay: pledged.toString(10) + ' ' + unit,
        owner: owner,
        by: by,
        timelimit: timelimit * 1000,
        timelimitUNIX: timelimit,
        categoryId: category,
        category: this.category(category),
        status: status,
        progress: (status == 1 ? 100 : Math.round(progress)),
        daysToGo: daysToGo,
        endDateDisplay: endDateDisplay,
        reached: ((progress >= 100 || status == 1) && !expired) ? true : false,
        expired: expired,
        payedOut: (status == 1 && pledged_bn.toNumber() == 0) ? true : false,
        onContribute: function(cb){
            var options = { _cid: cid };
            WeiFund.contract.onContribute(options).watch(function(){ 
                var loadCampaign = WeiFund.campaign(cid); 
                cb(loadCampaign);
            });
        },
        onPayout: function(from, eventFunction){
            var options = {}; //{_cid: cid}; // POINT OF ISSUE
            
            if(!_.isUndefined(from) && _.isString(from) && web3.isAddress(from))
                options._from = from;
            
            WeiFund.contract.onPayout(options).watch(_.bind(function(eventFunction){ 
                var loadCampaign = WeiFund.campaign(cid);
                
                eventFunction(loadCampaign);
            }, this, eventFunction));
        },
        onRefund: function(from, eventFunction){
            var options = {}; //{_cid: cid}; // POINT OF ISSUE
            
            if(!_.isUndefined(from) && _.isString(from) && web3.isAddress(from))
                options._from = from;
            
            WeiFund.contract.onRefund(options).watch(_.bind(function(eventFunction){ 
                var loadCampaign = WeiFund.campaign(cid);
                
                eventFunction(loadCampaign);
            }, this, eventFunction));
        },
        contribute: function(value){
            return WeiFund.contribute(cid, value);
        },
        refund: function(from_address){
            return WeiFund.refund(from_address, cid);
        },
        payout: function(){
            return WeiFund.payout(cid);
        },
    };

    return return_data;
};

/**
Get a specific number of campaigns from a given start point for a given category.
i.e. WeiFund.campaigns(2, 8, 16); // from category 2, load 8 campaigns, starting at index 16.
@method (campaigns)
**/

WeiFund.campaigns = function(category, load, start){
    if(!this.isCategory(category))
        category = false;
    
    if(!_.isNumber(load) || !_.isNumber(start))
        return false;
    
    load = parseInt(load);
    start = parseInt(start);
    
    var numCampaigns = this.numCampaigns();
    
    if(numCampaigns <= 0)
        return [];
    
    if((start + load) > numCampaigns)
        load -= numCampaigns - (start + load); // will need to be tested.
    
    if(load <= 0 || start < 0 || start >= numCampaigns)
        return false;
    
    var carrot = start;
    var loaded = []; // These are the campaigns that will be returned (the ones that meet the criteria.
    
    while(carrot < numCampaigns && loaded.length < load){
        var campaign = this.campaign(carrot);
        
        if(campaign != false && (category === false || campaign.categoryId == category))
            loaded.push(campaign);
        
        carrot += 1;
    }
    
    return loaded;
};


function isBigNumber(object) {
    return object instanceof BigNumber ||
        (object && object.constructor && object.constructor.name === 'BigNumber');
};