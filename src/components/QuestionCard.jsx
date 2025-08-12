import questions from "./questions";

function Quiz() {
  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-lg">
      {questions.map((q, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-bold mb-3">{q.question}</h2>
          <ul className="space-y-2">
            {q.options.map((option, i) => (
              <li
                key={i}
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded cursor-pointer"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Quiz;
