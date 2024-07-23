// Define a string array to save all pairs in our markets
let MyPairs: string[] = [];

// Valid timeframes
const ValidTimeframe: string[] = ["1MIN", "5MINS", "15MINS", "30MINS", "1HOUR", "4HOURS", "1DAY"];

// Function to get all pairs
function GetAllPairs(): Promise<string> {
    return new Promise((resolve, reject) => {
        const apiUrl: string = 'https://dydx-testnet.imperator.co/v4/perpetualMarkets';

        // Make a GET request    
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    reject("bad");
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // All pairs in marketKeys
                const marketKeys: string[] = Object.keys(data["markets"]);

                //transfer pair in my array
                let i = 0;
                for(;i<marketKeys.length;++i)
                    myPairs.push(marketKeys[i]);

                if(i===marketKeys.length)
                    resolve("recive all Pairs");                


            })
            .catch(error => {
                console.error('Error:', error);
                reject(error); // Reject the promise on error
            });
    });
}

// Function to check if a timeframe is valid
function CheckTimeframe(timeframe: string): boolean {
    return ValidTimeframe.includes(timeframe);
}

// Function to check if a pair is valid
function checkPairs(pair: string): boolean {
    return MyPairs.includes(pair);
}

// Function to fetch candles
function FetchCandles(pair: string, timeframe: string): void {
    const baseURL2: string = 'https://dydx-testnet.imperator.co/v4';

    fetch(`${baseURL2}/candles/perpetualMarkets/${pair}?resolution=${timeframe}`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(body => {
            // Uncomment this to see the number of candles
            // console.log(`Number of candles: ${body["candles"].length}`);

            // Uncomment this to see data of candles
            console.log(body);
        })
        .catch(error => {
            console.error('Error fetching candles:', error);
        });
}

// Example usage
const time: string = "1MIN";
const pair: string = "BTC-USD";

GetAllPairs()
    .then((msg: string) => {
        console.log(msg);

        if (checkPairs(pair) && CheckTimeframe(time)) {
            FetchCandles(pair, time);
        }
    })
    .catch((msg: string) => {
        console.log(msg);
    });
