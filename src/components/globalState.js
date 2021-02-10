import React from "react"

/*
 * The reason we use Global State instead of Component State is that
 * when the user clicks something on the main page and then clicks back,
 * we don't want to reset the user's scroll position. If we don't maintain
 * state, then we will "lose" some of the items when the user clicks
 * back and the state resets, which obviously resets scroll position as well.
 */
export const GlobalStateContext = React.createContext({
    cursor: 0, /* Which page infinite scroll should fetch next. */
    useInfiniteScroll: true, /* Toggle between pagination and inf. scroll for this demo & fallback in case of error. */
    isInitializing: () => { return true },
    updateState: () => { },
    hasMore: () => { },
    loadMore: () => { },
    toggle: () => { },
});

export class GlobalState extends React.Component {

    constructor(props) {
        super(props)

        console.log("*** Constructing Global State ***")

        this.loadMore = this.loadMore.bind(this)
        this.hasMore = this.hasMore.bind(this)
        this.updateState = this.updateState.bind(this)
        this.isInitializing = this.isInitializing.bind(this)

        /* State also contains metadata for items, e.g. state["page81"] (only contains keys for _received_ metadata) */
        this.state = {
            canFetch: true,
            cursor: 1,
            useInfiniteScroll: true,
            isInitializing: this.isInitializing,
            updateState: this.updateState,
            hasMore: this.hasMore,
            loadMore: this.loadMore,
        }
    }

    isInitializing = () => {
        return (this.state.cursor === 0)
    }

    updateState = (mergeableStateObject) => {
        this.setState(mergeableStateObject)
    }

    loadMore = () => {
        if (this.state.canFetch) {
            console.log("Fetching metadata for page " + this.state.cursor)
            const pageNum = this.state.cursor
            this.setState(state => ({ cursor: state.cursor + 1, canFetch: false })) // TODO: make sure this is guaranteed to set state before another loadMore may be able to fire!
            fetch(`${__PATH_PREFIX__}/paginationJson/projects${pageNum}.json`)
                .then(res => res.json())
                .then(
                    res => {
                        this.setState({
                            ["page" + pageNum]: res,
                            canFetch: true
                        })
                    },
                    error => {
                        console.log(error)
                    }
                )
        }
    }

    hasMore = (pageContext) => {
        if (!this.state.useInfiniteScroll) return false
        if (this.isInitializing()) return true
        return this.state.cursor <= pageContext.countPages
    }

    render() {
        return (
            <GlobalStateContext.Provider value={this.state}>
                {this.props.children}
            </GlobalStateContext.Provider>
        )
    }

}