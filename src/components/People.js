export default function People({data}){
    const novelty = 'Что нового';
    return(<>
    <h3>{novelty}</h3>
    <p>People</p>
    <p>{data}</p>
    </>)
}