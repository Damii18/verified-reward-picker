// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract RewardPicker {
struct Giveaway {
string title;
address creator;
uint256 maxWinners;
bool completed;
address[] participants;
address[] winners;
}

uint256 public nextGiveawayId;
mapping(uint256 => Giveaway) private giveaways;
mapping(uint256 => mapping(address => bool)) public hasEntered;
mapping(uint256 => mapping(address => bool)) public isWinner;
event GiveawayCreated(
    uint256 indexed giveawayId,
    string title,
    address indexed creator
);
event ParticipantEntered(
    uint256 indexed giveawayId,
    address indexed participant
);
event WinnersSelected(
    uint256 indexed giveawayId,
    address[] winners
);
error InvalidTitle();
error InvalidWinnerCount();
error GiveawayNotFound();
error AlreadyEntered();
error GiveawayAlreadyCompleted();
error OnlyCreator();
error NotEnoughParticipants();
function createGiveaway(
    string calldata title,
    uint256 maxWinners
) external returns (uint256 giveawayId) {
    if (bytes(title).length == 0) revert InvalidTitle();
    if (maxWinners == 0) revert InvalidWinnerCount();
    giveawayId = nextGiveawayId++;
    Giveaway storage giveaway = giveaways[giveawayId];
    giveaway.title = title;
    giveaway.creator = msg.sender;
    giveaway.maxWinners = maxWinners;
    emit GiveawayCreated(giveawayId, title, msg.sender);
}
function enterGiveaway(uint256 giveawayId) external {
    if (giveawayId >= nextGiveawayId) revert GiveawayNotFound();
    Giveaway storage giveaway = giveaways[giveawayId];
    if (giveaway.completed) revert GiveawayAlreadyCompleted();
    if (hasEntered[giveawayId][msg.sender]) revert AlreadyEntered();
    hasEntered[giveawayId][msg.sender] = true;
    giveaway.participants.push(msg.sender);
    emit ParticipantEntered(giveawayId, msg.sender);
}
function selectWinners(uint256 giveawayId) external {
    if (giveawayId >= nextGiveawayId) revert GiveawayNotFound();
    Giveaway storage giveaway = giveaways[giveawayId];
    if (msg.sender != giveaway.creator) revert OnlyCreator();
    if (giveaway.completed) revert GiveawayAlreadyCompleted();
    uint256 participantCount = giveaway.participants.length;
    if (participantCount < giveaway.maxWinners) {
        revert NotEnoughParticipants();
    }
    address[] memory pool = new address[](participantCount);
    for (uint256 i = 0; i < participantCount; i++) {
        pool[i] = giveaway.participants[i];
    }
    for (uint256 i = 0; i < giveaway.maxWinners; i++) {
        uint256 randomIndex = uint256(
            keccak256(
                abi.encodePacked(
                    block.prevrandao,
                    block.timestamp,
                    blockhash(block.number - 1),
                    address(this),
                    giveawayId,
                    i
                )
            )
        ) % participantCount;
        address selected = pool[randomIndex];
        giveaway.winners.push(selected);
        isWinner[giveawayId][selected] = true;
        pool[randomIndex] = pool[participantCount - 1];
        participantCount--;
    }
    giveaway.completed = true;
    emit WinnersSelected(giveawayId, giveaway.winners);
}
function getGiveaway(
    uint256 giveawayId
)
    external
    view
    returns (
        string memory title,
        address creator,
        uint256 maxWinners,
        uint256 participantCount,
        bool completed
    )
{
    if (giveawayId >= nextGiveawayId) revert GiveawayNotFound();
    Giveaway storage giveaway = giveaways[giveawayId];
    return (
        giveaway.title,
        giveaway.creator,
        giveaway.maxWinners,
        giveaway.participants.length,
        giveaway.completed
    );
}
function getParticipants(
    uint256 giveawayId
) external view returns (address[] memory) {
    if (giveawayId >= nextGiveawayId) revert GiveawayNotFound();
    return giveaways[giveawayId].participants;
}
function getWinners(
    uint256 giveawayId
) external view returns (address[] memory) {
    if (giveawayId >= nextGiveawayId) revert GiveawayNotFound();
    return giveaways[giveawayId].winners;
}

}