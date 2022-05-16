import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
const currentLink = 'https://rickandmortyapi.com/api/character/'

export async function getServerSideProps() {
  const res = await fetch(currentLink);
  const data = await res.json();
  return { props: { data } }
}

export default function Home({ data }) {

  const [currentData, setCurrentData] = useState(data);
  const [currentChar, setcurrentChar] = useState(currentData.results)
  console.log(currentChar);
  return (
    <>
      <ul className={styles.cardContainer}>
        {
          currentChar.map((character) => {
            const { id, name, image } = character;
            return (
              <li className={styles.card}>
                <img className={styles.cardImg} src={image} alt={`${name}'s Thumb`}>
                </img>
              </li>
            )
          })
        }

      </ul>
    
    </>
  )
}
