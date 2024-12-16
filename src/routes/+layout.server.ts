import type { LayoutServerLoad } from './$types';


export const load: LayoutServerLoad = async () => {

    const history = await binance()
    return { history }
}



async function binance() {
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',

        },
        options: {
            symbol: 'Yes',
            interval: 'Yes'

        }
    };
    const today = new Date()
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - .5);
    console.log(today.getDate())
    console.log('today.getDate()')

    // Construct the URL with query string parameters
    const url = new URL('https://data-api.binance.vision/api/v3/klines');
    url.searchParams.append('symbol', 'BTCUSDT');   // Mandatory parameter

    url.searchParams.append('interval', '1h');   // Mandatory parameter
    url.searchParams.append('startTime', `${yesterday.setDate(today.getDate() - 1)}`); // Optional parameter
    // url.searchParams.append('endTime', `${yesterday.getDate()}`);   // Optional parameter
    // url.searchParams.append('timeZone', '0');    // Optional parameter, default UTC
    // url.searchParams.append('limit', '500');     // Optional parameter, default 500

    // Perform the fetch request
    const res = await fetch(url, options)
        .then(response => {

            return response.json();
        })
        // .then(data => {
        //     console.log('Fetched data:', data);
        // })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    console.log(res)

    return res
}

//https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data


// [
//     [
//       1499040000000,      // Kline open time
//       "0.01634790",       // Open price
//       "0.80000000",       // High price
//       "0.01575800",       // Low price
//       "0.01577100",       // Close price
//       "148976.11427815",  // Volume
//       1499644799999,      // Kline Close time
//       "2434.19055334",    // Quote asset volume
//       308,                // Number of trades
//       "1756.87402397",    // Taker buy base asset volume
//       "28.46694368",      // Taker buy quote asset volume
//       "0"                 // Unused field, ignore.
//     ]
//   ]