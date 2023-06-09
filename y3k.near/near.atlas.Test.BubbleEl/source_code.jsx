let Style = styled.div`
                `;

function generateRandomNumbers(arrayLength) {
  const randomNumbers = [];
  for (let i = 0; i < arrayLength; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100));
  }
  return randomNumbers;
}

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const data = {
  datasets: [
    {
      label: "Red dataset",
      data: [
        {
          x: 87,
          y: -3,
          r: 15,
        },
        {
          x: 44,
          y: 29,
          r: 15,
        },
        {
          x: 97,
          y: 38,
          r: 10,
        },
        {
          x: 57,
          y: -33,
          r: 17,
        },
        {
          x: -32,
          y: 69,
          r: 11,
        },
        {
          x: 99,
          y: -16,
          r: 9,
        },
        {
          x: -4,
          y: -38,
          r: 13,
        },
        {
          x: 84,
          y: -49,
          r: 9,
        },
        {
          x: -41,
          y: -74,
          r: 9,
        },
        {
          x: -64,
          y: -11,
          r: 17,
        },
        {
          x: -33,
          y: -5,
          r: 6,
        },
        {
          x: -51,
          y: -20,
          r: 6,
        },
        {
          x: 16,
          y: -56,
          r: 14,
        },
        {
          x: 4,
          y: 71,
          r: 14,
        },
        {
          x: 79,
          y: 77,
          r: 18,
        },
        {
          x: -62,
          y: -83,
          r: 15,
        },
        {
          x: 76,
          y: 36,
          r: 13,
        },
        {
          x: 36,
          y: -92,
          r: 19,
        },
        {
          x: 97,
          y: -54,
          r: 16,
        },
        {
          x: -51,
          y: 40,
          r: 11,
        },
        {
          x: -95,
          y: -85,
          r: 17,
        },
        {
          x: 93,
          y: -66,
          r: 12,
        },
        {
          x: 53,
          y: -50,
          r: 15,
        },
        {
          x: 100,
          y: -33,
          r: 14,
        },
        {
          x: -31,
          y: 1,
          r: 6,
        },
        {
          x: 67,
          y: -12,
          r: 16,
        },
        {
          x: 1,
          y: 9,
          r: 6,
        },
        {
          x: 68,
          y: -20,
          r: 17,
        },
        {
          x: -94,
          y: 83,
          r: 19,
        },
        {
          x: 55,
          y: -81,
          r: 15,
        },
        {
          x: 84,
          y: -87,
          r: 15,
        },
        {
          x: -19,
          y: -15,
          r: 20,
        },
        {
          x: -78,
          y: 6,
          r: 14,
        },
        {
          x: 100,
          y: 28,
          r: 6,
        },
        {
          x: 13,
          y: -43,
          r: 6,
        },
        {
          x: -9,
          y: 36,
          r: 17,
        },
        {
          x: -15,
          y: 86,
          r: 11,
        },
        {
          x: -97,
          y: 39,
          r: 18,
        },
        {
          x: 73,
          y: 47,
          r: 18,
        },
        {
          x: -22,
          y: -14,
          r: 7,
        },
        {
          x: -28,
          y: 62,
          r: 6,
        },
        {
          x: 17,
          y: -30,
          r: 15,
        },
        {
          x: -99,
          y: 94,
          r: 11,
        },
        {
          x: -2,
          y: 60,
          r: 14,
        },
        {
          x: -57,
          y: -49,
          r: 17,
        },
        {
          x: 80,
          y: -34,
          r: 13,
        },
        {
          x: -76,
          y: -26,
          r: 9,
        },
        {
          x: -44,
          y: -74,
          r: 15,
        },
        {
          x: -44,
          y: -27,
          r: 6,
        },
        {
          x: 42,
          y: 97,
          r: 6,
        },
      ],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Blue dataset",
      data: [
        {
          x: -31,
          y: 76,
          r: 15,
        },
        {
          x: -43,
          y: -77,
          r: 15,
        },
        {
          x: 25,
          y: -30,
          r: 12,
        },
        {
          x: 16,
          y: 93,
          r: 18,
        },
        {
          x: -8,
          y: 73,
          r: 8,
        },
        {
          x: 86,
          y: -67,
          r: 17,
        },
        {
          x: -76,
          y: 83,
          r: 12,
        },
        {
          x: 28,
          y: -79,
          r: 10,
        },
        {
          x: -99,
          y: -1,
          r: 6,
        },
        {
          x: 36,
          y: 45,
          r: 9,
        },
        {
          x: 61,
          y: -56,
          r: 6,
        },
        {
          x: -78,
          y: -52,
          r: 11,
        },
        {
          x: -53,
          y: -75,
          r: 17,
        },
        {
          x: 93,
          y: 76,
          r: 8,
        },
        {
          x: -69,
          y: -61,
          r: 10,
        },
        {
          x: -64,
          y: 93,
          r: 5,
        },
        {
          x: 27,
          y: 68,
          r: 7,
        },
        {
          x: 9,
          y: 36,
          r: 11,
        },
        {
          x: -50,
          y: 47,
          r: 10,
        },
        {
          x: 88,
          y: -76,
          r: 16,
        },
        {
          x: 64,
          y: -63,
          r: 17,
        },
        {
          x: 81,
          y: 47,
          r: 6,
        },
        {
          x: -29,
          y: 59,
          r: 18,
        },
        {
          x: -74,
          y: 68,
          r: 13,
        },
        {
          x: 87,
          y: 72,
          r: 6,
        },
        {
          x: -67,
          y: -35,
          r: 10,
        },
        {
          x: 85,
          y: -11,
          r: 13,
        },
        {
          x: 59,
          y: -78,
          r: 5,
        },
        {
          x: -78,
          y: -84,
          r: 10,
        },
        {
          x: -44,
          y: -79,
          r: 10,
        },
        {
          x: 37,
          y: -79,
          r: 15,
        },
        {
          x: -51,
          y: 64,
          r: 5,
        },
        {
          x: 57,
          y: 26,
          r: 15,
        },
        {
          x: 32,
          y: 12,
          r: 16,
        },
        {
          x: -92,
          y: 87,
          r: 17,
        },
        {
          x: 34,
          y: -66,
          r: 11,
        },
        {
          x: 47,
          y: 79,
          r: 7,
        },
        {
          x: 93,
          y: 66,
          r: 11,
        },
        {
          x: -99,
          y: -48,
          r: 12,
        },
        {
          x: 29,
          y: -79,
          r: 6,
        },
        {
          x: -80,
          y: -96,
          r: 17,
        },
        {
          x: 97,
          y: 4,
          r: 10,
        },
        {
          x: 15,
          y: 86,
          r: 19,
        },
        {
          x: 99,
          y: 80,
          r: 15,
        },
        {
          x: -20,
          y: -47,
          r: 5,
        },
        {
          x: 84,
          y: 25,
          r: 17,
        },
        {
          x: 73,
          y: -18,
          r: 13,
        },
        {
          x: -59,
          y: 74,
          r: 5,
        },
        {
          x: 20,
          y: 23,
          r: 13,
        },
        {
          x: -72,
          y: -84,
          r: 18,
        },
      ],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

return (
  <Style>
    <div className="text-bg-dark rounded-4 p-3 mb-4">
      {data !== null ? (
        <p>
          <BubbleEl options={options} data={data} />
        </p>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  </Style>
);
