class AddStockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      shares_owned: 0,
      cost_per_share: 0,
      market_price: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, shares_owned, cost_per_share, market_price } = this.state;

    // onSubmit is passed down as a prop from Portfolio component
    this.props.onSubmit({
      name,
      shares_owned,
      cost_per_share,
      market_price,
    });

    this.setState({
      name: "",
      shares_owned: 0,
      cost_per_share: 0,
      market_price: 0,
    });
  }

  render() {
    const { name, shares_owned, cost_per_share, market_price } = this.state;
    return (
      <form className="col-12 mt-2 mb-4" onSubmit={this.handleSubmit}>
        <input
          className="mx-2"
          name="name"
          type="text"
          placeholder="Name"
          onChange={this.handleChange}
          value={name}
          required
        />
        <input
          className="mx-2"
          name="shares_owned"
          type="number"
          placeholder="Shares"
          value={shares_owned}
          onChange={this.handleChange}
        />
        <input
          className="mx-2"
          name="cost_per_share"
          type="number"
          placeholder="Cost"
          value={cost_per_share}
          onChange={this.handleChange}
        />
        <input
          className="mx-2"
          name="market_price"
          type="number"
          placeholder="Price"
          value={market_price}
          onChange={this.handleChange}
        />
        <button className="btn btn-primary btn-sm">add</button>
      </form>
    );
  }
}

class Stock extends React.Component {
  render() {
    const { handleChange, removeStock, stock, index } = this.props;
    const { name, shares_owned, cost_per_share, market_price } = stock;

    const market_value = shares_owned * market_price;
    const unrealized_gain_loss = market_value - shares_owned * cost_per_share;
    // Adopting the underscore_style for consistency

    return (
      <tr>
        <td>{name}</td>
        <td>
          <input
            onChange={(e) => handleChange(e, index)}
            type="number"
            name="shares_owned"
            value={shares_owned}
          />
        </td>
        <td>
          <input
            onChange={(e) => handleChange(e, index)}
            type="number"
            name="cost_per_share"
            value={cost_per_share}
          />
        </td>
        <td>
          <input
            onChange={(e) => handleChange(e, index)}
            type="number"
            name="market_price"
            value={market_price}
          />
        </td>
        <td>{market_value}</td>
        <td>{unrealized_gain_loss}</td>
        <td>
          <button
            className="btn btn-light btn-sm"
            onClick={() => removeStock(index)}
          >
            remove
          </button>
        </td>
      </tr>
    );
  }
}

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [
        {
          name: "Feetbook",
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130,
        },
        {
          name: "Yamazon",
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500,
        },
        {
          name: "Snoozechat",
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 3,
        },
      ],
    };

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addStock = this.addStock.bind(this);
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

  addStock(stock) {
    const portfolio = this.state.portfolio.slice();

    portfolio.push(stock);
    this.setState({ portfolio });
  }

  render() {
    const { portfolio, form } = this.state;

    const portfolio_market_value = portfolio.reduce(
      (sum, stock) => stock.shares_owned * stock.market_price + sum,
      0
    );
    const portfolio_cost = portfolio.reduce(
      (sum, stock) => stock.shares_owned * stock.cost_per_share + sum,
      0
    );
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;
    return (
      <div className="container">
        <h1 className="text-center my-4">Stock Portfolio</h1>
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
                {portfolio.map((stock, index) => (
                  <Stock
                    key={index}
                    index={index}
                    stock={stock}
                    handleChange={this.handleChange}
                    removeStock={this.removeStock}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <AddStockForm onSubmit={this.addStock} />
          <div className="col-12 col-md-6">
            <h4 className="mb-3">
              Portfolio value: $ {portfolio_market_value}
            </h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">
              Portfolio gain/loss: $ {portfolio_gain_loss}
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Portfolio />, document.getElementById("root"));
