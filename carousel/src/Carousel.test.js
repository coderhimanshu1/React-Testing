import React from "react";
import { render, fireEvent, getByAltText } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", () => {
  render(<Carousel />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the left arrow", () => {
  const { getByTestId, getByAltText } = render(<Carousel />);

  // expect the second image to show, but not the first
  expect(
    getByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(getByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // Click event on left arrow
  const leftArrow = getByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    getByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    getByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});

it("works when you click on the right arrow", function () {
  const { getByTestId, getByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    getByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    getByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = getByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    getByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(getByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});
