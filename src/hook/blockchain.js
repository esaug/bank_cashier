import { useDispatch, useSelector } from "react-redux";


export function useBlockchain() {

    const dispatch = useDispatch()
    const blockchain = useSelector((store)=> store.blockchain)
    const dataUser = useSelector((store) => store.dataUser)

    return {
        blockchain,
        dataUser,
        dispatch
    }

}