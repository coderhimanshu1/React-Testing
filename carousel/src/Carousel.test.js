import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", () => {
  render(<Carousel />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the left arrow", () => {
  const { getByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = getByTestId("right-arrow");
  const leftArrow = getByTestId("left-arrow");

  // Move to right
  fireEvent.click(rightArrow);

  // Move  back when clicked on left arrow
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("left or right arrow hides appropriately", () => {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");

  // Left arrow hides on first image
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // Move forward
  fireEvent.click(rightArrow);

  // Shows both arrows
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // Move forward to last(3rd) image
  fireEvent.click(rightArrow);

  // Right arrow hides on last image
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
});
