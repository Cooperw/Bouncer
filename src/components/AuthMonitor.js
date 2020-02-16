import React, { Component } from "react";
import { Button, Header, Icon, Modal, Form, Message } from "semantic-ui-react";
import web3 from "../web3";
import bouncer from "../bouncer";

export default class Register extends Component {
	state = {
		message: "Please present identification",
		errorMessage: "",
		processing: false,
		message_color: "black"
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
		let AccessListId = this.state.AccessListId;
		let PublicKeyId = this.state.fetchPublicKeyId()

		this.setState({
		    message: "Skale-ing the walls looking for your ePuk ..."
		});

		//Import account
		this.state.metaAccount = web3.eth.accounts.privateKeyToAccount(this.props.account.privateKey);
		this.state.fromAddress = this.state.metaAccount.address.toLowerCase();


		let ePuk = wait bouncer.methods.getKey(this.state.AccessListId, PublicKeyId).call({
				        from: this.state.metaAccount.address
				});

		this.setState({
		    message: "Sending ePuk to Engima for intense transformation ..."
		});

		// pass ePuk to enigma for decryption, temp fix pre-decrypted
		let Puk = ePuk

		let challenge = Date.Now()

		this.setState({
		    message: "Puk found, are your creds up to the challenge ???"
		});

		// Use Puk and Challenge/Response to verify the sig/response
		sig_verified = this.state.postChallengeResponse(challenge, Puk);

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
		setimeout({}, 1000 * 5); 

	} catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({
            processing: false,
            message: "Please present identification",
	    message_color: "black"
        });
    };

    render() {
        return (
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
        );
    }
}
