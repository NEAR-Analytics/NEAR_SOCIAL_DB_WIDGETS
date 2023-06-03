const cardData = props.cardData ?? {
  accountId: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  blockHeight: 83806538,
  value: {
    isDraft: false,
    title: "Last test?",
    description: "Is this the last test?",
    tgLink: "",
    startTimestamp: 1674701520000,
    endTimestamp: 1674787920000,
    questions: [
      {
        question: "What do you think?",
        questionType: "0",
        choicesOptions: ["Yes", "No"],
      },
      {
        question: "Why?",
        questionType: "1",
        choicesOptions: [
          "Because it can't be other way",
          "Because i'm sure",
          "Why not?",
        ],
      },
      {
        question: "Multiselect?",
        questionType: "2",
        choicesOptions: ["1", "2", "3"],
      },
      {
        question: "Give me a feedback",
        questionType: "3",
        choicesOptions: [],
      },
    ],
    timestamp: 1674701636048,
  },
};

const formatCard = props.formatCard ?? {
  row1: {
    rowType: "markdown",
    contentData: "data",
  },
  row2: {
    rowType: "text",
    contentData: "data2",
  },
  row3: {
    rowType: "flex",
    flexClassName: "justify-content-between",
    contentData: [
      {
        type: "flex",
        flexClassName: "flex-column justify-content-start align-items-start",
        content: [
          { type: "text", value: "Created by" },
          { type: "key", value: "accountId" },
        ],
      },
      {
        type: "flex",
        flexClassName: "flex-column justify-content-start align-items-start",
        content: [
          { type: "text", value: "Started" },
          { type: "timeStampKey", value: "startTimestamp" },
        ],
      },
      {
        type: "flex",
        flexClassName: "flex-column justify-content-start align-items-start",
        content: [
          { type: "text", value: "Ended" },
          { type: "timeStampKey", value: "endTimestamp" },
        ],
      },
    ],
  },
};
return (
  <div>
    {Object.keys(formatCard).map((rowKey) => {
      let rowData = formatCard[rowKey];
      if (rowData.rowType == "markdown") {
        return <Markdown text={rowData.contentData} />;
      } else if (rowData.rowType == "text") {
        return <p>{rowData.contentData}</p>;
      } else if (rowData.rowType == "timeStampKey") {
        return (
          <p>
            {new Date(cardData.value[secondItem.value]).toLocaleDateString(
              [],
              dateFormatOptions
            )}
          </p>
        );
      } else if (rowData.rowType == "flex") {
        return (
          <div className={rowData.flexClassName}>
            {rowData.contentData.map((item) => {
              if (item.type == "markdown") {
                return <Markdown text={item.content} />;
              } else if (item.type == "text") {
                return <p>{item.content}</p>;
              } else if (item.type == "flex") {
                return (
                  <div className={item.flexClassName}>
                    {item.content.map((secondItem) => {
                      if (secondItem.type == "markdown") {
                        return <Markdown text={secondItem.content} />;
                      } else if (secondItem.type == "text") {
                        return <p>{secondItem.content}</p>;
                      } else if (secondItem.type == "timeStampKey") {
                        console.log("cardData: ", cardData);
                        console.log("item: ", item);
                        console.log("secondItem: ", secondItem);
                        return (
                          <p>
                            {new Date(
                              cardData.value[secondItem.value]
                            ).toLocaleDateString([], dateFormatOptions)}
                          </p>
                        );
                      } else {
                        return (
                          <p className="text-danger">Error passing data</p>
                        );
                      }
                    })}
                  </div>
                );
              } else {
                return <p className="text-danger">Error passing data</p>;
              }
            })}
          </div>
        );
      } else if (rowData.rowType == "timeStampKey") {
        return (
          <p>
            {new Date(cardData[rowData.value]).toLocaleDateString(
              [],
              dateFormatOptions
            )}
          </p>
        );
      } else {
        return <p className="text-danger">Error passing data</p>;
      }
    })}
  </div>
);
