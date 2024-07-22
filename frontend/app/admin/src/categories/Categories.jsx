import { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Categories() {
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedAvailableCategory, setSelectedAvailableCategory] = useState(null);

  const handleAddCategory = () => {
    if (category && !categories.includes(category)) {
      setCategories([...categories, category]);
      setCategory('');
    }
  };

  const handleMoveToAvailable = () => {
    if (selectedCategory !== null) {
      setAvailableCategories([...availableCategories, categories[selectedCategory]]);
      setCategories(categories.filter((_, index) => index !== selectedCategory));
      setSelectedCategory(null);
    }
  };

  const handleMoveToCategories = () => {
    if (selectedAvailableCategory !== null) {
      setCategories([...categories, availableCategories[selectedAvailableCategory]]);
      setAvailableCategories(availableCategories.filter((_, index) => index !== selectedAvailableCategory));
      setSelectedAvailableCategory(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="text"
        placeholder="New Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      />
      <button
        onClick={handleAddCategory}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Category
      </button>
      <div className="flex flex-row gap-4 mt-4">
        <div className="w-48">
          <h3 className="text-center font-bold mb-2">Categories</h3>
          <ul className="border border-gray-300 rounded p-2">
            {categories.map((cat, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer ${selectedCategory === index ? 'bg-blue-200' : ''}`}
                onClick={() => setSelectedCategory(index)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <button
            onClick={handleMoveToAvailable}
            disabled={selectedCategory === null}
            className={`p-2 ${selectedCategory === null ? 'text-gray-300' : 'text-black'}`}
          >
            <IoIosArrowForward size={24} />
          </button>
          <button
            onClick={handleMoveToCategories}
            disabled={selectedAvailableCategory === null}
            className={`p-2 ${selectedAvailableCategory === null ? 'text-gray-300' : 'text-black'}`}
          >
            <IoIosArrowBack size={24} />
          </button>
        </div>
        <div className="w-48">
          <h3 className="text-center font-bold mb-2">Available Categories</h3>
          <ul className="border border-gray-300 rounded p-2">
            {availableCategories.map((cat, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer ${selectedAvailableCategory === index ? 'bg-blue-200' : ''}`}
                onClick={() => setSelectedAvailableCategory(index)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
