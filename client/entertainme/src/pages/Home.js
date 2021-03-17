import React from 'react'
import { useQuery, gql } from '@apollo/client'
import Card from '../components/Card'
import { Container } from '@material-ui/core'
import { getAllServices } from '../queries/queries'

export default function Home() {

  const { loading, error, data } = useQuery(getAllServices)

  if(loading) return <h1>Loading....</h1>
  if(error) return <p>Error!</p>
  const allServices = data.movies.concat(data.series)
  if(!allServices) return <h1>Not Found</h1>
  
  return(
    <Container style={{position: 'relative', top: 50, textAlign:'center'}}>
    <h1>Home Page</h1>
    <br/>
    <br/>
      {
        allServices.map((service, index) => <Card key={index} service={service}/>)
      }
    </Container>
  )
}