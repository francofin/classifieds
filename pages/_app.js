import React, {useState, useEffect} from "react"
import Layout from "@components/Layout"
import "swiper/css/bundle"
// swiper core styles
import "swiper/css"
import Landing from "@components/Landing"
// modules styles
import "swiper/css/pagination"
import "swiper/css/navigation"

import "@fortawesome/fontawesome-svg-core/styles.css"
import "../src/scss/style.default.scss"
import { LandingProvider } from "@utils/landingContext";
const App = ({ Component, pageProps }) => {

  const [showLanding, setShowLanding]= useState(true);

    const deactivateLandingManually = () => {
        setShowLanding(false);
    }

    useEffect(() => {

        const deActivateLanding = () => {
            setTimeout(() => {
                setShowLanding(false);
            }, 1000)
        }

        deActivateLanding();

    }, [])

  return (
    <>
    {showLanding ? 
      <Landing deactivate={deactivateLandingManually}/>
      :
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    }</>
  ) 
}

// This default export is required in a new `pages/_app.js` file.
export default App
