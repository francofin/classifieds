import Link from "next/link"

import { Container, Row, Col, Button } from "react-bootstrap"
import axios from 'axios';
import RichSwiper from "@components/RichSwiper"
import SearchBar from "@components/SearchBar"
import LastMinute from "@components/LastMinute"
import Guides from "@components/Guides"
import Instagram from "@components/Instagram"
import data from "@data/index3.json"
import Image from "@components/CustomImage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import React, {useState, useEffect} from "react"
import { LandingContext } from "@utils/landingContext"


const fetcher = async (url) => {
  const res = await axios.get(url)
  
  const resData = res.data
  return resData
}

export async function getServerSideProps() {
  const URL = `${process.env.NEXT_PUBLIC_SERVICEFINDER_API_URL}/api/business/businesses/mainpage`;
  const businessData = await fetcher(URL);
  // console.log(businessData.data[0]['Home Services'])
  const homeServices = businessData.data[0]['Home Services']
  const health = businessData.data[1]['Health & Wellness']
  const automotive = businessData.data[3]['Automotive Services']
  const pets = businessData.data[9]['Pet Services']
  const realEstate = businessData.data[7]['Real Estate & Property Management']
  const events = businessData.data[8]['Events & Entertainment']
  const homeImprov = businessData.data[10]['Home Improvement & Construction']
  
  return {
    props: {
      nav: {
        dark: true,
        fixed: "false",
        color: "transparent",
      },
      noPaddingTop: true,
      headerClasses: "header-absolute",
      title: "The Classifieds",
      homeServices,
      health,
      automotive,
      pets,
      realEstate,
      events,
      homeImprov
    },
  }
}

const Index = (props) => {

  function getRandomSelection(array, count=4) {
    if (count > array.length) {
        throw new Error("Count exceeds the number of available objects.");
    }

    // Create a shallow copy of the array to avoid modifying the original
    const arrayCopy = [...array];
    const selected = [];

    for (let i = 0; i < count; i++) {
        // Generate a random index
        const randomIndex = Math.floor(Math.random() * arrayCopy.length);
        // Remove the object at the random index and add it to the selected array
        selected.push(arrayCopy.splice(randomIndex, 1)[0]);
    }

    return selected;
}

const homeServicesShown = getRandomSelection(props?.homeServices);
const healthShown = getRandomSelection(props?.health);
const autoShown = getRandomSelection(props?.automotive);
const petShown = getRandomSelection(props?.pets);
const realEstateShown = getRandomSelection(props?.realEstate);
const eventsShown = getRandomSelection(props?.events);
const homeImprovShown = getRandomSelection(props?.homeImprov);



  return (
    <>
    <React.Fragment>
      <RichSwiper
        className="multi-slider"
        data={data.swiper}
        perView={1}
        spaceBetween={0}
        centeredSlides
        loop
        effect="fade"
        speed={2000}
        parallax
        paginationClass="swiper-pagination-white"
        autoplay={{
          delay: 10000,
        }}
        priority
      />
      {data.numberedBlocks && (
        <section className="py-6">
          <Container>
            <Row>
              {data.numberedBlocks.map((block, index) => (
                <Col lg="4" key={index} className="position-relative px-5">
                  <p className="advantage-number">{index + 1}</p>
                  <div className="ps-lg-5">
                    <h6 className="text-uppercase">{block.title}</h6>
                    <p className="text-muted text-sm mb-5 mb-lg-0">
                      {block.content}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
      <section className="bg-gray-100">
        {data.imageDivider && (
          <div
            className="bg-cover position-relative"
            style={{ height: "250px" }}
          >
            <Image
              src={`/content/${data.imageDivider}`}
              layout="fill"
              className="bg-image"
              alt="Hero image"
            />
          </div>
        )}
        <Container className="pb-lg-3">
          <SearchBar
            options={data.searchOptions}
            className="rounded p-3 p-lg-4 position-relative mt-n4 z-index-20"
            halfInputs={true}
            btnMb="0"
            id="index-3-searchbar"
          />
        </Container>
      </section>

      {/* <Guides greyBackground /> */}

      {data.popular && (
        <section className="pt-6">
          <Container>
            <Row className="mb-6">
              <Col lg="8">
                <h2>{data.popular.title}</h2>
                <p className="text-muted mb-0">{data.popular.content}</p>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row>
              {data.popular.places.map((place, index) => (
                <Col
                  xs="6"
                  lg="4"
                  xl="3"
                  className={`px-0 ${
                    index === data.popular.places.length - 1
                      ? "d-none d-lg-block d-xl-none"
                      : ""
                  }`}
                  key={index}
                >
                  <div
                    style={{ minHeight: "400px" }}
                    className="d-flex align-items-center dark-overlay hover-scale-bg-image"
                  >
                    <Image
                      src={`/${place.img}`}
                      alt={place.title}
                      layout="fill"
                      className="bg-image"
                    />
                    <div className="p-3 p-sm-5 text-white z-index-20">
                      <h4 className="h2">{place.title}</h4>
                      <p className="mb-4">{place.subTitle}</p>
                      <Link href={place.link} passHref>
                        <Button
                          variant="link"
                          className="text-reset ps-0 stretched-link text-decoration-none"
                        >
                          {data.popular.button}
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="ms-2"
                          />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
      <LastMinute businessData={homeServicesShown}/>
      <Instagram />
    </React.Fragment>
  </>)
}


export default Index
