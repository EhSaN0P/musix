import {fakeSongs} from "../../../data/fakeDb.js";
import SongCard from "../../Cards/SongCard.jsx";
import './Vibes.css'

export default function Vibes(){

    return <>
        <section className={'content-grid'}>

        {fakeSongs.map((item, index) => (
            <SongCard item={item} />
        ))}
        </section>
    </>
}