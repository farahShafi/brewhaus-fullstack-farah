import { describe, it, expect } from "vitest";

describe("brewery store", () => {

    it("adds breweries to state", () => {
        const breweries = []

        const data = [
            {
                id: "1",
                name: "River Brewery"
            }]
        breweries.push(...data)
        
        expect(breweries.length).toBe(1)
    })
    
})