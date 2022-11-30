export const hoofZones = [
  [
    {
      title: "1L",
      value: "1L",
    },
    {
      title: "1R",
      value: "1R",
    },
    {
      title: "2L",
      value: "2L",
    },
    {
      title: "2R",
      value: "2R",
    },
    {
      title: "3L",
      value: "3L",
    },
    {
      title: "3R",
      value: "3R",
    },
    {
      title: "4L",
      value: "4L",
    },
    {
      title: "4R",
      value: "4R",
    },
    {
      title: "5L",
      value: "5L",
    },
    {
      title: "5R",
      value: "5R",
    },
    {
      title: "6L",
      value: "6L",
    },
    {
      title: "6R",
      value: "6R",
    },
  ],
  [
    {
      title: "0",
      value: "0",
    },
    {
      title: "10",
      value: "10",
    },
    {
      title: "7",
      value: "7",
    },
    {
      title: "8",
      value: "8",
    },
    {
      title: "9",
      value: "9",
    },
    {
      title: "11",
      value: "11",
    },
    {
      title: "12",
      value: "12",
    },
  ],
];

export const getDiseases = (array, type, zone) => {
  if (Array.isArray(array) && array?.length > 0 && type && zone) {
    const result = [];
    array.forEach((el) => {
      if (el.diseased === type && el.position === zone && el.active) {
        result.push({diseaseId: el.uuid, title: el.ill.title, uuid: el.illId});
      }
    });
    return result;
  }
  return [];
};
