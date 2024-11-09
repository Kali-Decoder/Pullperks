// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PullPerks is Ownable {
    IERC20 public token;
    uint256 private projectId;
    struct Project {
        uint256[] percentages;
        uint256 totalTokenAmount;
        address[] contributors;
        address admin;
        address token;
        bool isDistributed;
    }
    mapping(uint => Project) public projects;

    // Event to log distribution details
    event Distributed(address indexed contributor, uint256 amount);
    event ProjectAdded(
        uint256 projectId,
        address admin,
        uint256 totalTokenAmount,
        address token
    );

    constructor() Ownable(msg.sender) {}

    function addProjectContributions(
        address[] memory _contributors,
        address _admin,
        uint256[] memory _percentages,
        uint256 _totalTokenAmount,
        address _token
    ) external {
        require(_admin != address(0), "Invalid Admin Address");
        require(_contributors.length > 0, "Empty Contributors Array");
        require(_percentages.length > 0, "Empty Percentages Array");
        require(_totalTokenAmount > 0, "Invalid Token Amount");
        require(_token != address(0), "Invalid Token Address");
        require(
            _percentages.length == _contributors.length,
            "Not empty Arrays"
        );
        Project memory project = Project(
            _percentages,
            _totalTokenAmount,
            _contributors,
            _admin,
            _token,
            false
        );
        projects[projectId] = project;

        unchecked {
            projectId++;
        }
        IERC20(_token).transferFrom(
            msg.sender,
            address(this),
            _totalTokenAmount
        );
        emit ProjectAdded(projectId, _admin, _totalTokenAmount, _token);
    }

    function distributeFunds(uint256 _projectId) external {
        Project storage project = projects[_projectId];
        require(
            project.admin == msg.sender,
            "Only Admin can distribute tokens"
        );
        require(!project.isDistributed, "Already Distributed");

        uint256 totalTokenAmount = project.totalTokenAmount;
        address tokenAddress = project.token;

        for (uint256 i = 0; i < project.contributors.length; i++) {
            uint256 amount = (totalTokenAmount * project.percentages[i]) / 100;
            IERC20(tokenAddress).transfer(project.contributors[i], amount);
            emit Distributed(project.contributors[i], amount);
        }
        project.isDistributed = true;
    }
}
