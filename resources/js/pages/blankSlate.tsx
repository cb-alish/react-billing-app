import {useState} from "react";

export default function BlankSlate() {
    const [kName, setKName] = new useState("flex border border-gray-400 min-h-[10rem]")
    const box = "h-[100px] w-[100px] bg-green-500 border border-white-400 ml-10";
    const parent = "display flex"
    return (
        <div className="flex border border-gray-400 min-h-[30rem] justify-evenly" >
            <div className={`${box}`}></div>
            <div className={`${box}`}></div>
            <div className={`${box}`}></div>
        </div>
    );
}
