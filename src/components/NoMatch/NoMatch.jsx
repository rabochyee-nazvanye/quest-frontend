import React from 'react'
import ErrorPage from '../shared/ErrorPage/ErrorPage'

export default function NoMatch (props) {
  return (
    <ErrorPage code={404} description={'Мы не рассчитывали, что поиск зайдет так далеко'}/>
  )
}
