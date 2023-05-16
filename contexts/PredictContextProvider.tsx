// import { PREDICT_CONTRACT_ADDRESS } from "@/services/constants";
// import { chainGrpcWasmApi, msgBroadcastClient } from "@/services/services";
// import { getAddresses } from "@/services/wallet";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSigningClient } from 'contexts/client'
import { EncodeObject } from "@cosmjs/proto-signing";

const contractAddress = "devcore1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqpqvdls"

type StoreState = {
    data: {
        id: string;
        status: string;
        totalUp: string;
        totalDown: string;
        startTime: string;
        endTime: string;
        startPrice: string;
        upPosition: string;
        downPosition: string;
        binancePrice: string;
        timeStamp: string

    },
    betInfo: {
        upBet: string,
        downBet: string,
        endPrice: string,
        startPrice: string,
        totalPrize: string,

    },
    reward: string,
    queryBetInfo: (value: string) => void,
    queryReward: (id: string) => void,
    // startBet: () => void,
    // endBet: () => void,
    upBet: (value: string, walletAddress: any, signingClient: any) => void,
    downBet: (value: string, walletAddress: any, signingClient: any) => void,
    claimReward: (value: string, walletAddress: any, signingClient: any) => void,
    fetchCurrentInfo: () => void,
    // getid: () => void
};

const PredictContext = createContext<StoreState>({
    data: {
        id: '0',
        status: '0',
        totalUp: '0',
        totalDown: '0',
        startTime: '0',
        endTime: '0',
        startPrice: '0',
        upPosition: '0',
        downPosition: '0',
        binancePrice: '0',
        timeStamp: '0'
    },
    betInfo: {
        upBet: "0",
        downBet: "0",
        endPrice: "0",
        startPrice: "0",
        totalPrize: "0",

    },
    reward: '0',
    queryBetInfo: (value) => { },
    queryReward: (id) => { },
    // startBet: () => { },
    // endBet: () => { },
    upBet: (value, walletAddress, signingClient) => { },
    downBet: (value, walletAddress, signingClient) => { },
    claimReward: (value, walletAddress, signingClient) => { },
    fetchCurrentInfo: () => { },
    // getid: () => { }
});

export const usePredictStore = () => useContext(PredictContext);

type Props = {
    children?: React.ReactNode;
};

