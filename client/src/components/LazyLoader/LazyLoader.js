

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  /* border: 4px solid blue; */
  overflow: hidden;
`;
const Bottom = styled.div`
 height: 15px;
/* background-color: red; */
display: flex;
justify-content: center;
  span{
    /* position: relative; */
    display: inline-block;
    margin: 5px;
  width: 7px;
  height: 7px;
  border-radius: 5px;
  
  animation: dotFlashing  infinite linear alternate;
  animation-duration: 1s;
  /* animation-delay: .5s; */
  }
.second{
        animation-delay: 0.5s;
    }

.first {
  display: inline-block;
  animation-delay: 0s;
}

.third {
  /* animation: dotFlashing 1s infinite alternate; */
  animation-delay: 1s;
}
  
@keyframes dotFlashing {
  0% {
    background-color: #262628;
    border: 1px solid #7CB3BF
  }
  50%,
  100% {
    background-color: #7CB3BF;
    border: 1px solid #7CB3BF
  }
}
  
`;

const LazyLoader = ({
  scrollTop,
  rootBottomMargin = 0,
  scrollContainerRect,
  onIntersection,
  showSmallLoader,
  children
}) => {
  const [scrollThreshold, setScrollThreshold] = useState(0);
  const fakeBottomRef = useRef(null);
  const fakeListRect = fakeBottomRef.current
    ? fakeBottomRef.current.getBoundingClientRect()
    : {};

  useEffect(() => {
    setScrollThreshold(
      fakeListRect.top - scrollContainerRect.top - scrollContainerRect.height
    );
  }, [scrollTop, scrollContainerRect, fakeListRect.top]);

  useEffect(() => {
    if (scrollThreshold < rootBottomMargin) {
      onIntersection();
    }
  }, [scrollThreshold, rootBottomMargin, onIntersection]);

  return (
    <Container>
      {children}

      <Bottom ref={fakeBottomRef} >
      {showSmallLoader &&
        <>
          <span className="first" ></span>
          <span className="second"></span>
          <span className="third"></span>
        </>
        } 
      </Bottom>
    </Container>
  );
};

export default LazyLoader;