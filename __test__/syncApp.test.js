import { saveTripHandler, getDateObject, removeHandler, updatUI } from "../src/client/js/app";

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("testing the functions inside the sync functions", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the removeHandler() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(removeHandler).toBeDefined();
    })

    test("testing the saveTripHandler() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(saveTripHandler).toBeDefined();
    })

    test("testing the getDateObject() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        const input = "05-30-2001";
        // Define the expected output, if any, in the form of variables/array
        const output = new Date(2001, 4, 30);
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);y`, where `toEqual()` is a matcher
        // expect(data).toEqual({ Lat: "36.73225", Lng: "3.08746" })
        expect(getDateObject(input)).toEqual(output);
    })

    test("testing the updatUI() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        const input = ["Bab Ezzouar, Algiers, Algeria", 4, { hasDetails: true, maxTemp: 30.4, minTemp: 26.3, description: "Clear Sky" }, '../media/not-found.jpg', '05-30-2001'];
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);y`, where `toEqual()` is a matcher
        // expect(data).toEqual({ Lat: "36.73225", Lng: "3.08746" })
        expect(updatUI(...input)).toBeDefined();
    })

})