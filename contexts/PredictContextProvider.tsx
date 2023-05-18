import React, { createContext, useContext, useEffect, useState } from "react";
import { useSigningClient } from 'contexts/client'
import { EncodeObject } from "@cosmjs/proto-signing";
import { QueryClient } from "coreum/query";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate"
import { fromUtf8 } from "@cosmjs/encoding";


const encoder = new TextEncoder();
const contractAddress = "devcore1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqpqvdls";
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
    startBet: () => void,
    endBet: () => void,
    upBet: (value: string) => void,
    downBet: (value: string) => void,
    claimReward: (value: string) => void,
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
    startBet: () => { },
    endBet: () => { },
    upBet: (value) => { },
    downBet: (value) => { },
    claimReward: (value) => { },
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

    const [reward, setReward] = useState("0");
    const { walletAddress, signingClient, coreumQueryClient } = useSigningClient()

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
        const queryClient = await CosmWasmClient.connect("https://full-node.devnet-1.coreum.dev:26657")
        let binancePrice = await fetchFromBinance();
        let timeStamp = await queryTimeStamp();
        let addr = "devcore1nsw7nap6emsjsthgta2k4mfvugj3xms7myldg6";
        if (walletAddress) addr = walletAddress;
        try {
            const response = await queryClient.queryContractSmart(
                contractAddress,
                { current_info: { addr: addr } }) as { data: string };

            const data: any = await JSON.parse(fromUtf8(response.data));
            console.log(data);
            // const data = await TextDecoder().decode(response.data);
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
            // console.log(data);
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
    async function startBet() {
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }

        try {
            // const msg = MsgExecuteContractCompat.fromJSON({
            //     contractAddress: PREDICT_CONTRACT_ADDRESS,
            //     sender: walletAddress,
            //     msg: {
            //         start: {
            //             price: '10000'
            //         },
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
    async function endBet() {
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }

        try {
            // const msg = MsgExecuteContractCompat.fromJSON({
            //     contractAddress: PREDICT_CONTRACT_ADDRESS,
            //     sender: walletAddress,
            //     msg: {
            //         end: {
            //             price: "1000"
            //         },
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
    async function upBet(value: string) {
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }
        const amount = {
            denom: 'udevcore',
            amount: BigInt((parseFloat(value) * 1000000)).toString()
        }

        const msgs = {
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: {
                sender: walletAddress,
                contract: contractAddress,
                msg: encoder.encode(JSON.stringify({ up_bet: {} })),
                funds: [amount],
            },
        }


        try {
            sendTx([msgs]).then((passed) => {
                if (passed) {
                    fetchCurrentInfo();
                }
            })
        } catch (e) {
            alert((e as any).message);
        }
    }
    async function downBet(value: string) {
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }
        const amount = {
            denom: 'udevcore',
            amount: BigInt((parseFloat(value) * 1000000)).toString()
        }

        const msgs = {
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: {
                sender: walletAddress,
                contract: contractAddress,
                msg: encoder.encode(JSON.stringify({ down_bet: {} })),
                funds: [amount],
            },
        }


        try {
            sendTx([msgs]).then((passed) => {
                if (passed) {
                    fetchCurrentInfo();
                }
            })
        } catch (e) {
            alert((e as any).message);
        }
    }
    async function claimReward(value: string) {
        if (!walletAddress) {
            alert("No Wallet Connected");
            return;
        }

        const msgs = {
            typeUrl: "/cosmwasm.wasm.v1.MsgExecuteContract",
            value: {
                sender: walletAddress,
                contract: contractAddress,
                msg: encoder.encode(JSON.stringify({ claim_reward: { bet_id: parseInt(value, 10) } })),
            },
        }
        try {
            sendTx([msgs]).then((passed) => {
                if (passed) {
                    fetchCurrentInfo();
                }
            })
        } catch (e) {
            alert((e as any).message);
        }
    }


    const sendTx = async (msgs: readonly EncodeObject[]) => {
        try {
            const resp = await signingClient
                ?.signAndBroadcast(walletAddress, msgs, 'auto')
            console.log(`Tx hash: ${resp?.transactionHash}`)
            return true
        } catch (error: any) {
            console.error(error)
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
                startBet,
                endBet,
                upBet,
                downBet,
                claimReward,
                fetchCurrentInfo,
            }}
        >
            {props.children}
        </PredictContext.Provider>
    );
};
export default PredictContextProvider;