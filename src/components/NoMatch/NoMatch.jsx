import React from 'react'
import ErrorPage from '../shared/ErrorPage/ErrorPage'
import {CLIENT_URL} from "../../settings";
import MetaTags from "../shared/MetaTags/MetaTags";


export default function NoMatch (props) {
  const metaData = {
    title: "штош...",
    description: "",
    keywords: "квест",
    robots:"",
    canonicalUrl: CLIENT_URL
  };
  return (
      <React.Fragment>
        <MetaTags metaData={metaData} />
        <ErrorPage code={404} description={'Мы не рассчитывали, что поиск зайдет так далеко'}/>
      </React.Fragment>
  )
}
