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
let asdfra = [];

// let checkIfMatched = (e) => {
//   if (asdfra[0] == asdfra[1]) {
//     asdfra = []
//     console.log(e.target)
//   } else if (asdfra.length == 2) {
//     asdfra = [];
//   }
// }


export default function Home({ data }) {

  const [currentData, setCurrentData] = useState(data);
  const [currentChar, setCurrentChar] = useState(currentData.results)
  const [allChars, setAllchars] = useState([...currentChar]);
  const [randomChars, setRandomChars] = useState([])
  const [copyChars, setCopyChars] = useState([])
  const [update, setUpdate] = useState(false)

  const getMultipleRandom = (ar, size) => {
    let new_ar = [...ar];
    new_ar.splice(Math.floor(Math.random() * ar.length), 1);
    return ar.length <= (size + 1) ? new_ar : getMultipleRandom(new_ar, size);
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // max & min both included 
  }

  useEffect(() => {
    if (currentData.info.next == null) {
      // setTimeout(()=>{
      setUpdate(true);
      // },1800)
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
    setRandomChars(getMultipleRandom(allChars, 10))

  }, [update])
  useEffect(() => {
    setCopyChars(randomChars)
  }, [randomChars])


  return (
    <div className={styles.mainContainer}>
      <ul className={styles.cardContainer}>
        {
          update && (
            randomChars.map((character) => {
              const { id, name, image } = character;
              return (
                <li asd={id} style={{ order: getRandomIntInclusive(0, 100) }} key={id} className={styles.card}
                  onClick={
                    function (e) {
                      setTimeout(()=>{
                        e.target.src='/backRick.jpg'
                      },3000)
                      if (e.target == e.target || e.target == e.target.querySelector('img')) {
                        let listi = document.querySelectorAll('li');

                        //if asd == asd (ugyanannyi mind a 2 nel, hiddenre a visibilityt)

                        asdfra.push(id)
                        if (asdfra[0] == asdfra[1]) {
                          asdfra = []
                          console.log('match')
                          listi.forEach((lis) => {
                            if (lis.getAttribute('asd') == e.target.getAttribute('asd')) {
                              lis.style.visibility = 'hidden';
                            }
                          })
                        } else if (asdfra.length == 2) {
                          asdfra = [];
                          e.target.src='/backRick.jpg'
                        }
                      }


                    }
                  }>
                  <img asd={id} className={styles.cardImg} onClick={((e) => { e.target.src = image })} src={'/backRick.jpg'} alt={`${name}'s Thumb`}>
                  {/* <img asd={id} className={styles.cardImg} src={image} alt={`${name}'s Thumb`}> */}
                  </img>
                </li>
              )
            })
          )
        }
        {
          update && (
            copyChars.map((character) => {
              const { id, name, image } = character;
              return (
                
                <li asd={id} style={{ order: getRandomIntInclusive(0, 100) }} key={id} className={styles.card}
                  onClick={
                    function (e) {
                      setTimeout(()=>{
                        e.target.src='/backRick.jpg'
                      },3000)
                      if (e.target == e.target || e.target == e.target.querySelector('img')) {
                        let listi = document.querySelectorAll('li');


                        asdfra.push(id)
                        if (asdfra[0] == asdfra[1]) {
                          asdfra = []
                          console.log('match')
                          listi.forEach((lis) => {
                            if (lis.getAttribute('asd') == e.target.getAttribute('asd')) {
                              lis.style.visibility = 'hidden';
                            }
                          })
                        } else if (asdfra.length == 2) {
                          asdfra = [];
          
                        }
                      }


                    }
                  }
                >
                  <img asd={id} className={styles.cardImg} onClick={((e) => { e.target.src = image })} src={'/backRick.jpg'} alt={`${name}'s Thumb`}>
                  {/* <img asd={id} className={styles.cardImg} src={image} alt={`${name}'s Thumb`}> */}
                  </img>
                </li>
              )
            })
          )
        }
        {!update && <Skeleton type='loading' />}

      </ul>
    </div>
  )
}
