
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.17;
import "hardhat/console.sol";
contract CargoTrackingDapp {
  // owner
    address private owner;

    // cargo informations
    struct Cargo{
        uint cargo_tracking_number;
        address sender_address;
        address customer_address;
        shipping Status;
        Transportation Line;
        uint shipping_date;
        uint delivery_date;
        
    }
    // enum - cargo line
   enum Transportation{
       MaritimeTransport,
       AirTransport,
       RoadTransport,
       RailTransport
   }
    // enum - cargo status 
    enum shipping {
        Pending,
        Shipped,
        Accepted,
        Rejected,
        Canceled
    }
    //events
    event CargoAdded(uint indexed cargo_tracking_number, 
     address sender_address,address customer_address,uint _Status,uint Line, uint shipping_date,uint delivery_date);
    event ChangeStatus(uint indexed cargo_tracking_number, shipping Status);
  
    // cargo array list
    mapping(uint => Cargo) private cargo;
    
    // constructor
    constructor() {
        owner = msg.sender;
    }
    
    shipping public Status;

    //MODIFIERS
    //onlyOwner
    modifier onlyOwner(){
        require(msg.sender == owner, "Only the owner can call this function!" );
    _;
    }

    //FUNCTIONS
    //Execute FUNCTIONS
    //setOwner
    function setOwner(address _newOwner)private onlyOwner(){
    owner = _newOwner;
    }

    //create - create new cargo
    function create(
    uint cargo_tracking_number,
    address sender_address,
    address customer_address,
    shipping _Status,
    Transportation Line,
    uint shipping_date,
    uint delivery_date) private onlyOwner{
        // cargo is already in list?
        require(!isExist(cargo_tracking_number), "Cargo already exist");
       cargo[cargo_tracking_number] = Cargo(cargo_tracking_number, 
       sender_address, customer_address, _Status, Line, shipping_date, delivery_date);
       emit CargoAdded(cargo_tracking_number, sender_address,
       customer_address, uint8(_Status), uint8(Line),
       shipping_date, delivery_date);
    }
    //callCreateFunction : initialize create function
    function callCreateFunction() public {
        uint cargo_tracking_number = 12345;
        address sender_address = 0x1234567890123456789012345678901234567890;
        address customer_address = 0x1234567890123456789012345678901234567845;
        shipping _Status = shipping.Pending;
        Transportation Line = Transportation.RoadTransport;
        uint shipping_date = 1634323200;
        uint delivery_date = 1635001200;

        create(
            cargo_tracking_number,
            sender_address,
            customer_address,
            _Status,
            Line,
            shipping_date,
            delivery_date
        );
    }
    
    //changeStatus : change the cargo situation
    function changeStatus(uint cargo_tracking_number,uint8 new_status) external {
        require(isExist(cargo_tracking_number), "Cargo with the given track number does not exist");
        cargo[cargo_tracking_number].Status = shipping(new_status) ;
        
        emit ChangeStatus(cargo_tracking_number,shipping(new_status));
    }
    
    // Query FUNCTIONS
   
    //track status : return cargo situation
    function getStatus(uint cargo_tracking_number) public view returns (shipping) {
        Cargo memory c = cargo[cargo_tracking_number];
        return c.Status;
    }

    //track all information : all data of cargo
    function getData( uint cargo_tracking_number ) external view
     returns (uint, address, address, shipping,Transportation, uint, uint) {
        require(isExist(cargo_tracking_number), "Cargo with the given track number does not exist");
        Cargo memory c = cargo[cargo_tracking_number];
        return (
        c.cargo_tracking_number,
        c.sender_address,
        c.customer_address,
        c.Status,
        c.Line,
        c.shipping_date,
        c.delivery_date
    );
    }
    // isExist - track number is in list? Don't use same track number.
    function isExist(uint cargo_tracking_number) public view returns(bool) {
      return cargo[cargo_tracking_number].cargo_tracking_number != 0;
    }

}
