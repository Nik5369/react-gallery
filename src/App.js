import React, { useEffect, useState } from 'react'
import './index.scss'
import { Collection } from './Collection'

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function App() {
  const [categoryId, setCategoryId] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [collections, setColections] = useState([])

  useEffect(() => {
    setIsLoading(true)

    const category = categoryId ? `category=${categoryId}` : ''

    fetch(
      `https://65315cc04d4c2e3f333ce4ee.mockapi.io/photo-collections?page=${page}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setColections(json)
      })
      .catch((err) => {
        console.warn('err')
      })
      .finally(() => setIsLoading(false))
  }, [categoryId, page])
  console.log(collections)
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((el, id) => (
            <li
              onClick={() => setCategoryId(id)}
              className={categoryId === id ? 'active' : ''}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collections
            .filter((el) => {
              return el.name.toLowerCase().includes(searchValue.toLowerCase())
            })
            .map((el, id) => (
              <Collection name={el.name} images={el.photos} key={id} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, id) => (
          <li
            onClick={() => setPage(id + 1)}
            className={page === id + 1 ? 'active' : ''}
          >
            {id + 1}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
