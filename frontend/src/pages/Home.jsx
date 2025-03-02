import CurrentlyReading from "../components/current/CurrentRead"
import HeroBook from "../components/heroBook/HeroBook"


export default function HomePage() {
    return <div>
        <div>
        <HeroBook/>
        </div>
        <div>
            <CurrentlyReading />
        </div>
               
    </div>
}