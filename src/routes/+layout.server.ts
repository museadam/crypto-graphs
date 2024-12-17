import type { LayoutServerLoad } from './$types';
import { binance, kLines, getSymbols, avgPrice } from './utils/binance-api';


export const load: LayoutServerLoad = async () => {
    const symbol = 'BTCUSDT'
    const interval = "1m"
    const limit = 60
    const history = await binance(kLines(symbol, interval, limit))
    let symbols = await binance(getSymbols())
    symbols = symbols.symbols.filter(((el) => el.symbol.includes('USD')))
    // console.log(history)
    // console.log('history')
    let avg = await binance(avgPrice(symbol))


    return { history, symbols, avg }
}

