import { useState, useEffect } from 'react'
import { client } from '../lib/sanityClient'
import { ARTICLES_QUERY, ARTICLE_BY_SLUG_QUERY } from '../lib/queries'

export function useSanityArticles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client.fetch(ARTICLES_QUERY)
      .then(data => {
       console.log('Articles Sanity reçus :', data.length, data)

       setArticles(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [])

  return { articles, loading, error }
}

export function useSanityArticle(slug) {
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
      .then(data => {
        setArticle(data)
        setLoading(false)
      })
  }, [slug])

  return { article, loading }
}
