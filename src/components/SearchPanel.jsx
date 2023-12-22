import React from "react";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"

const SearchPanel = ({search}) => {
  const [word, setWord] = useState()

  return (
    <div className='input-group'> 
      <button className='btn-details' onClick={(e) => search(word, e)}> Wyszukaj </button>
      <input type="text" className='form-search' placeholder='wyszukaj ...' onChange={(e) => setWord(e.target.value)}/>
    </div>
  )
}

export default SearchPanel;