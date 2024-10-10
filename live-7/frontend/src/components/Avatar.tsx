
type AvatarProps = {
    name: string
}

export default function Avatar(props: AvatarProps) {

    const { name } = props;

    const firstLetter = name.charAt(0).toUpperCase()
    // const firstLetter = name.split(" ").join("").toUpperCase().slice(0,1);
    // .split(" ") -> Gir liste med alle navn gitt (["Mathilde", "Olesen"])
    // .join("") -> Slår alle i listen sammen -> "MathildeOlesen"
    // .toUpperCase -> Gjør om til storbokstav -> "MATHILDEOLESEN"
    // .slice(0,1) -> Henter elementer fra og med 0 til (men ikke med) 1 -> M

    return (
        <p className='avatar'>{firstLetter}</p>
    )
}