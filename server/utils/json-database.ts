import fs from "fs";

export const addToJsonFile = <T>(filePath: string, data: T) => {
    console.log("data add => ", data);
    const jsonArray = JSON.parse(fs.readFileSync(filePath, "utf8")) as T[];
    jsonArray.push(data);
    fs.writeFileSync(filePath, JSON.stringify(jsonArray));
};

export const getAllFromJsonFile = <T>(filePath: string) => {
    console.log("data => ", filePath);
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T[];
};

export const getFromJsonFile = <T>(filePath: string, id: string | number) => {
    console.log("data get => ", id);
    const jsonArray = JSON.parse(fs.readFileSync(filePath, "utf8")) as T[];
    console.log("jsonArray => ", jsonArray);
    return jsonArray.find((item: any) => String(item.id) === String(id)) as T;
};

export const updateInJsonFile = <T>(
    filePath: string,
    data: T,
    id: string | number,
) => {
    console.log("data update => ", data);
    const jsonArray = JSON.parse(fs.readFileSync(filePath, "utf8")) as T[];
    const index = jsonArray.findIndex(
        (item: any) => String(item.id) === String(id),
    );
    jsonArray[index] = data;
    fs.writeFileSync(filePath, JSON.stringify(jsonArray));
};

export const deleteFromJsonFile = <T>(filePath: string, id: string | number) => {
    console.log("data delete => ", id);
    const jsonArray = JSON.parse(fs.readFileSync(filePath, "utf8")) as T[];
    console.log("jsonArray => ", jsonArray);
    const index = jsonArray.findIndex(
        (item: any) => String(item.id) === String(id),
    );
    console.log("index => ", index, jsonArray[index]);
    jsonArray.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(jsonArray));
};
