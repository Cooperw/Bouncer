import React, { Component } from "react";
import web3 from "./web3";
import { Container, Card } from "semantic-ui-react";
import AuthMonitor from "./components/AuthMonitor";


class App extends Component {

	state = {
		value: "",
		message: "",
		accessListId: "0",
		accounts: [
			{
				"address":"0x8d919cE3B5587EdADAe99573F4e487f51085b14C",
				"privateKey": "0xeb6ced6eb21f79ec8c372367f59da36cdb1aae52842525f8bc20abc99c5b654a"
			}
		]
	};

	//Bind our methods
	constructor(props){
		super(props);
		this.buildAuthMonitor = this.buildAuthMonitor.bind(this);

	}

	//Build our page
	render() {
		return (
			<Container>
				<div>
					{this.buildAuthMonitor()}
				</div>
			</Container>
		);
	}

	//Set up auth monitor
	buildAuthMonitor(){
		return (
			<Container>
				<AuthMonitor
				        AccessListId={this.accessListId}
				        fetchPublicKeyId={this.fetchPublicKeyId_MockedYubikey}
					postChallengeResponse={this.postChallengeResponse}
				/>
			</Container>
		);
	}

	//Temp YubiKey Functions
	fetchPublicKeyId_MockedYubikey(){
		return "cooperww32@gmail.com";
	}

	//Temp YubiKey Functions
	postChallengeResponse(challenge, Puk){
		return false;
	}
}

export default App;
