// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FreelancePlatform {
    struct User {
        address userAddress;
        string profileData;  // Could be IPFS hash for extended data
        uint256 stakedAmount;
        bool isRegistered;
    }

    struct Job {
        address payable employer;
        string description;
        uint256 budget;
        bool isActive;
        address payable acceptedFreelancer;
    }

    struct Proposal {
        address payable employee;
        string proposalText;
    }

    mapping(address => User) public users;
    mapping(uint => Job) public jobs;
    mapping(uint => Proposal[]) public jobProposals;

    uint256 public registrationStake = 10 gwei; 
    uint256 public jobIdCounter = 0;

    function register(string memory profileData) external payable {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(msg.value == registrationStake, "Incorrect stake amount");

        users[msg.sender] = User({
            userAddress: msg.sender,
            profileData: profileData,
            stakedAmount: msg.value,
            isRegistered: true
        });
    }

    function postJob(string memory description, uint256 budget) external payable {
        require(msg.value == budget, "Sent ETH does not match the job budget");

        jobs[jobIdCounter++] = Job({
            employer: payable(msg.sender),
            description: description,
            budget: msg.value,
            isActive: true,
            acceptedFreelancer: payable(address(0))
        });
    }

    function submitProposal(uint jobId, string memory proposalText) external {
        require(users[msg.sender].isRegistered, "User not registered");
        require(jobs[jobId].isActive, "Job is not active or does not exist");

        jobProposals[jobId].push(Proposal({
            employee: payable(msg.sender),
            proposalText: proposalText
        }));
    }

    function acceptProposal(uint jobId, uint proposalIndex) external {
        Job storage job = jobs[jobId];
        Proposal storage proposal = jobProposals[jobId][proposalIndex];

        require(msg.sender == job.employer, "Only the job's employer can accept a proposal");
        require(job.isActive, "Job is not active or does not exist");
        require(job.acceptedFreelancer == payable(address(0)), "Another proposal has already been accepted for this job");

        job.acceptedFreelancer = proposal.employee;
    }

    function releasePayment(uint jobId) external {
        Job storage job = jobs[jobId];

        require(msg.sender == job.employer, "Only the job's employer can release the payment");
        require(job.acceptedFreelancer != payable(address(0)), "No proposal has been accepted for this job");

        uint256 paymentAmount = job.budget;
        job.budget = 0;
        job.isActive = false;
        job.acceptedFreelancer.transfer(paymentAmount);
    }

    function leavePlatformAndClaimStake() external {
        require(users[msg.sender].isRegistered, "User not registered");
        
        uint256 amountToTransfer = users[msg.sender].stakedAmount;
        users[msg.sender].stakedAmount = 0;
        users[msg.sender].isRegistered = false;

        payable(msg.sender).transfer(amountToTransfer);
    }
}

// add remove user
// add slash staking