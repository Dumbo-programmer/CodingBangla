import React, { useState, useEffect } from "react";
import classesData from "../data/courses";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);
  const sortedClasses = [...classesData].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else {
      return sortOrder === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    }
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">🎓 CodingBangla</h1>
        <p className="text-gray-400 mt-2">Explore classes with videos, notes, and more.</p>
      </header>

      {/* Sorting */}
      <div className="flex justify-end items-center gap-2 mb-6">
        <label htmlFor="sort" className="text-sm text-gray-400">Sort by:</label>
        <select
          id="sort"
          onChange={handleSortChange}
          className="bg-gray-800 text-white border border-gray-700 px-3 py-1 rounded"
          value={sortBy}
        >
          <option value="date">Date</option>
          <option value="title">Title</option>
          <option value="topic">Topic</option>
        </select>
        <span className="text-sm text-gray-500">({sortOrder === "asc" ? "↑" : "↓"})</span>
      </div>

      {/* Card Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedClasses.map((cls) => (
          <Card key={cls.id} className="bg-gray-900 rounded-2xl shadow-md overflow-hidden transition-all duration-300">
            <CardContent className="p-5 space-y-3">
              <h2 className="text-xl font-semibold">{cls.title}</h2>
              <p className="text-sm text-gray-400">{cls.topic} • {cls.date}</p>
              <p className="text-gray-300 text-sm">{cls.description}</p>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
                onClick={() => setSelectedClass(cls)}
              >
                View Resources
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {selectedClass && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedClass(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2">{selectedClass.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{selectedClass.topic} • {selectedClass.date}</p>
            <ul className="space-y-3 text-sm text-indigo-300">
              <li>📹 <a href={selectedClass.video} target="_blank" rel="noopener noreferrer" className="underline">Video</a></li>
              <li>📓 <a href={selectedClass.notes} target="_blank" rel="noopener noreferrer" className="underline">Notes</a></li>
              <li>📊 <a href={selectedClass.slides} target="_blank" rel="noopener noreferrer" className="underline">Slides</a></li>
              <li>📖 <a href={selectedClass.ebook} target="_blank" rel="noopener noreferrer" className="underline">eBook</a></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
