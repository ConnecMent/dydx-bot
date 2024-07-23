//for save all pairs in our markets (element type : string)
let myPairs = [];

const validTimeframe = ["1MIN","5MINS","15MINS","30MINS","1HOUR","4HOURS","1DAY"];

function getAllPairs(){

    return new Promise((resolve,reject)=>{
        
        const apiUrl = 'https://dydx-testnet.imperator.co/v4/perpetualMarkets';
        
    
        // Make a GET request    
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            reject("bad");
            }
            return response.json();
        })
        .then(data => {
        
            //All pair in marketKeys
            const marketKeys = Object.keys(data["markets"]);
            // if you want to see what pairs exist uncomment nextline
            ///console.log(marketKeys);
        
            
            //transfer pair in my array
            let i = 0;
            for(;i<marketKeys.length;++i)
                myPairs.push(marketKeys[i]);

            if(i===marketKeys.length)
                resolve("recive all Pairs");
            
        
        })
        .catch(error => {
            console.error('Error:', error);
        });

      
    })
    
}

function checkTimeframe(timeframe){
    return validTimeframe.includes(timeframe);
}

function checkPair(pair){
    return myPairs.includes(pair);
}

function fetchCandles(pair,timeframe){

    const baseURL2 = 'https://dydx-testnet.imperator.co/v4';

    fetch(`${baseURL2}/candles/perpetualMarkets/${pair}?resolution=${timeframe}`,
    {
        method: 'GET',
    
    })
    .then(function(res) {
        return res.json();
    }).then(function(body) {
        
        //console.log(`Number of candles: ${body["candles"].length}`);

        // if you want to see data of candles uncomment nextline
        console.log(body);

    });
}


time = "1MIN";
Pair = "BTC-USD"

getAllPairs().then((msg)=>{
    console.log(msg);

    if(checkPair(Pair) && checkTimeframe(time)){
        fetchCandles(Pair,time)
    }
        
}).catch((msg)=>{
    console.log(msg);
})

