// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "./ERC721full.sol";

contract Estrella is ERC721{

    // CURRENCIES STOCK 

    uint256 public supply_uno = 50;
    uint256 public supply_cinco = 5;
    uint256 public supply_diez = 5;
    uint256 public supply_veinte = 2;
    uint256 public supply_cincuenta = 2;
    uint256 public supply_cien = 20;

    //Id NFT
    uint256 idNFT = 0;

    //Transaction ID

    uint256 trans = 0;

    //Owner Contract

    address _owner;
    address _contract;

    //Activador
    bool public active = false;

    //Transacction per USER 

    uint [] public billetes;

    mapping (address => uint[]) private transactions;

    // Transaction Id _ Value

    mapping (uint256 => uint256) public transaction_value;

    //Transaction Id_ Bills

    mapping (uint256 => uint[]) public transaction_bills;

    //Owner to ID

    mapping (address => uint[]) private owner_id;

    //ID to Owner

    mapping (uint256 => address) public id_owner;

    // ID to currenci 

    mapping (uint256 => uint256) public id_currenci;

    // Owner by Value

    mapping (address => uint[]) private owner_values;


    constructor()ERC721("Cashier", "Cash"){
        _owner = msg.sender;
        _contract = address(this);
    }

    // Ownable
    function onlyOwner()private view{
        require(msg.sender  == _owner, "N/O");
    }


    function ConvertDenom(uint256 _value) public payable returns(uint256 [] memory){

        require(active == true, "SN/o A");
        require(_value <= Saldo_Cashier(), "N/Enough/Tickets" );
        require(_value > 0, "C/Not/N");
        
        //RESET ARRAY PER TX

        delete billetes;

        uint cantidad = _value;

        //DENOMINACIONES

        uint [] memory arr_currencies = new uint[](6);
        arr_currencies[0] = 100;
        arr_currencies[1] = 50;
        arr_currencies[2] = 20;
        arr_currencies[3] = 10;
        arr_currencies[4] = 5;
        arr_currencies[5] = 1;

        uint256 [6] memory supply_currencies = [ supply_cien, supply_cincuenta, supply_veinte, supply_diez, supply_cinco, supply_uno];

        for(uint256 i = 0; i < arr_currencies.length; i++){

            if(cantidad >= arr_currencies[i] && supply_currencies[i] != 0) {
                
                while(cantidad >= arr_currencies[i]){
                    
                    billetes.push(arr_currencies[i]);
                    cantidad -= arr_currencies[i];
                    
                    if(arr_currencies[i] == 100){
                        supply_cien --;
                    }else if(arr_currencies[i] == 50){
                        supply_cincuenta --;
                    }else if(arr_currencies[i] == 20){
                        supply_veinte --;
                    }else if(arr_currencies[i] == 10){
                        supply_diez --;
                    }else if(arr_currencies[i] == 5){
                        supply_cinco --;
                    }else if(arr_currencies[i] == 1){
                        supply_uno --;
                    }

                    owner_id[msg.sender].push(idNFT);
                    id_owner[idNFT] = msg.sender;
                    id_currenci[idNFT] = arr_currencies[i];
                    

                    _mint(msg.sender, idNFT);

                    idNFT ++;
                }
            }
        }

        transaction_value[trans] = _value;
        transactions[msg.sender].push(trans);
        transaction_bills[trans] = billetes;
        owner_values[msg.sender].push(_value);

        trans ++;

        return billetes;
    }

    function return_arr () public view returns(uint[]memory){
        return billetes;
    }

    // Calculo de saldo
    function Saldo_Cashier() public  view returns(uint256 _saldo){
        uint256 saldo = (100 * supply_cien) + (50 * supply_cincuenta) + (20 * supply_veinte) + (10 * supply_diez) + (5* supply_cinco) + (1 * supply_uno);
        return saldo;
    }

    // Get _ OWNER NFTS
    function Owner_NFT(address _address) public view returns(uint256[] memory){
        return owner_id[_address];
    }

    // GET TRANSACTIONS ID

    function Owner_transaction(address _address) public view returns(uint256[] memory){
        return transactions[_address];
    }

    function Transaction_bills(uint256 _id) public view returns(uint256[]memory){
        return transaction_bills[_id];
    } 

    function Owner_value(address _address) public view returns(uint256[]memory){
        return owner_values[_address];
    }

    // Activacion del minteo

    function activacion()public{
        onlyOwner();
        active = !active;
    }

    // SET OWNER 

    // SET CURRENCIES SUPPLY
    function ChangeStock(uint _100, uint _50, uint _20, uint _10, uint _5, uint _1) public returns(bool){
        onlyOwner();
        supply_cien = _100;
        supply_cincuenta = _50;
        supply_veinte = _20;
        supply_diez = _10;
        supply_cincuenta = _5;
        supply_uno = _1;

        return true;
    }
    
    //BURN
    function burneable(uint256 _tokenId) public  returns(bool){
        onlyOwner();
        _burn(_tokenId);
        return true;
    }

    // RETIRAR DEL CONTRATO
    function Withdraw() public payable {
        onlyOwner();

        //Other token
        //IERC20(tokenContract).transferFrom(msg.sender, msg.sender, costNormal);

        //ETHER BALANCE
        (bool os, ) = payable(_owner).call{value: address(this).balance}("");
        
        require(os);
    }
}