import { usePredictStore } from "contexts/PredictContextProvider";
import { useSigningClient } from 'contexts/client'
import React, { useEffect, useState, useContext } from "react";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";


type Props = {};
const CurrentBet = (props: Props) => {
    // const { walletAddress, signingClient, coreumQueryClient } = useSigningClient()
    // console.log(walletAddress)

    const [inputValue, setInputValue] = useState("0");
    // const [inputAddress, setInputAddress] = useState("0");
    const [inpuId, setInpuId] = useState("0");
    const [betID, setBetID] = useState("0");
    const [rewardState, setReward] = useState("0");
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
    const { data,
        betInfo,
        reward,
        queryBetInfo,
        queryReward,
        startBet,
        endBet,
        upBet,
        downBet,
        claimReward,
        fetchCurrentInfo,
    } = usePredictStore();

    async function getid() {
        const addr = "devcore17p9rzwnnfxcjp32un9ug7yhhzgtkhvl9jfksztgw5uh69wac2pgsemjgk5";
        try {
            const queryClient = await CosmWasmClient.connect("https://full-node.devnet-1.coreum.dev:26657")
            const data = await queryClient.queryContractSmart(
                addr,
                { current_info: { addr: addr } });
            setBetID(data.id);
        } catch (e) {
            setBetID("0");
        }
    }

    useEffect(() => {
        fetchCurrentInfo();
        getid();
    }, []);

    useEffect(() => {
        setInfo(data);
        queryReward(betID);
        setReward(reward);
    }, [data]);

    useEffect(() => {
        setBetInfo(betInfo);
    }, [betInfo]);



    // function handleStartBet() {
    //     startBet();
    // }
    // function handleEndBet() {
    //     endBet();
    // }
    function handleUpBet() {
        upBet(inputValue);
        setInputValue("0");
    }
    function handleDownBet() {
        downBet(inputValue);
        setInputValue("0");

    }
    function handleClaimReward() {
        claimReward(betID);
        setReward("0");
    }
    function handleQueryBetInfoNext() {
        queryBetInfo((parseInt(betID, 10) + 1).toString());
        queryReward((parseInt(betID, 10) + 1).toString());
        setBetID((parseInt(betID, 10) + 1).toString());
    }
    function handleQueryBetInfoPrevious() {
        queryBetInfo((parseInt(betID, 10) - 1).toString());
        queryReward((parseInt(betID, 10) - 1).toString());
        setBetID((parseInt(betID, 10) - 1).toString());
    }
    function handleQueryCurrentInfo() {
        fetchCurrentInfo();
    }
    function handleQueryReward() {
        queryReward(betID as string);
    }
    function handleChange(event: any) {
        let { value, min, max } = event.target;

        if (Number(value) > 1000000) {
            value = 1000;
        }
        if (Number(value) < 0.001) {
            value = 0.001;
        }
        setInputValue(value);
    };

    const Claim = () => {
        return <button className="--check-and-claim" onClick={handleClaimReward}>Claim Reward</button>
    }
    return (
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 max-w-full sm:w-full">
            <div className=" --container-wrapper p-6 mt-6 border" >
                <div className="--container-inner">
                    <p className="order">
                        #{info.id} {parseInt(info.endTime) == 0 ? "Pending" : (parseInt(info.endTime) < parseInt(info.timeStamp) ? "Waiting for Result" : ("Betting End in " + (parseInt(info.endTime) - parseInt(info.timeStamp)).toString() + ' s'))}
                    </p>
                    <div className="line"></div>
                    <div className="price-tag">
                        <p>BTC Price</p>
                        <p className={parseFloat(info.binancePrice) >= parseFloat(info.startPrice) ? "price-up" : "price-down"} >${parseFloat(info.binancePrice).toFixed(2)}</p>
                        <table className="info">
                            <tr>
                                <th className="price-start">Start Price</th>
                                <th>${parseInt(info.startPrice)}</th>
                            </tr>
                            <tr>
                                <td className="prize">Total Prize</td>
                                <td>{((parseInt(info.totalUp) + parseInt(info.totalDown)) / 1000000).toFixed(2)} $CORE</td>
                            </tr>
                            <tr>
                                <td className="prize">Up Postion</td>
                                <td>{(parseInt(info.upPosition) / 1000000).toFixed(2)} $CORE</td>
                            </tr>
                            <tr>
                                <td className="prize">Down Postion</td>
                                <td>{(parseInt(info.downPosition) / 1000000).toFixed(2)} $CORE</td>
                            </tr>
                        </table>
                    </div>
                    <input type="number" className="input" value={inputValue} onChange={(e) => handleChange(e)} />
                    <div className="--button-container ---a">
                        <button onClick={handleUpBet} disabled={info.status != "1"} className="button ---a">UP</button>
                        {/* <p className="--button-text">UP</p> */}
                        <object className="--center-vertical" data="up.svg" width="50" height="50"> </object>

                    </div>
                    <div className="--button-container ---b">
                        <button onClick={handleDownBet} disabled={info.status != "1"} className="button ---b">DOWN</button>
                        <object className="--center-vertical" data="down.svg" width="40" height="40"> </object>
                        {/* <p className="--button-text">DOWN</p> */}
                    </div>
                </div>
            </div >

            {/* <div className="--margin"></div> */}

            <div className="--container-wrapper p-6 mt-6 border -bet--info">
                <div className="--step">
                    <div className="--bet-info-id">#{betID}</div>
                    <a className="previous round">
                        <button onClick={() => { betID != "0" ? handleQueryBetInfoPrevious() : {} }} className="--change-betId-button">
                            &#8249;
                        </button>
                    </a>
                    <a className="next round">
                        <button onClick={handleQueryBetInfoNext} className="--change-betId-button">
                            &#8250;
                        </button>
                    </a>
                </div>
                <div>
                    <table className="info">
                        <tr>
                            <th className="--bet-info-data">Start Price</th>
                            <th className="--bet-info-data">${parseInt(betInfoState.startPrice) / 1000}</th>
                        </tr>
                        <tr>
                            <td className="--bet-info-data">End Price</td>
                            <td className="--bet-info-data">${parseInt(betInfoState.endPrice) / 1000}</td>
                        </tr>
                        <tr>
                            <td className="--bet-info-data">Total Prize</td>
                            <td className="--bet-info-data">
                                {(parseInt(betInfoState.totalPrize) / 1000000).toFixed(2)} $CORE
                            </td>
                        </tr>
                        <tr>
                            <td className="--bet-info-data">Your Reward</td>
                            <td className="--bet-info-data">
                                {(parseInt(reward) / 1000000).toFixed(2)} $CORE
                            </td>
                        </tr>
                    </table>
                </div>
                {/* <div className="--margin"> */}

                {/* </div> */}
                <div className=".--bet-info-button">
                    {/* <button className="--check-and-claim" onClick={handleQueryReward}>CHECK</button> */}
                    <div>
                        {rewardState != "0" ? <Claim /> : null}
                    </div>

                </div>
            </div>
        </div >

    );
};

export default CurrentBet;
