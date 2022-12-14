//////////////////////// Private methods ////////////////////////
// Not actually private, but can't be called directly. Look for public methods to see what this widget can do)

/**
 * @param optional props.accountId filters by the accountId provided, if provided
 * Returns all the questions asked to poll_question key, with different versions
 */
function getQuestions() {
  return Social.index("poll_question", "question-v3.0.1", {
    accountId: props.accountId,
  });
}

/**
 * @param props.blockHeight blockHeight of the question. It should be a number, but it may come as a string if it comes from an url
 * Returns the question that matches the block height provided
 */
function getQuestionFromBlockHeight(blockHeight) {
  if (!props.blockHeight && !blockHeight) {
    return "Function getQuestionFromBlockHeight needs prop blockHeight";
  }
  blockHeight = props.blockHeight ?? blockHeight;
  const questions = getQuestions();
  return questions.find((q) => q.blockHeight == Number(blockHeight));
}

/**
 * Returns all the questions asked to poll_question key, with different versions
 */
function getAnswers() {
  return Social.index("poll_question", "answer-v3.0.1");
}

/**
 * @param props.questionBlockHeight blockHeight of the question. It should be a number, but it may come as a string if it comes from an url
 * Filters answers by the question's block height
 */
function getAnswersToQuestion() {
  if (!props.questionBlockHeight) {
    return "Function getAnswersToQuestion needs prop questionBlockHeight";
  }
  const answers = getAnswers();
  return answers.filter(
    (a) => a.value.questionBlockHeight == props.questionBlockHeight
  );
}

// Utility function. Move to time related widget
function getBlockTimestamp(blockHeight) {
  // It is stored in nanoseconds which is 1e-6 miliseconds
  return Near.block(blockHeight).header.timestamp / 1e6;
}

/**
 * @param answers array obtained from getAnswers()'s structure
 * Discards answers that were posted after question's end date
 */
function filterOutOfTimeAnswers(answers) {
  let low = 0;
  let high = answers.length - 1;
  const questionEndTimestamp = questionParams.value.endTimestamp;
  let endBlockTimestamp = getBlockTimestamp(answers[high].blockHeight);
  if (endBlockTimestamp < questionEndTimestamp) return answers;
  // For tries to exceed 50 there should be more than 10e15 answers which will never happen. But if you mess up and make an infinite cycle it will crash. This way it will never be infinite
  let tries = 10;
  while (high - low > 1 && tries > 0) {
    tries--;
    let curr = Math.floor((high - low) / 2) + low;
    let currBlockTimestamp = getBlockTimestamp(answers[curr].blockHeight);
    if (currBlockTimestamp < questionEndTimestamp) {
      low = curr;
    } else {
      high = curr;
    }
  }
  // Slice ignores the index of the last one. Since high - low == 1, high = low + 1
  return answers.slice(0, high);
}

/**
 * @param questionParams question brought by social index
 * @param answers answers brought by social index that correspond the question
 * Removes any answer that is not a valid index for the multiple choice. Even though the answer is a number, it is formatted as a string because there were another issues with it while displaying if treated as a number
 */
function filterMultipleChoiceValidAnswers(questionParams, answers) {
  return answers.filter(
    (a) =>
      0 <= Number(a.value.answer) &&
      Number(a.value.answer) < questionParams.value.choicesOptions.length
  );
}

/**
 * @param questionBlockHeight block height of the question you want the answers
 * Returns all valid answers to question provided
 */
function getValidAnswersToQuestion() {
  if (!props.questionBlockHeight) {
    return "Function getValidAnswersToQuestion needs prop questionBlockHeight";
  }
  const answersToThisQuestion = getAnswersToQuestion();
  let validAnswers = filterOutOfTimeAnswers(answersToThisQuestion);

  const questionParams = getQuestionFromBlockHeight(props.questionBlockHeight);
  // Type "1" means multiple choice. Check widget newPollQuestionInterface for more info
  if (questionParams.value.questionType == "1") {
    validAnswers = filterMultipleChoiceValidAnswers(
      questionParams,
      validAnswers
    );
  }
  return validAnswers;
}

//////////////////////// Public methods ////////////////////////

// Switch doesn't work on Near Social and couldn't find a way to call a function from a string
if (props.fn == "getQuestions") {
  return getQuestions();
} else if (props.fn == "getQuestionFromBlockHeight") {
  return getQuestionFromBlockHeight();
} else if (props.fn == "getValidAnswersToQuestion") {
  return getValidAnswersToQuestion();
}
