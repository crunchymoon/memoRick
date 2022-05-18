import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
const currentLink = 'https://rickandmortyapi.com/api/character/'
import mypic from '../public/bgRickk.jpg'
import Image from 'next/image'



export async function getServerSideProps() {
  const res = await fetch(currentLink);
  const data = await res.json();
  return { props: { data } }
}

export default function Home({ data }) {

  console.log(mypic)

  const [currentData, setCurrentData] = useState(data);
  const [currentChar, setcurrentChar] = useState(currentData.results)
  console.log(currentChar);
  return (
    <div className={styles.mainContainer}>
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
 {/* <Image
      src={mypic}
      alt="Picture of the author"
      layout='fill'
      objectFit='cover'
      objectPosition='center'
    /> */}

      </ul>
    </div>
  )
}
