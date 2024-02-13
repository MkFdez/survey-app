import axios from "axios";
import react from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_URL from "../config/backend";
export default function Result() {
    const API = API_URL()
    const [result, setResult] = useState([]);
    const {id} = useParams();
    let stats = [];
    useEffect(() => {
        axios.get(`${API}/result`, {params: {id: id}}).then(({data}) => {
            setResult(data);
        })
    }, []);
    if(result.length > 0) {
        stats = result.map((res) => {
        //TODO: Add the rest of the stats here
        })
    }
    return (
        <div>
            <h1>Result</h1>
            </div>
    )
}