import React from 'react'
import './SearchRes.css'

function SearchRes({inputText}) {
    const data = [{
      "id": 1,
      "text": "Enemy"
  }, {
      "id": 2,
      "text": "The Bones"
  }, {
      "id": 3,
      "text": "Brown Rang"
  }, {
      "id": 4,
      "text": "Believer"
  }, {
      "id": 5,
      "text": "Eye of Tiger"
  }]
    const filteredData = data.filter((el) => {
        //if no input then return the original
        if (inputText === '') {
            return null;
        }
        //return the item which contains the user input
        else {
            return el.text.toLowerCase().includes(inputText)
        }
    })
    console.log(inputText)

  return (
    <div className='searchres'>
        <div className='searchres__wrapper'>
            <ul className='searchres__list'>
                {filteredData.map((item) => (
                    <li key={item.id}>{item.text}</li>
                    ))}
            </ul>
        </div>
    </div>
  )
}

export default SearchRes
