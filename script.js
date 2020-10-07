console.log("poop");

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [
        {
          name: "Elastic",
          sharesOwned: 100,
          cost_per_share: 5,
          market_price: 117,
        },
        {
          name: "American Airlines",
          sharesOwned: 100,
          cost_per_share: 12,
          market_price: 14,
        },
        {
          name: "Jets",
          sharesOwned: 100,
          cost_per_share: 17,
          market_price: 18,
        },
      ],
    };

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  removeStock(index) {
    const portfolio = this.state.portfolio.slice(); // shallow copy
    portfolio.splice(index, 1); // remove value at index
    this.setState({ portfolio });
  }

  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice(); // shallow copy
    const { name, value } = event.target;
    portfolio[index][name] = value;
    this.setState({ portfolio });
  }

  render() {
    const { portfolio } = this.state;

    const portfolio_market_value = portfolio.reduce(
      (sum, stock) => stock.sharesOwned * stock.market_price + sum,
      0
    );
    const portfolio_cost = portfolio.reduce(
      (sum, stock) => stock.sharesOwned * stock.cost_per_share + sum,
      0
    );
    const portfolio_gain = portfolio_market_value - portfolio_cost;

    return (
      <div className="container">
        <h1 className="text-center my-4">Britt Stocks</h1>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Shares Owned</th>
                  <th scope="col">Cost per share ($)</th>
                  <th scope="col">Market Price ($)</th>
                  <th scope="col">Market Value ($)</th>
                  <th scope="col">Unrealized Gain/Loss ($)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => {
                  const {
                    name,
                    sharesOwned,
                    cost_per_share,
                    market_price,
                  } = stock;

                  const market_value = sharesOwned * market_price;
                  const gain = market_value - (sharesOwned - cost_per_share);

                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>
                        <input
                          type="number"
                          name="sharesOwned"
                          value={sharesOwned}
                          onChange={(e) => this.handleChange(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="cost_per_share"
                          value={cost_per_share}
                          onChange={(e) => this.handleChange(e, index)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="market_price"
                          value={market_price}
                          onChange={(e) => this.handleChange(e, index)}
                        />
                      </td>
                      <td>{market_value}</td>
                      <td>{gain}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-small"
                          onClick={() => this.removeStock(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">
              Portfolio value: $ {portfolio_market_value}
            </h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain}</h4>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Portfolio />, document.getElementById("root"));
