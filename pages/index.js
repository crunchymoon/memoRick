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

  const [currentData, setCurrentData] = useState(data);
  const [currentChar, setCurrentChar] = useState(currentData.results)
  // const [allChars, setAllchars] = useState(currentData.results);
  const [allChars,setAllchars] = useState([...currentChar]);
  
  useEffect(() => {
    if (currentData.info.next==null){
      return
    } else {
      
        async function getAllCharacters() {
          const res = await fetch(currentData.info.next);
          const data = await res.json();
          setCurrentData(data)
          // setAllchars(data.results)
          
          // console.log(allChars)
          const circurr = [...currentChar,...data.results]
          setAllchars(circurr)
  
        }
        getAllCharacters()
      
    }
  }, [currentData])
    


  

  return (
    <div className={styles.mainContainer}>
      <p>{allChars.map((allChar)=>{
        console.log(allChar)
      })}</p>
      <ul className={styles.cardContainer}>
        {
          currentChar.map((character) => {
            const { id, name, image } = character;
            return (
              <li key={id} className={styles.card} >
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
