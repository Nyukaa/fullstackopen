const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch anecdotes");
  }

  return response.json();
};

export const createAnecdote = async (newA) => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newA),
  };

  const response = await fetch(baseUrl, options);

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return await response.json();
};

export const updateAnecdote = async (updatedA) => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedA),
  };

  const response = await fetch(`${baseUrl}/${updatedA.id}`, options);

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return await response.json();
};
