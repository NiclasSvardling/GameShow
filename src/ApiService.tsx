import { NameGameModel } from "./Model/NameGameModel";


const BASE_URL = "https://localhost:7044";


export const GetNameGameQuery = async (): Promise<NameGameModel[]> => {

    const data = await fetchData("GetNameGame");
    const result = JSON.parse(data) as NameGameModel[];
    return result;
}



export const fetchData = async (endpoint: string): Promise<string> => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};

// Function to post data to a specific endpoint
export const postData = async (endpoint: string, body: string) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        if (!response.ok) {
            throw new Error("Failed to post data");
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

// Function to delete data from a specific endpoint
export const deleteData = async (endpoint: string) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
};
