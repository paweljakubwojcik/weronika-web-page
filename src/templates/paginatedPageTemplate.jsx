import React from "react"
import Layout from "../components/layout/layout.js"
import SEO from "../components/seo.js"
import { GlobalStateContext } from "../components/globalState.js"
import Projects from "../components/projectsPage/Projects.jsx"

class PaginatedPageTemplate extends React.Component {

    render() {
        return (
            <Layout>
                <GlobalStateContext.Consumer>
                    {globalState => (
                        <>
                            <SEO title="Projekty" />
                            <Projects globalState={globalState} pageContext={this.props.pageContext} />
                        </>
                    )}
                </GlobalStateContext.Consumer>
            </Layout>
        )
    }
}

export default PaginatedPageTemplate