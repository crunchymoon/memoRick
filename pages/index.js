import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss'
const currentLink = 'https://rickandmortyapi.com/api/character/'
import Image from 'next/image'


//useState : img --> bakcRickk, onClick data.image

export async function getServerSideProps() {
  const res = await fetch(currentLink);
  const data = await res.json();
  return { props: { data } }
}

export default function Home({ data }) {
  // const [img,setImg] = useState('');
  const [currentData, setCurrentData] = useState(data);
  const [currentChar, setcurrentChar] = useState(currentData.results)
  return (
    <div className={styles.mainContainer}>
      <ul className={styles.cardContainer}>
        {
          currentChar.map((character) => {
            const { id, name, image } = character;
            return (
              <li key={id} className={styles.card} >
                <img className={styles.cardImg} onClick={((e)=>{e.target.src=image})} src={'/backRick.jpg'} alt={`${name}'s Thumb`}>
                </img>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
