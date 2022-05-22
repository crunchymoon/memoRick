import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
const currentLink = 'https://rickandmortyapi.com/api/character/'
import Skeleton from '../components/Skeleton';
import Image from 'next/image'

export async function getServerSideProps() {
  const res = await fetch(currentLink);
  const data = await res.json();
  return { props: { data } }
}

export default function Home({ data }) {

  const [currentData, setCurrentData] = useState(data);
  const [currentChar, setCurrentChar] = useState(currentData.results)
  const [allChars, setAllchars] = useState([...currentChar]);
  const [randomChars, setRandomChars] = useState([])
  const [update, setUpdate] = useState(false)

  const getMultipleRandom = (ar, size) => {
    let new_ar = [...ar];
    new_ar.splice(Math.floor(Math.random() * ar.length), 1);
    return ar.length <= (size + 1) ? new_ar : getMultipleRandom(new_ar, size);
  }

  useEffect(() => {
    if (currentData.info.next == null) {
      setTimeout(()=>{
        setUpdate(true);
      },1800)
      

    } else {

      async function getAllCharacters() {
        const res = await fetch(currentData.info.next);
        const data = await res.json();
        setCurrentData(data)
        const circurr = [...currentChar, ...data.results]
        setAllchars(circurr)
        setCurrentChar(allChars)

      }
      getAllCharacters()

    }
  }, [currentData])


  useEffect(() => {
    setRandomChars(getMultipleRandom(allChars, 20))
  }, [update])


  return (
    <div className={styles.mainContainer}>
      <ul className={styles.cardContainer}>
        {
          update && (
            randomChars.map((character) => {
              const { id, name, image } = character;
              return (
                <li key={id} className={styles.card} onClick={(() => { console.log(id) })}>
                  {/* <img className={styles.cardImg} onClick={((e) => { e.target.src = image })} src={'/backRick.jpg'} alt={`${name}'s Thumb`}> */}
                  <img className={styles.cardImg} src={image} alt={`${name}'s Thumb`}>
                  </img>
                </li>
              )
            })
          )
        }
        {!update && <Skeleton type='loading'/>}

      </ul>
    </div>
  )
}
