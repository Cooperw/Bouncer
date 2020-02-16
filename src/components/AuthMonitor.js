import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message, Container } from "semantic-ui-react";
import web3 from "../web3";
import bouncer from "../bouncer";

export default class Register extends Component {
	state = {
		message: "Please present identification",
		errorMessage: "",
		processing: false,
		message_color: "black",
		render: true
	};

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

	constructor(props){
		super(props);
	}


    onSubmit = async event => {
        event.preventDefault();

	try{
		this.setState({
		    processing: true,
		    message: "Fetching PukID from credentials ...",
	    	    message_color: "black"
		});

		//Load default routing data
		let PublicKeyId = this.props.fetchPublicKeyId();

		this.setState({
		    message: "Skale-ing the walls looking for your ePuk ..."
		});

		//Import account
		this.state.metaAccount = web3.eth.accounts.privateKeyToAccount(this.props.account.privateKey);
		this.state.fromAddress = this.state.metaAccount.address.toLowerCase();


		console.log(this.props.AccessListId)

		let ePuk = await bouncer.methods.getKey(this.props.AccessListId, PublicKeyId).call({
				        from: this.state.metaAccount.address
				});

		this.setState({
		    message: "Sending ePuk to Engima for intense transformation ..."
		});

		// pass ePuk to enigma for decryption, temp fix pre-decrypted
		let Puk = ePuk;

		let challenge = Date.now();

		this.setState({
		    message: "Puk found, are your creds up to the challenge ???"
		});

		// Use Puk and Challenge/Response to verify the sig/response
		let sig_verified = this.props.postChallengeResponse(challenge, Puk);

		if (sig_verified){
			//Grant access
			this.setState({
			    message: "ACCESS GRANTED",
			    message_color: "green"
			});
		} else {
			//Deny access
			this.setState({
			    message: "ACCESS DENIED",
			    message_color: "red"
			});
		}

		// Give some time for people to read their status
		setTimeout(function() {
				this.setState({
				    processing: false,
				    message: "Please present identification",
				    message_color: "black"
				});
			}.bind(this)
			, 1000 * 5)

	} catch (err) {
            this.setState({ errorMessage: err.message });
        }
    };

    render() {

	let renderContainer = false;

	if(this.state.render) {
		renderContainer = 
            <Container>
		    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
			<Message error header="Oops!" content={this.state.errorMessage} />
			<Button primary type="submit" loading={this.state.loading}>
				Emulate YubiKey Contact
			</Button>
			<hr />
			<h2>{this.state.message}</h2>
		    </Form>
	    </Container>
	}
        return (
		renderContainer
        );
    }
}
