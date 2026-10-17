Verified Reward Picker

A Solidity Smart Contract for Giveaway Management

Overview

Verified Reward Picker is a blockchain-based giveaway management project developed using Solidity. The smart contract allows users to create giveaways, register participants, select winners, and retrieve giveaway information.

Smart Contract

The contract is located at src/RewardPicker.sol and is named RewardPicker.

Features

* Create Giveaways: A creator can establish a giveaway by specifying its title and the maximum number of winners.
* Participant Registration: Users can enter a giveaway using their blockchain wallet addresses.
* Duplicate Entry Prevention: Each wallet address can enter a particular giveaway only once.
* Winner Selection: The giveaway creator can select winners from registered participants.
* Winner Verification: The contract records selected winners on the blockchain.
* Giveaway Information: Users can retrieve giveaway details, participant addresses, and winner addresses.
* Access Control: Only the giveaway creator can select winners.

Technologies

* Solidity ^0.8.24
* Ethereum Virtual Machine (EVM)
* Git and GitHub

Main Functions

Function	Purpose
createGiveaway()	Creates a new giveaway.
enterGiveaway()	Registers a participant.
selectWinners()	Selects and records giveaway winners.
getGiveaway()	Returns giveaway details.
getParticipants()	Returns registered participants.
getWinners()	Returns selected winners.

Security Note

The current winner-selection mechanism uses blockchain data for demonstration purposes. It is not suitable for high-value giveaways because the randomness may be influenced or predicted. A production implementation should use a secure verifiable randomness service.

Project Status

The Solidity smart contract has been added to the project repository. Deployment to a blockchain network and integration with the frontend are separate steps.