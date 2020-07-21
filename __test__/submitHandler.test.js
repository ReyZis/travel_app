import { saveTripHandler, fetchGeonames } from "../src/client/js/submitHandler";
import 'regenerator-runtime/runtime';

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("testing the functions inside the submitHandler.js file", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("testing the saveTripHandler() function", () => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
        expect(saveTripHandler).toBeDefined();
    })

    test("testing the fetchGeonames() function", async() => {
        // Define the input for the function, if any, in the form of variables/array
        // Define the expected output, if any, in the form of variables/array
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);y`, where `toEqual()` is a matcher
        const data = await fetchGeonames("algiers, algeria");
        // expect(data).toEqual({ Lat: "36.73225", Lng: "3.08746" })
        expect(data).toEqual({ Lat: "36.73225", Lng: "3.08746" });
    })

})