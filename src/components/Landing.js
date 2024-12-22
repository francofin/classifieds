import Image from "next/image";
import React from "react"


export async function getStaticProps() {
  return {
    props: {
      nav: {
        light: true,
        classes: "shadow",
        color: "white",
      },
      title: "Welcome",
    },
  }
}

const Landing = () => {
  return (
    <React.Fragment>
      <div className="mh-full-screen d-flex align-items-center">
        <Image
          src={`/images/landing/Classifieds-logos.jpeg`}
          alt="Not found"
          className="bg-image"
          loading="eager"
          layout="fill"
          priority={true}
        />
      </div>
    </React.Fragment>
  )
}


export default Landing

