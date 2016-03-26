var React = require('react');
var ReactDOM = require('react-dom');

/*
	App
	Usage: <App />
*/

var App = React.createClass({
	
	render: function() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header />
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
			<div>header</div>
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

	render: function() {
		return (
			<form className="store-selector">
				<h2>Please enter a Store</h2>
				<input type="text" ref="storeId" />
				<input type="submit" />
			</form>
		)
	}

});

ReactDOM.render(<App />, document.querySelector('#main'));