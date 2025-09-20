"use client";
import React from "react";
import SVG from "react-inlinesvg";

export const ReactSVGClient = (props) => {
  const { src, className, alt, width, height } = props;

  return <SVG {...{ src, className, alt, width, height }} />;
};
