import { fetchGeonames, fetchWeather, fetchPexabay } from "../src/client/js/app";
import 'regenerator-runtime/runtime';

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("testing the functions inside the async functions", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  

    test("testing the fetchGeonames() function", async() => {
        // Define the input for the function, if any, in the form of variables/array
        const data1 = await fetchGeonames("algiers, algeria");
        const data2 = await fetchGeonames("none-sense word");
        // Define the expected output, if any, in the form of variables/array
        const output1 = { "hasLatLng": true, Lat: "36.73225", Lng: "3.08746" };
        const output2 = { hasLatLng: false };
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);y`, where `toEqual()` is a matcher
        expect(data1).toEqual(output1);
        expect(data2).toEqual(output2);
    })

    test("testing the fetchWeather() function", async() => {
        // Define the input for the function, if any, in the form of variables/array
        const data1 = await fetchWeather({ Lat: "36.73225", Lng: "3.08746" }, 4);
        const data2 = await fetchWeather({ Lat: "36.73225", Lng: "3.08746" }, 17);
        // Define the expected output, if any, in the form of variables/array
        const output1 = { hasDetails: true, maxTemp: 30.4, minTemp: 26.3, description: "Clear Sky" };
        const output2 = { hasDetails: false, description: "we can't forecast the weather" };
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);y`, where `toEqual()` is a matcher
        expect(data1).toEqual(output1);
        expect(data2).toEqual(output2);
    })

    test("testing the fetchPexabay() function", async() => {
        // Define the input for the function, if any, in the form of variables/array
        const data1 = await fetchPexabay("algiers, algeria");
        const data2 = await fetchPexabay("none-sense word");
        // Define the expected output, if any, in the form of variables/array
        const output1 = new RegExp('https://pixabay.com/get/');
        const output2 = '../media/not-found.jpg';
        // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);y`, where `toEqual()` is a matcher
        // expect(data).toEqual({ Lat: "36.73225", Lng: "3.08746" })
        expect(data1).toMatch(output1);
        expect(data2).toMatch(output2);
    })
})