const PredictContextProvider = (props: Props) => {
    const [info, setInfo] = useState({
        id: '0',
        status: '0',
        totalUp: '0',
        totalDown: '0',
        startTime: '0',
        endTime: '0',
        startPrice: '0',
        upPosition: '0',
        downPosition: '0',
        binancePrice: '0',
        timeStamp: '0'
    });
    const [betInfoState, setBetInfo] = useState({
        upBet: "0",
        downBet: "0",
        endPrice: "0",
        startPrice: "0",
        totalPrize: "0",
    });
    // const [addr, setAddr] = useState("inj1jx9uecvwlf94skkwrfumhv0sjsm85um9mmg9ny");
    const [reward, setReward] = useState("0");
    const { walletAddress, signingClient, coreumQueryClient } = useSigningClient()


    // const { walletAddress } = useSigningClient()

    useEffect(() => {
        const interval = setInterval(() => fetchCurrentInfo(), 5000);
        return () => clearInterval(interval);
    }, [walletAddress]);


    const fetchFromBinance = async () => {
        try {
            const response = await fetch('https://data.binance.com/api/v3/ticker/price?symbol=INJUSDT');
            const data = response.json();
            return data;
        }
        catch {
            return { price: '0' };
        }
    };

    async function fetchCurrentInfo() {
        let binancePrice = await fetchFromBinance();
        let timeStamp = await queryTimeStamp();
        let addr = "devcore1tzt07pu6a0dn80rr5s40dyk9j8vpeztnth4ysg";
        // if (walletAddress) addr = walletAddress;
        try {
            // const response = await chainGrpcWasmApi.fetchSmartContractState(
            //     PREDICT_CONTRACT_ADDRESS,
            //     toBase64({ current_info: { addr: addr } })
            // ) as { data: string };

            // const data = await fromBase64(response.data);
            // await setInfo({
            //     id: data.id as string,
            //     status: data.status as string,
            //     totalUp: data.totalUp as string,
            //     totalDown: data.totalDown as string,
            //     startTime: data.startTime as string,
            //     endTime: data.endTime as string,
            //     startPrice: data.startPrice as string,
            //     upPosition: data.upPosition as string,
            //     downPosition: data.downPosition as string,
            //     binancePrice: binancePrice.price,
            //     timeStamp: timeStamp as string,
            // });
            // console.log(addr);
        } catch (e) {
            alert((e as any).message);
        }
    }

    async function queryTimeStamp() {
        try {
            // const response = await chainGrpcWasmApi.fetchSmartContractState(
            //     PREDICT_CONTRACT_ADDRESS,
            //     toBase64({ time_stamp_info: {} })
            // ) as { data: string };

            // const info = fromBase64(response.data);
            // return info;
            return '0';
        } catch (e) {
            return '0';
        }
    }

    async function queryBetInfo(value: string) {
        try {
            // const response = await chainGrpcWasmApi.fetchSmartContractState(
            //     PREDICT_CONTRACT_ADDRESS,
            //     toBase64({ bet_info: { bet_id: parseInt(value, 10) } })
            // ) as { data: string };

            // const data = fromBase64(response.data);
            // setBetInfo({
            //     upBet: data.upBet as string,
            //     downBet: data.downBet as string,
            //     endPrice: data.endPrice as string,
            //     startPrice: data.startPrice as string,
            //     totalPrize: data.totalPrize as string,
            // });
        } catch (e) {
            alert(e);
        }
    }
    async function queryReward(id: string) {
        if (!walletAddress) {
            return;
        }
        try {
            // const response = await chainGrpcWasmApi.fetchSmartContractState(
            //     PREDICT_CONTRACT_ADDRESS,
            //     toBase64({ user_reward: { addr: walletAddress, bet_id: parseInt(id, 10) } })
            // ) as { data: string };
            // const desh_data = fromBase64(response.data).toString();
            // setReward(desh_data);
        } catch (e) {
            alert(e)
        }
    }
    async function upBet(value: string, walletAddress: any, signingClient: any) {
        console.log(value);
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }
        const amount = {
            denom: 'udevcore',
            amount: BigInt((parseFloat(value) * 1000000)).toString()
        }

        // sendTx([{
        //     typeUrl: 'up_bet',
        //     value: {},
        // }], amount).then((passed) => {
        //     if (passed) {
        //         fetchCurrentInfo();
        //     }
        // })
        console.log(walletAddress);
    }

    async function downBet(value: string, walletAddress: any, signingClient: any) {
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }
        const amount = {
            denom: 'udevcore',
            amount: BigInt((parseFloat(value) * 1000000)).toString()
        }

        try {
            // const msg = MsgExecuteContractCompat.fromJSON({
            //     funds: amount,
            //     contractAddress: PREDICT_CONTRACT_ADDRESS,
            //     sender: walletAddress,
            //     msg: {
            //         down_bet: {},
            //     },
            // });

            // await msgBroadcastClient.broadcast({
            //     msgs: msg,
            //     walletAddress: walletAddress,
            // });
            fetchCurrentInfo();
        } catch (e) {
            alert((e as any).message);
        }
    }

    async function claimReward(value: string, walletAddress: any, signingClient: any) {
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }
        try {
            // const msg = MsgExecuteContractCompat.fromJSON({
            //     contractAddress: PREDICT_CONTRACT_ADDRESS,
            //     sender: walletAddress,
            //     msg: {
            //         claim_reward: { bet_id: parseInt(value, 10) },
            //     },
            // });

            // await msgBroadcastClient.broadcast({
            //     msgs: msg,
            //     walletAddress: walletAddress,
            // });
            fetchCurrentInfo();
        } catch (e) {
            alert((e as any).message);
        }
    }

    const sendTx = async (msgs: readonly EncodeObject[], amount: any, walletAddress: any, signingClient: any) => {
        try {
            const resp = await signingClient
                ?.signAndBroadcast(walletAddress, msgs, amount, 'auto')
            console.log(`Tx hash: ${resp?.transactionHash}`)
            //   setLoading(false)
            return true
        } catch (error: any) {
            console.error(error)
            //   setLoading(false)
            alert(`Error! ${error}`)
            return false
        }
    }


    return (
        <PredictContext.Provider
            value={{
                data: info,
                betInfo: betInfoState,
                reward: reward,
                queryBetInfo,
                queryReward,
                upBet,
                downBet,
                claimReward,
                fetchCurrentInfo,
                // getid,
            }}
        >
            {props.children}
        </PredictContext.Provider>
    );
};
export default PredictContextProvider;