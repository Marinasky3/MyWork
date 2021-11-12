import React, { useRef, useCallback } from "react";
import { useMount } from "react-use";
import styled from "styled-components";

const Container = styled.div`
  width: 1390px;
    // background-color: #7CB3BF;
    margin: auto;
    /* max-height: 678px; */
    overflow-y: scroll;
    position: relative;

    scrollbar-width: thin;
        scrollbar-color: rgb(73, 61, 61) ; 

    &::-webkit-scrollbar {
        width: 6px;
      } 
    &::-webkit-scrollbar-track {
        background: #242122;
        box-shadow: 0px 0px 4px 1px #242122 inset;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #20404A;
        border-radius: 5px; 
      }
`;

const ScrollContainer = ({ children, onScroll, onMount }) => {
  const containerRef = useRef(null);

  useMount(() => {
    onMount(containerRef.current);
  });

  const handleScroll = useCallback(
    event => {
      const { target } = event;
      const scrollContainerRect = target.getBoundingClientRect();
      const scrollTop = target.scrollTop;

      onScroll({ scrollTop, scrollContainerRect });
    },
    [onScroll]
  );

  return (
    <Container onScroll={handleScroll} ref={containerRef}>
      {children}
    </Container>
  );
};

export default ScrollContainer;