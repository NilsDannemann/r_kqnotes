var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');


/*
	App
	Usage: <App />
*/

var App = React.createClass({
	
	// Set initial State
	getInitialState: function() {
		return {
			fishes: {},
			order: {}
		}
	},
	
	// Add fish to Order
	addToOrder: function(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({ order: this.state.order });
	},

	// Add fish to state method
	addFish: function(fish) {
		var timestamp = (new Date()).getTime();
		// update state object 
		this.state.fishes['fish-' + timestamp] = fish;
		// set state 
		this.setState({ fishes: this.state.fishes });
	},

	loadSamples: function() {
		this.setState({
			fishes: require('./sample-fishes.js')
		});
	},
	
	renderFish: function(key) {
		return (
			<Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
		)	
	},

	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Good" />
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order}/>
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}

});

/*
	Add Fish
	Usage: <Fish />
*/

var Fish = React.createClass({
	
	onButtonClick: function() {
		var key = this.props.index;
		this.props.addToOrder(key);
	},

	render: function() {
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		var buttonText = (isAvailable ? 'Add to Order' : 'Sold out!'); 

		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
			</li>
		)
	}

});



/*
	Add Fish Form
	Usage: <AddFishForm />
*/

var AddFishForm = React.createClass({
	createFish(event) {
		event.preventDefault();
		
		var fish = {
			name: this.refs.name.value,
			price: this.refs.price.value,
			status: this.refs.status.value,
			desc: this.refs.desc.value,
			image: this.refs.image.value
		}

		this.props.addFish(fish);
		this.refs.fishForm.reset();
	},

	render: function() {
		return (
			<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
				<input type="text" ref="name" placeholder="Fish Name"/>
				<input type="text" ref="price" placeholder="Fish Price" />
				<select ref="status">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" ref="desc" placeholder="Desc"></textarea>
				<input type="text" ref="image" placeholder="URL to Image" />
				<button type="submit">+ Add Item</button>
			</form>
		)
	}

});




/*
	Header
	Usage: <Header />
*/

var Header = React.createClass({
	
	render: function() {
		return (
			<header className="top">
				<h1>Catch 
					<span className="ofThe">
						<span className="of">of</span>
						<span className="the">the</span>
					</span>
					day</h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
		)
	}

});




/*
	Order
	Usage: <Order />
*/
var Order = React.createClass({
	
	renderOrder: function(key) {
		var fish = this.props.fishes[key];
		var count = this.props.order[key];

		if (!fish) {
			return <li key={key}>Sorry, not available</li>
		} 
		return (
			<li>
				<span>{count}</span>lbs
				{fish.name}
				<span className="price">{h.formatPrice(count * fish.price)}</span>
			</li>)
	},

	render: function() {
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key) => {
			var fish = this.props.fishes[key];
			var count = this.props.order[key];
			var isAvailable = fish && fish.status === 'available';

			if (fish && isAvailable) {
				return prevTotal + (count * parseInt(fish.price) || 0);
			}

			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2 className="order-title">You Order</h2>
				<ul className="order">
					{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</ul>
			</div>
		)
	}

});




/*
	Inventory
	Usage: <Inventory />
*/
var Inventory = React.createClass({
	
	render: function() {
		return (
			<div>
				<h2>Inventory</h2>
				
				<AddFishForm {...this.props} />
				<button onClick={this.props.loadSamples}>Load Samples</button>
			</div>
		)
	}

});



/*
	Store Picker
	Usage: <StorePicker />
*/

var StorePicker = React.createClass({
	
	mixins: [History],

	goToStore: function(event) {
		// get data from input
		var storeId = this.refs.storeId.value;
		// change route
		this.history.pushState(null, '/store/' + storeId);
		
		event.preventDefault();
	},

	render: function() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please enter a Store</h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required />
				<input type="submit" />
			</form>
		)
	}

});




/*
	Not Found
	Usage: <NotFound />
*/

var NotFound = React.createClass({

	render: function() {
		return (
			<h1>Not found</h1>
		)
	}

});




/*
	Routes
*/
var routes = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
)


ReactDOM.render(routes, document.querySelector('#main'));