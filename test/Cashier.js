
const Cashier = artifacts.require("./cashier.sol")

contract('Cashier', ()=>{
    
    let value = 13;

    
        it('Retorna Billetes', async ()=>{
            let cashier = await Cashier.deployed()
            let result = await cashier.ConvertDenom(value)
            assert.equal([10,1,1,1],[10,1,1,1],"DONE!")
        }) 

})