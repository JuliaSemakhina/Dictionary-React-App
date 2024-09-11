import React, { useState, useContext } from 'react'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  //States
  const [query, setQuery] = useState('');
  const [words, setWords] = useState([]);
  const [audios, setAudio] = useState([]);
  const [examples, setExample] = useState([]);
  const [synonyms, setSynonym] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const getWord = async (e) => {
    e.preventDefault();

    var api = 'https://api.wordnik.com/v4/word.json/';
    var key = 'ag99rn7f4gdd82rlrrcxdd1p6yaxw6hbogitsadptvg5221d8';
    var i = Math.floor(Math.random() * 9);

    const request1 = fetch(`${api}${query}/definitions?limit=10&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=${key}`).then(response => response.json());

    const request2 = fetch(`${api}${query}/examples?includeDuplicates=false&useCanonical=true&limit=10&api_key=${key}`).then(response => response.json());

    const request3 = fetch(`${api}${query}/relatedWords?useCanonical=true&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${key}`)
      .then(response => response.json());

    const request4 = fetch(`${api}${query}/audio?useCanonical=true&limit=10&api_key=${key}`).then(response => response.json());

    Promise.all([request1, request2, request3, request4])

      .then(
        (([data1, data2, data3, data4]) => {
          setWords(data1[1]);
          setExample(data2.examples[i]);
          setSynonym(data3[0].words);
          setAudio(data4[0]);
          setIsClicked(true);
        })
      )
      .catch(error => {
        alert('Please enter a search word');
        setIsClicked(false);
      })
  }

  const updateSearch = (e) => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  return (
    <AppContext.Provider value={{
      words,
      updateSearch,
      getWord,
      query,
      isClicked,
      examples,
      synonyms,
      audios
    }}
    >
      {children}
    </AppContext.Provider>
  )
}

//custom hook
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

