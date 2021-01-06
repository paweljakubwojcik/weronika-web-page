/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"

import { GlobalState } from "./src/components/globalState.js"

export const wrapRootElement = ({ element }) => {
    return (
        <GlobalState>
            {element}
        </GlobalState>
    )
}