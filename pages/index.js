import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
const currentLink = 'https://rickandmortyapi.com/api/character/'
import Image from 'next/image'


//useState : img --> bakcRickk, onClick data.image

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}



export async function getServerSideProps() {
  const res = await fetch(currentLink);
  const data = await res.json();
  return { props: { data } }
}

export default function Home({ data }) {

  const [currentData, setCurrentData] = useState(data);
  const [currentChar, setCurrentChar] = useState(currentData.results)
  const [allChars, setAllchars] = useState([...currentChar]);

  useEffect(() => {
    if (currentData.info.next == null) {
      return
    } else {

      async function getAllCharacters() {
        const res = await fetch(currentData.info.next);
        const data = await res.json();
        setCurrentData(data)

        const circurr = [...currentChar, ...data.results]
        setAllchars(circurr)
        // setCurrentChar(allChars) 
        

      }
      getAllCharacters()

    }
  }, [currentData])
  const random5 = getMultipleRandom(allChars, 5)

  return (
    <div className={styles.mainContainer}>
      <ul className={styles.cardContainer}>
        {
          
          random5.map((character) => {
            // console.log(character)
            const { id, name, image } = character;
            return (
              <li key={id} className={styles.card} onClick={(()=>{console.log(id)})}>
                {/* <img className={styles.cardImg} onClick={((e) => { e.target.src = image })} src={'/backRick.jpg'} alt={`${name}'s Thumb`}> */}
                <img className={styles.cardImg} src={image} alt={`${name}'s Thumb`}>
                </img>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
