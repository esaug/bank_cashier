
const Cashier = artifacts.require("Cashier")
const expect = require('chai').expect

let valor = 13

contract('Cashier', accounts=>{
    const [A,B] = accounts

    console.log(A)
    console.log(B)

    let cashierInstance
    
    beforeEach(async()=>{
        cashierInstance = await Cashier.new()
    })

    it('Retorno billetes', async()=>{
        
        try {
            const tx2 = await cashierInstance.activacion()
            const result = await cashierInstance.ConvertDenom(valor)
            const billetes = await cashierInstance.billetes_return()

            expect(billetes).to.equal("5,5,1,1")
            
        } catch (error) {
            
        }
    })

    it('Setting supply from another account different the owner',async()=>{
        
        try {
            const result = await cashierInstance.ChangeStock(2,2,2,2,2, {from:B})
            expect(result.receipt.status).to.equal(false)
        } catch (error) {
            expect(error.reason).to.equal("Ownable: caller is not the owner")
        }
        //expect(stock).to.equal('caller is not the owner')
    })

    it('Setting supply from the owner account', async()=>{
        try {
            const result = await cashierInstance.ChangeStock(2,2,2,2,2, {from:A})
            expect(result.receipt.status).to.equal(true)
        } catch (error) {
            
        }      
    })
})