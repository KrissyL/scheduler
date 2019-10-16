import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "components/Appointments/Form";

afterEach(cleanup);

describe("Form", () => {
    const interviewers = [
    {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png"
    }

    ];
    // const { getByPlaceholderText } = render(
    //     <Form interviewers={interviewers} />
    // );

    // it("renders without student name if not provided", () => {
    //     expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    // });
    
    it("validates that the student name is not blank", () => {
        const onSave = jest.fn();
        const { getByText } = render(
            <Form interviewers={interviewers} name="" save={onSave} />
        );
        fireEvent.click(getByText("Save"));
        expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
    });

    it("calls onSave function when the name is defined", () => {
        const onSave = jest.fn();
        const { getByText, queryByText } = render(
            <Form interviewers={interviewers} name="Lydia Miller-Jones" save={onSave} />
        );
        fireEvent.click(getByText("Save"));
        expect(queryByText(/Lydia Miller-Jones/i)).toBeNull();
        expect(onSave).toHaveBeenCalledTimes(1);
        expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
    });

    it("submits the name entered by the user", () => {
      const onSave = jest.fn();
      const { getByText, getByPlaceholderText } = render(
        <Form interviewers={interviewers} save={onSave} />
      );
    
      const input = getByPlaceholderText("Enter Student Name");
    
      fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
      fireEvent.click(getByText("Save"));
    
      expect(onSave).toHaveBeenCalledTimes(1);
      expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
    });
    it("calls onCancel and resets the input field", () => {
      const onCancel = jest.fn();
      const { getByText, getByPlaceholderText, queryByText } = render(
        <Form
          interviewers={interviewers}
          name="Lydia Mill-Jones"
          save={jest.fn()}
          onCancel={onCancel}
        />
      );
    
      fireEvent.click(getByText("Save"));
    
      fireEvent.change(getByPlaceholderText("Enter Student Name"), {
        target: { value: "Lydia Miller-Jones" }
      });
    
      fireEvent.click(getByText("Cancel"));
    
      expect(queryByText(/student name cannot be blank/i)).toBeNull();
    
      expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
});
      