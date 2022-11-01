import React, { useState, useCallback, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import styled from 'styled-components'
import Modal from 'react-modal'


// import Img from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"

// import Swiper from 'swiper'
// // import Swiper styles
// import 'swiper/css'

const Item = styled.div`
  display: flex;
  justify-content: center;
  ${'' /* padding: .5rem; */}
  border: 1px solid darkgray;
  ${'' /* background-color: lightblue; */}
  color: gray;
  ${'' /* font-size: 28px; */}
  ${'' /* font-weight: bold; */}
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: .5vw;
  ${'' /* padding: 1vw; */}
  width: 99%;
  @media (max-width: 1150px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 750px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
  text-align: center;
`;
// import EmblaCarouselReact from 'embla-carousel-react'
// import Modal from '../components/modal'
// import { Consumer } from '../components/context'

// import { Button, Photo } from '../utils/global'

const location =
  typeof window !== `undefined` ? window.location.pathname : '/gallery'

const Gallery = props => {
  const photos = props.images || []

  const [showModal, setShowModal] = useState('')

  const handleClickModal = (act, id) => {
    console.log(act, id)
    if (!!act) {
      setShowModal(id)
    } else {
      setShowModal('')
    }
  }

  const customStyles = (width) => {
    
    return {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000, // hack. for PayPal button visability under modal issue
      // width: '50%',
    },
    content: {
      // color: 'black',
      backgroundColor: 'white',
      // backgroundColor: 'rgba(0, 0, 0, 0)',
      // border: '0px solid aqua',
      objectFit: 'contain',
      // overflow: 'hidden',
      maxWidth: '80%',
      // height: {height},
      width: width || '80%', // set this to image width
      // height: 'auto', // set this to image heigth
      margin: 'auto',
      padding: '1em',
      // top: '0px',
      // left: '0px',
      // borderRadius: '0px',
      textAlign: 'center',
    },
  }
}
//   const [embla, setEmbla] = useState(null)
//   const scrollPrev = useCallback(() => embla.scrollPrev(), [embla])
//   const scrollNext = useCallback(() => embla.scrollNext(), [embla])

//   if (typeof window !== `undefined`) {
//     let clickWait = false
//     setInterval(() => {
//       if (embla !== null && !clickWait) {
//         embla.scrollNext()
//       }
//     }, 3500)
//     document.addEventListener('click', () => {
//       clickWait = true
//       setTimeout(() => {
//         clickWait = false
//       }, 3500)
//     })
//   }

//   useEffect(() => {
//     if (embla) {
//       embla.on('select', () => {
//         console.log(`Current index is ${embla.selectedScrollSnap()}`)
//       })
//     }
//   }, [embla])

//   const StartPoint = Math.floor(Math.random() * photos.length)


// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'vertical',
//     loop: true,
  
//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },
  
//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
  
//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   })


  return ( <>
{/* <div class="swiper">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
        <GatsbyImage/>
    </div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>

  <div class="swiper-pagination"></div>


  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>


  <div class="swiper-scrollbar"></div>
</div> */}

<Grid>
{photos?.map(img => {
    return (<>
        <Item
            onClick={()=>handleClickModal(true, img.id)}
        >
        <GatsbyImage 
            image={img.childImageSharp.gatsbyImageData}
            />
        </Item>
        <Modal
          isOpen={showModal==img.id}
          // ariaHideApp={false}
          // contentLabel="Inline Styles Modal"
          style={customStyles(img.childImageSharp?.gatsbyImageData?.width)}
          id={img.id}
          width={img.childImageSharp?.gatsbyImageData?.width}
        >
        {JSON.stringify(img.childImageSharp?.gatsbyImageData, null, 4)} 
        <div id={img.id+'DIV'} onClick={()=>handleClickModal(false,'')}  >
          <GatsbyImage id={img.id+'IMG'} image={img.childImageSharp.gatsbyImageData} />
        </div>
        </Modal>
</>
         )
})}


</Grid>
</>
    //   <Carousel>
    //     <CarouselNavLeft onClick={scrollPrev}>
    //       {'\u291F'}
    //     </CarouselNavLeft>
    //     <EmblaCarouselReact
    //       htmlTagName="div"
    //       emblaRef={setEmbla}
    //       options={{ loop: true, startIndex: StartPoint, speed: 18 }}
    //     >
    //       <CarouselCenter style={{ display: 'flex' }}>
            // {
                // photos.map(img => (


                // <GatsbyImage
                //   object={img}
                //   doubleclick="true"
                //   source={img.childImageSharp.high}
                //   location={location}
                //   name={img.name}
                //   text="Inqure here"
                // />


              /* <PhotoGrid>
                <PhotoModal
                  object={img}
                  doubleclick="true"
                  source={img.childImageSharp.high}
                  location={location}
                  name={img.name}
                  text="Inqure here"
                >
                  <CarouselPhoto
                    fadeIn={true}
                    key={img.id}
                    title={`Photo by Eghan Thompson`}
                    fluid={img.childImageSharp.low}
                    style={{ flex: '0 0 100%' }}
                  />
                </PhotoModal>
                <Consumer>
                  {({ data, set }) => (
                    <PhotoButton
                      onClick={() => {
                        set({
                          itemInquery: [img],
                        })
                        navigate('contact')
                      }}
                    >
                      inquiry
                    </PhotoButton>
                  )}
                </Consumer>
              </PhotoGrid> */


            // ))
        // }


    //       </CarouselCenter>
    //     </EmblaCarouselReact>{' '}
    //     <CarouselNavRight onClick={scrollNext}>
    //       {'\u2920'}
    //     </CarouselNavRight>
    //   </Carousel>
  )
}

export default Gallery