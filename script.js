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
  }

  render() {
    const { portfolio } = this.state;
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

                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>
                        <input
                          type="number"
                          name="shares_owned"
                          value={sharesOwned}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="cost_per_share"
                          value={cost_per_share}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="market_price"
                          value={market_price}
                        />
                      </td>
                      <td></td>
                      <td></td>
                      <td>
                        <button className="btn btn-danger btn-small">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Portfolio />, document.getElementById("root"));
