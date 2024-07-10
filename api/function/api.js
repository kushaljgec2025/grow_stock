
const API_KEY = "YJ7PG99K3K4EBOPR";
export class API {

    async top_gainer_loser() {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return { error: "An error occurred in top_gainer_loser API" };
        }
    }

    async company_overview(ticker) {
        try {
            // const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${API_KEY}`);
            const response = await fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=${API_KEY}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return { error: "An error occurred in company_overview API" };
        }
    }
    async Stock_prices(ticker) {
        try {
            // const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`);
            const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${API_KEY}`);
            const data = await response.json();
            return data;
        } catch (error) {
            return { error: "An error occurred in Stock_prices API" };
        }
    }
    async Ticker_suggestion(ticker) {
        try {
            // const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${ticker}&apikey=${API_KEY}`);
            const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=SAIC&apikey=${API_KEY}`);
            const data = response.json();
            // console.log("api", data);
            return data;
        } catch (error) {
            return { error: "An error occurred in TckerSearch API" };
        }
    }
    // async Demo(value) {
    //     try {
    //         const response = await fetch(`https://api.addsearch.com/v1/suggest/1bed1ffde465fddba2a53ad3ce69e6c2?term=${value}`);
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         return { error: "An error occurred in company_overview API" };
    //     }
    // }


}

const api = new API();
export default api;