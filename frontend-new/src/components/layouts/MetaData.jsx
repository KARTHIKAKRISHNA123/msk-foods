import { Helmet } from "react-helmet-async"; //For using meta tags in react

export default function MetaData({ title }) {
    return (
        <Helmet>
            <title>{`${title} - MSK Foods`}</title>
        </Helmet>
    )
}