const baseUrl:string = 'https://dydx-testnet.imperator.co/v4';

function fetchCandles(pair:string,timeFrame:string):void{
    fetch(`${baseUrl}/candles/perpetualMarkets/${pair}?resolution=${timeFrame}`)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        else{
            return response.json();
        }
    })
    .then(data=>{
        console.log(data);
    })
    .catch(error=>{
        console.error('Error:', error);
        console.log("Check pair or timeFrame you enter");
    })
}

