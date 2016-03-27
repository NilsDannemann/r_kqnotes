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
	
	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Good" />
				</div>
				<Order />
				<Inventory />
			</div>
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

	render: function() {
		return (
			<div>Order</div>
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
			<div>Inventory</div>
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