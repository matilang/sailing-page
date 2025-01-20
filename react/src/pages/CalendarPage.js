import React, { useEffect, useState } from "react";
import "../App.css";
import SideHeader from "../components/SideHeader";
import TitleBar from "../components/TitleBar";
import Question from "../components/Question";

const CalendarPage = () => {
  const isAdmin = localStorage.getItem('role') === 'admin';
  const pageTitle = "FAQ";
  const pageLinks = [
    { text: "Politechnika Gdańska", href: "/sailing-webpage" },
    { text: "Sekcja Żeglarska Politechniki Gdańskiej", href: "/sailing-webpage" },
    { text: "FAQ", href: "/calendar" },
  ];

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/faq")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async (question, answer) => {
    try {
      const res = await fetch("/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, answer }),
      });
      const newQuestion = await res.json();
      setQuestions([...questions, newQuestion]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id, updatedQuestion, updatedAnswer) => {
    try {
      const res = await fetch(`/faq/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: updatedQuestion, answer: updatedAnswer }),
      });
      const updatedData = await res.json();
      setQuestions(
        questions.map((q) => (q._id === id ? updatedData : q))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/faq/${id}`, { method: "DELETE" });
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-content">
      <TitleBar mainTitle={pageTitle} pageLinks={pageLinks} />
      <Question
        questions={questions}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isAdmin={isAdmin}
      />
      <SideHeader />
    </div>
  );
};

export default CalendarPage;
