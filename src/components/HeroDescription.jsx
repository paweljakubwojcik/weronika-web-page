import React from 'react'
import { useStaticQuery, graphql } from "gatsby"


export default function HeroDescription() {

    const data = useStaticQuery(graphql`
     query {
        strapiHeroDescription {
           description
         }
       }
   `)



    const sentences = data.strapiHeroDescription.description.split('. ').map(str => str + '. ')


    const sentencesPerParagraph = Math.ceil(sentences.length / 3)
    const paragraphs = []
    sentences.forEach((sentence, i) => {
        if (i % sentencesPerParagraph === 0)
            paragraphs.push(sentence)
        else
            paragraphs[paragraphs.length - 1] = paragraphs[paragraphs.length - 1].concat(sentence)
    })
    console.log(sentencesPerParagraph)
    return (
        paragraphs.map((paragraph, i) => <p key={i} >{paragraph}</p>)
    )
}
