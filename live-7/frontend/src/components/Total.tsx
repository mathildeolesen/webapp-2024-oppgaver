
export default function Total({ total }: Readonly<{total: number}>) {

    // Failsafe -> hvis 0, ikke rendre noe som helst
    if (total === 0) return null;
    
    return(
        <div>Antall studenter: {total}</div>
    )
}