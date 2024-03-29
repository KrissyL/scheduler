import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getByAltText, getAllByTestId, getByPlaceholderText, queryByText, queryByAltText, getByDisplayValue, prettyDOM, debugDOM } from "@testing-library/react";

import Application from "components/Application";

import axios from "__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {

  it("changes the schedule when a new day is selected", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Monday"));
  
    fireEvent.click(getByText(container, "Tuesday"));
  
    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");

    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: {value: "Lydia"}
    });
    
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    await waitForElement(() => getByText(appointment, "Lydia"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

//   it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
//     const { container } = render(<Application />);

//     await waitForElement(() => getByText(container, "Archie Cohen"));

//     const appointment = getAllByTestId(container, "appointment").find(
//       appointment => queryByText(appointment, "Archie Cohen")
//     );

//     fireEvent.click(queryByAltText(appointment, "Delete"));

//     expect(getByText(appointment, /Are you sure you want to delete?/i)).toBeInTheDocument();

//     fireEvent.click(getByText(appointment, "Confirm"));

//     expect(getByText(appointment, "Deleting")).toBeInTheDocument();

//     await waitForElement(()=> getByAltText(appointment, "Add"));  

//     const day = getAllByTestId(container, "day").find(day =>
//       queryByText(day, "Monday")
//     );

//     expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

//   });

//   it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
//     const { container } = render(<Application />);

//     await waitForElement(() => getByText(container, "Archie Cohen"));

//     const appointment = getAllByTestId(container, "appointment").find(
//       appointment => queryByText(appointment, "Archie Cohen")
//     );

//     fireEvent.click(getByAltText(appointment, "Edit"));

//     fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
//       target: {value: "Lydia Miller-Jones"}
//     });

//     fireEvent.click(getByText(appointment, "Save"));

//     expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
//     await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

//     const day = getAllByTestId(container, "day").find(day =>
//       queryByText(day, "Monday")
//     );

//     expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

//   });

//   it("shows an error when it fails to save an appointment", async () => {
//     const { container } = render(<Application />);

//     await waitForElement(() => getByText(container, "Archie Cohen"));
    
//     const appointments = getAllByTestId(container, "appointment");

//     const appointment = appointments[0];

//     fireEvent.click(getByAltText(appointment, "Add"));

//     fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
//       target: {value: "Lydia Miller-Jones"}
//     });

//     fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    
//     axios.put.mockRejectedValueOnce();

//     fireEvent.click(getByText(appointment, "Save"));

//     expect(getByText(appointment, "Saving")).toBeInTheDocument();

//     await waitForElement(() => getByText(appointment, "Error")); 

//     fireEvent.click(getByAltText(appointment, "Close"));

//     const day = getAllByTestId(container, "day").find(day =>
//       queryByText(day, "Monday")
//     );

//     expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

//   });

//   it("shows an error when it fails to delete an existing appointment", async () => {
//     const { container } = render(<Application />);

//     await waitForElement(() => getByText(container, "Archie Cohen"));

//     const appointment = getAllByTestId(container, "appointment").find(
//       appointment => queryByText(appointment, "Archie Cohen")
//     );
    
//     fireEvent.click(queryByAltText(appointment, "Delete"));

//     expect(getByText(appointment, /Are you sure you want to delete?/i)).toBeInTheDocument();
    
//     axios.delete.mockRejectedValueOnce(); 
    
//     fireEvent.click(getByText(appointment, "Confirm"));
    
//     expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
//     await waitForElement(() => getByText(appointment, "Error"));

//     fireEvent.click(getByAltText(appointment, "Close"));
//     const day = getAllByTestId(container, "day").find(day =>
//       queryByText(day, "Monday")
//     );

//     expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
//   });

});