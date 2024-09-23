const getPriceFromId = (vet,idPrice) => {
    let prices = vet.price_rates
    let prices_filtered = prices.filter(item => item.idPrice == idPrice)
    

    return (prices_filtered.length > 0) ? prices_filtered[0].price : 0
}

exports.getPriceFromId = getPriceFromId