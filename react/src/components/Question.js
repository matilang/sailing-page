import React, { useState } from "react";

export function QuestionItem({
  question,
  answer,
  isActive,
  onToggleActive,
  onDelete,
  onEdit,
  isAdmin,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const handleSave = () => {
    onEdit(editedQuestion, editedAnswer);
    setIsEditing(false);
  };

  return (
    <div className={`faq ${isActive ? "active" : ""}`} onClick={onToggleActive}>
      <div className="question">
        {!isEditing ? (
          <h3>{question}</h3>
        ) : (
          <input
            type="text"
            value={editedQuestion}
            onChange={(e) => setEditedQuestion(e.target.value)}
            className="inputbox"
          />
        )}
        <svg width="15" height="10" viewBox="0 0 42 25">
          <path
            d="M3 3L21 21L39 3"
            stroke="black"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          ></path>
        </svg>
      </div>
      <div className="answer">
        {!isEditing ? (
          <p>{answer}</p>
        ) : (
          <textarea
            value={editedAnswer}
            onChange={(e) => setEditedAnswer(e.target.value)}
            className="inputbox"
          ></textarea>
        )}
      </div>
      {isEditing ? (
        isAdmin && (
          <button className="question-item-button" onClick={handleSave}>
            Zapisz
          </button>
       )
      ) : (
        isAdmin && (
          <button className="question-item-button" onClick={() => setIsEditing(true)}>
            Edytuj
          </button>
        )
)}

{isAdmin && (
  <button className="question-item-button" onClick={onDelete}>
    Usuń
  </button>
)}
    </div>
  );
}


export default function Question({ questions, onAdd, onDelete, onEdit, isAdmin }) {
  const [activeIndices, setActiveIndices] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const handleToggleActive = (index) => {
    setActiveIndices((prevIndices) => {
      if (prevIndices.includes(index)) {
        return prevIndices.filter((i) => i !== index);
      } else {
        return [...prevIndices, index];
      }
    });
  };

  const handleAdd = () => {
    onAdd(newQuestion, newAnswer);
    setNewQuestion("");
    setNewAnswer("");
  };

  return (
    <div className="text">
      <h2>Strefa najczęściej zadawanych pytań</h2>
      {questions.map((q, index) => (
        <QuestionItem
          key={index}
          question={q.question}
          answer={q.answer}
          isActive={activeIndices.includes(index)}
          onToggleActive={() => handleToggleActive(index)}
          onDelete={() => onDelete(q._id)}
          onEdit={(updatedQuestion, updatedAnswer) =>
            onEdit(q._id, updatedQuestion, updatedAnswer)
          }
          isAdmin={isAdmin}
        />
      ))}
      <div className="add-question">
        {isAdmin && (
          <>
            <input
              type="text"
              placeholder="Nowe pytanie"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="inputbox"
            />
            <textarea
              placeholder="Nowa odpowiedź"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="inputbox"
            ></textarea>
            <button className="question-item-button" onClick={handleAdd}>
              Dodaj pytanie
            </button>
          </>
        )}
      </div>
    </div>
  );
}
