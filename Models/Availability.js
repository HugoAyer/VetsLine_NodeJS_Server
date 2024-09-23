class Slot {
    constructor(date,videocall,present,onSite,start,end,idPrice_videocall,price_videocall,idPrice_present,price_present,idPrice_onSite,price_onSite){
        this.date = date,
        this.videocall = videocall,
        this.present = present,
        this.onSite = onSite,
        this.start = start,
        this.end = end,
        this.idPrice_videocall = idPrice_videocall,
        this.price_videocall = price_videocall,
        this.idPrice_present = idPrice_present,
        this.price_present = price_present,
        this.idPrice_onSite = idPrice_onSite,
        this.price_onSite = price_onSite
    }
}

exports.Slot = Slot