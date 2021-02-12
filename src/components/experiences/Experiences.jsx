import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'
import Akcent from '../color-accent/index'
import Edu from '../../assets/svg/Edu_svg.svg'
import Exp from '../../assets/svg/Exp_svg.svg'

export default function Experiences() {

    const data = useStaticQuery(graphql`
        query EduAndExpQuery {
            educations:allStrapiEducations(sort: {fields: start, order: DESC}) {
                nodes {
                    Contents
                    Tittle
                    start
                    end
                }
            }
            experiences:allStrapiEntries(sort: {fields: start, order: DESC}) {
                nodes {
                    Tittle
                    contents
                    end
                    start
                }
            }
        }
    `)

    return (
        <section className='exp-and-edu section'>
            <header className='section__header exp-and-edu__header'>
                <h2> Moje <Akcent>doświadczenie i wykształcenie</Akcent></h2>
            </header>

            <section className='grid-section experience'>
                <div className="grid-section__column">
                    {data.experiences.nodes.map((node, i) => <Item data={node} key={i} />)}
                </div>
                <Exp className='exp-and-edu__svg exp-and-edu__svg--exp' />
            </section>

            <section className='grid-section education '>
                <Edu className='exp-and-edu__svg exp-and-edu__svg--edu' />
                <div className="grid-section__column">
                    {data.educations.nodes.map((node, i) => <Item data={node} key={i} />)}
                </div>

            </section>
        </section>
    )
}

const Item = ({ data }) => {
    const { Tittle, end, start } = data
    const content = data.contents || data.Contents
    return (
        <div className={'exp-grid-item'}>
            <h4 className='exp-grid-item__title'>{Tittle}</h4>
            <p className='exp-grid-item__content'>{content}</p>
            <p className='exp-grid-item__timestamp'>{`${start} - ${end ? end : ' '}`}</p>
        </div>
    )
}
