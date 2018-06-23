import React, { Component } from 'react';
import { PageHeader, ListGroup } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import './Home.css';

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			testApiCall: []
		};
	}

	async componentDidMount() {
		if (!this.props.isAuthenticated) {
			return;
		}

		try {
			const testApiCall = await this.testApiCall();
			this.setState({ testApiCall });
		} catch (e) {
			alert(e);
		}

		this.setState({ isLoading: false });
	}

	testApiCall() {
		const queryHelloWorld = `query Query {
		  helloWorld
		}`;

		return API.graphql(graphqlOperation(queryHelloWorld));
	}

	renderTestAPI(testApiCall) {
		console.log(testApiCall);
		return testApiCall.data.helloWorld;
	}

	renderLander() {
		return (
			<div className="lander">
				<h1>Test web app</h1>
				<p>A simple react test app</p>
			</div>
		);
	}

	renderTest() {
		return (
			<div className="test">
				<PageHeader>Test API call</PageHeader>
				<ListGroup>{!this.state.isLoading && this.renderTestAPI(this.state.testApiCall)}</ListGroup>
			</div>
		);
	}

	render() {
		return <div className="Home">{this.props.isAuthenticated ? this.renderTest() : this.renderLander()}</div>;
	}
}
